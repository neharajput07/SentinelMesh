package auto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import auto.entity.Alert;
import auto.repository.AlertRepository;

@RestController
@RequestMapping("/alert")
public class AlertController
{

    @Autowired
    private AlertRepository repository;

    
    
    // =========================
    // ADD ALERT
    // =========================
    
    @PostMapping
    public Alert addAlert(@RequestBody Alert alert)
    {
        return repository.save(alert);
    }

    
    
    // =========================
    // GET ALL ALERTS
    // =========================
    
    @GetMapping
    public List<Alert> getAllAlerts()
    {
        return repository.findAll();
    }

}