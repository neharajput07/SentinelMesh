package auto.entity;

import jakarta.persistence.*;

@Entity
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String action;

    private String deviceName;

    private String timestamp;

    public ActivityLog() {
    }

    public ActivityLog(
            String action,
            String deviceName,
            String timestamp
    ) {

        this.action = action;
        this.deviceName = deviceName;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}