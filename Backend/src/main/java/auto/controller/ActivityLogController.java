package auto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import auto.entity.ActivityLog;
import auto.repository.ActivityLogRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class ActivityLogController {

    @Autowired
    ActivityLogRepository repo;

    @GetMapping("/logs")

    public List<ActivityLog> getLogs() {

        return repo.findAll();
    }
}
