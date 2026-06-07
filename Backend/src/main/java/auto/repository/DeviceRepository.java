package auto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import auto.entity.Device;

public interface DeviceRepository extends JpaRepository<Device, Integer> {

}