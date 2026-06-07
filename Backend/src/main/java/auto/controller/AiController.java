package auto.controller;

import auto.ai.ThreatAnalysisEngine;
import auto.ai.ChatbotEngine;
import auto.entity.Device;
import auto.repository.DeviceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/ai")
public class AiController {

    @Autowired
    DeviceRepository deviceRepository;

    // Analyze ALL devices
    @GetMapping("/analyze")
    public List<Map<String, Object>> analyzeAll() {

        List<Device> devices = deviceRepository.findAll();
        List<Map<String, Object>> results = new ArrayList<>();

        for (Device device : devices) {
            results.add(
                ThreatAnalysisEngine.analyze(device)
            );
        }

        return results;
    }

    // Analyze ONE device by ID
    @GetMapping("/analyze/{id}")
    public Map<String, Object> analyzeOne(
        @PathVariable Integer id
    ) {
        Device device = deviceRepository
            .findById(id)
            .orElse(null);

        if (device == null) {
            return Map.of("error", "Device not found");
        }

        return ThreatAnalysisEngine.analyze(device);
    }

    // Chatbot endpoint
    @PostMapping("/chat")
    public Map<String, String> chat(
        @RequestBody Map<String, String> request
    ) {
        String question = request.get("question");
        List<Device> devices = deviceRepository.findAll();

        String answer = ChatbotEngine.processQuestion(
            question, devices
        );

        return Map.of(
            "question", question,
            "answer", answer
        );
    }
}