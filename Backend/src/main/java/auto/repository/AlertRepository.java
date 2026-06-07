package auto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import auto.entity.Alert;

public interface AlertRepository extends JpaRepository<Alert, Integer>
{

}