package auto.controller;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import auto.entity.Device;
import auto.entity.ActivityLog;

import auto.repository.DeviceRepository;
import auto.repository.ActivityLogRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController

public class DeviceController {

    @Autowired
    DeviceRepository repo;

    @Autowired
    ActivityLogRepository activityLogRepository;

    // ADD DEVICE
    @PostMapping("/device")

    public Device addDevice(@RequestBody Device device) {

        if (device.getTrustScore() < 50) {

            device.setStatus("Suspicious");

        } else {

            device.setStatus("Safe");
        }

      Device savedDevice = repo.save(device);

System.out.println("DEVICE SAVED");

ActivityLog log = new ActivityLog(

        "Device Added",

        device.getDeviceName(),

        LocalDateTime.now().toString()

);

System.out.println("LOG OBJECT CREATED");

activityLogRepository.save(log);

System.out.println("LOG SAVED TO DATABASE");

return savedDevice;
    }

    // GET ALL DEVICES
    @GetMapping("/device")

    public List<Device> getDevices() {

        return repo.findAll();
    }

    // UPDATE DEVICE
    @PutMapping("/device/{id}")

    public Device updateDevice(

            @PathVariable Integer id,

            @RequestBody Device updatedDevice

    ) {

        Device existingDevice = repo.findById(id).orElse(null);

        if (existingDevice != null) {

            existingDevice.setDeviceName(
                    updatedDevice.getDeviceName()
            );

            existingDevice.setTrustScore(
                    updatedDevice.getTrustScore()
            );

            if (updatedDevice.getTrustScore() < 50) {

                existingDevice.setStatus("Suspicious");

            } else {

                existingDevice.setStatus("Safe");
            }

            Device savedDevice = repo.save(existingDevice);

            // SAVE LOG

            ActivityLog log = new ActivityLog(

                    "Device Updated",

                    existingDevice.getDeviceName(),

                    LocalDateTime.now().toString()

            );

            activityLogRepository.save(log);

            return savedDevice;
        }

        return null;
    }

    // DELETE DEVICE
    @DeleteMapping("/device/{id}")

    public String deleteDevice(@PathVariable Integer id) {

        Device device = repo.findById(id).orElse(null);

        if (device != null) {

            // SAVE LOG

            ActivityLog log = new ActivityLog(

                    "Device Deleted",

                    device.getDeviceName(),

                    LocalDateTime.now().toString()

            );

            activityLogRepository.save(log);

            repo.deleteById(id);

            return "Device Deleted Successfully";
        }

        return "Device Not Found";
    }
}