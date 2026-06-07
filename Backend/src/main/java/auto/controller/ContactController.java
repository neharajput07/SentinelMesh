package auto.controller;

import auto.entity.ContactMessage;
import auto.repository.ContactMessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    ContactMessageRepository repo;

    // Save new message
    @PostMapping
    public String saveMessage(
        @RequestBody Map<String, String> body
    ) {
        ContactMessage msg = new ContactMessage(
            body.get("name"),
            body.get("email"),
            body.get("message")
        );
        repo.save(msg);
        return "Message sent successfully!";
    }

    // Get all messages
    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return repo.findAll();
    }

// Delete message
    @DeleteMapping("/{id}")
    public String deleteMessage(@PathVariable Long id) {
        repo.deleteById(id);
        return "Message deleted";
    }
}