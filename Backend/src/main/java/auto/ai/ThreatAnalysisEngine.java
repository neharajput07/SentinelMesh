package auto.ai;

import auto.entity.Device;
import java.util.HashMap;
import java.util.Map;

public class ThreatAnalysisEngine {

    // MAIN METHOD — Analyze one device
    public static Map<String, Object> analyze(
        Device device
    ) {
        Map<String, Object> result = new HashMap<>();

        int trustScore = device.getTrustScore();
        String deviceName = device.getDeviceName();
        String status = device.getStatus();

        // 1. Calculate Risk Score
        int riskScore = calculateRiskScore(trustScore);

        // 2. Detect Risk Level
        String riskLevel = detectRiskLevel(riskScore);

        // 3. Detect Anomaly Pattern
        String anomalyPattern = detectAnomalyPattern(
            trustScore, status
        );

        // 4. Predict Breach Time
        String breachPrediction = predictBreachTime(
            trustScore
        );

        // 5. Generate AI Report
        String aiReport = generateReport(
            deviceName,
            trustScore,
            riskLevel,
            anomalyPattern,
            breachPrediction
        );

        // 6. Generate Recommendation
        String recommendation = generateRecommendation(
            riskLevel
        );

        result.put("deviceName", deviceName);
        result.put("trustScore", trustScore);
        result.put("riskScore", riskScore);
        result.put("riskLevel", riskLevel);
        result.put("anomalyPattern", anomalyPattern);
        result.put("breachPrediction", breachPrediction);
        result.put("aiReport", aiReport);
        result.put("recommendation", recommendation);

        return result;
    }

    // Calculate risk score from trust score
    private static int calculateRiskScore(int trustScore) {
        return 100 - trustScore;
    }

    // Detect risk level
    private static String detectRiskLevel(int riskScore) {
        if (riskScore >= 80) return "CRITICAL";
        if (riskScore >= 60) return "HIGH";
        if (riskScore >= 40) return "MEDIUM";
        return "LOW";
    }

    // Detect anomaly pattern
    private static String detectAnomalyPattern(
        int trustScore, String status
    ) {
        if (trustScore < 20) {
            return "Critical trust degradation detected — possible device hijacking";
        }
        if (trustScore < 40) {
            return "Severe trust drop — unauthorized access pattern detected";
        }
        if (trustScore < 50 && 
            "Suspicious".equals(status)) {
            return "Suspicious behavior pattern — possible man-in-the-middle attack";
        }
        if (trustScore < 70) {
            return "Moderate anomaly — device showing unstable behavior";
        }
        return "No anomaly detected — device behavior is normal";
    }

    // Predict breach time
    private static String predictBreachTime(
        int trustScore
    ) {
        if (trustScore < 20) {
            return "Immediate — breach likely within 1-2 hours";
        }
        if (trustScore < 30) {
            return "Critical — breach predicted within 4-6 hours";
        }
        if (trustScore < 40) {
            return "High — breach predicted within 12-24 hours";
        }
        if (trustScore < 50) {
            return "Moderate — breach predicted within 48 hours";
        }
        if (trustScore < 70) {
            return "Low — monitor closely, no immediate threat";
        }
        return "Safe — no breach predicted";
    }

    // Generate human readable AI report
    private static String generateReport(
        String deviceName,
        int trustScore,
        String riskLevel,
        String anomalyPattern,
        String breachPrediction
    ) {
        if (riskLevel.equals("CRITICAL")) {
            return "CRITICAL ALERT: Device " + deviceName +
                " has reached a critical trust score of " +
                trustScore + "/100. " + anomalyPattern +
                ". Immediate isolation is required. " +
                "Predicted timeline: " + breachPrediction + ".";
        }
        if (riskLevel.equals("HIGH")) {
            return "HIGH RISK: Device " + deviceName +
                " shows severe trust degradation at " +
                trustScore + "/100. " + anomalyPattern +
                ". Urgent attention required. " +
                "Predicted timeline: " + breachPrediction + ".";
        }
        if (riskLevel.equals("MEDIUM")) {
            return "MEDIUM RISK: Device " + deviceName +
                " is showing unusual patterns with trust score " +
                trustScore + "/100. " + anomalyPattern +
                ". Close monitoring recommended. " +
                "Predicted timeline: " + breachPrediction + ".";
        }
        return "Device " + deviceName +
            " is operating normally with trust score " +
            trustScore + "/100. " + anomalyPattern + ".";
    }

    // Generate recommendation
    private static String generateRecommendation(
        String riskLevel
    ) {
        if (riskLevel.equals("CRITICAL")) {
            return "Isolate device immediately from network";
        }
        if (riskLevel.equals("HIGH")) {
            return "Restrict device access and run security scan";
        }
        if (riskLevel.equals("MEDIUM")) {
            return "Monitor device closely and review access logs";
        }
        return "No action required — continue monitoring";
    }
}