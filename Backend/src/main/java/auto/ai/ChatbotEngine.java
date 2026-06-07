package auto.ai;

import auto.entity.Device;
import java.util.List;

public class ChatbotEngine {

    public static String processQuestion(
        String question,
        List<Device> devices
    ) {
        String q = question.toLowerCase().trim();

        // Total devices
        int total = devices.size();
        long safe = devices.stream()
            .filter(d -> "Safe".equals(d.getStatus()))
            .count();
        long suspicious = devices.stream()
            .filter(d -> "Suspicious".equals(d.getStatus()))
            .count();
        long critical = devices.stream()
            .filter(d -> d.getTrustScore() < 20)
            .count();
        

        // Find most critical device
        Device mostCritical = devices.stream()
            .min((a, b) -> 
                Integer.compare(
                    a.getTrustScore(),
                    b.getTrustScore()
                )
            )
            .orElse(null);

        // QUESTION MATCHING

        // How many devices
        if (q.contains("how many") && 
            q.contains("device")) {
            return "SentinelMesh is currently monitoring " 
                + total + " devices. " 
                + safe + " devices are safe and " 
                + suspicious + " devices are suspicious.";
        }

        // Which devices are at risk
        if (q.contains("at risk") || 
            q.contains("dangerous") ||
            q.contains("threat")) {
            StringBuilder sb = new StringBuilder();
            sb.append("Based on current analysis, ");
            boolean found = false;
            for (Device d : devices) {
                if (d.getTrustScore() < 50) {
                    sb.append(d.getDeviceName())
                      .append(" (Trust Score: ")
                      .append(d.getTrustScore())
                      .append("%), ");
                    found = true;
                }
            }
            if (!found) {
                return "Great news! All devices are currently safe with no threats detected.";
            }
            sb.append("require immediate attention.");
            return sb.toString();
        }

        // Critical devices
        if (q.contains("critical") || 
            q.contains("immediate") ||
            q.contains("isolate")) {
            if (critical == 0) {
                return "No critical devices detected. All devices are operating within safe parameters.";
            }
            StringBuilder sb = new StringBuilder();
            sb.append("CRITICAL ALERT: ");
            sb.append(critical);
            sb.append(" device(s) require immediate isolation. ");
            for (Device d : devices) {
                if (d.getTrustScore() < 20) {
                    sb.append(d.getDeviceName())
                      .append(" has a critical trust score of ")
                      .append(d.getTrustScore())
                      .append("/100. ");
                }
            }
            return sb.toString();
        }

        // Safe devices
        if (q.contains("safe")) {
            if (safe == total) {
                return "All " + total + " devices are safe! No threats detected across the network.";
            }
            StringBuilder sb = new StringBuilder();
            sb.append(safe + " out of " + total + " devices are safe. Safe devices: ");
            for (Device d : devices) {
                if ("Safe".equals(d.getStatus())) {
                    sb.append(d.getDeviceName()).append(", ");
                }
            }
            return sb.toString().replaceAll(", $", ".");
        }

        // Most dangerous device
        if (q.contains("most dangerous") || 
            q.contains("worst") ||
            q.contains("highest risk")) {
            if (mostCritical != null) {
                return "The highest risk device is " 
                    + mostCritical.getDeviceName() 
                    + " with a trust score of " 
                    + mostCritical.getTrustScore() 
                    + "/100. "
                    + ThreatAnalysisEngine
                        .analyze(mostCritical)
                        .get("recommendation");
            }
        }

        // Network status
        if (q.contains("network") || 
            q.contains("status") ||
            q.contains("overall")) {
            if (critical > 0) {
                return "CRITICAL: Network security is compromised. "
                    + critical + " device(s) at critical risk. "
                    + "Immediate action required to prevent breach.";
            }
            if (suspicious > 0) {
                return "WARNING: Network has " + suspicious 
                    + " suspicious device(s). " 
                    + safe + " devices are safe. "
                    + "Monitor suspicious devices closely.";
            }
            return "Network is SECURE. All " + total 
                + " devices are operating normally.";
        }

        // Trust score of specific device
        if (q.contains("trust score") || 
            q.contains("score of")) {
            for (Device d : devices) {
                if (q.contains(
                    d.getDeviceName().toLowerCase()
                )) {
                    return d.getDeviceName() 
                        + " has a trust score of " 
                        + d.getTrustScore() 
                        + "/100. Status: " 
                        + d.getStatus() + ".";
                }
            }
            return "Please specify a device name to check its trust score.";
        }

        // Recommendations
        if (q.contains("recommend") || 
            q.contains("what should") ||
            q.contains("what to do")) {
            if (critical > 0) {
                return "URGENT: Isolate critical devices immediately. "
                    + "Run security scan on all suspicious devices. "
                    + "Review access logs for unauthorized entries.";
            }
            if (suspicious > 0) {
                return "Recommended actions: Monitor suspicious devices closely, "
                    + "restrict their network access, "
                    + "and run a security audit within 24 hours.";
            }
            return "Network looks good! Continue regular monitoring "
                + "and ensure all device firmware is up to date.";
        }

        // Help
        if (q.contains("help") || 
            q.contains("what can you")) {
            return "I am SentinelMesh AI Assistant. "
                + "I can answer questions like: "
                + "'Which devices are at risk?', "
                + "'What is the network status?', "
                + "'Which device is most dangerous?', "
                + "'What should I do?', "
                + "'How many devices are safe?'";
        }

        // Default response
        return "I analyzed your network with " + total 
            + " devices. " + safe + " are safe and " 
            + suspicious + " are suspicious. "
            + "Ask me about specific devices or "
            + "network status for detailed analysis.";
    }
}