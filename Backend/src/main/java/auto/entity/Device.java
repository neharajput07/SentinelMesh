package auto.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer id;

    private String deviceName;

    private String status;

    private int trustScore;

    // GET ID
    public Integer getId() {
        return id;
    }

    // SET ID
    public void setId(Integer id) {
        this.id = id;
    }

    // GET DEVICE NAME
    public String getDeviceName() {
        return deviceName;
    }

    // SET DEVICE NAME
    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    // GET STATUS
    public String getStatus() {
        return status;
    }

    // SET STATUS
    public void setStatus(String status) {
        this.status = status;
    }

    // GET TRUST SCORE
    public int getTrustScore() {
        return trustScore;
    }

    // SET TRUST SCORE
    public void setTrustScore(int trustScore) {
        this.trustScore = trustScore;
    }
}