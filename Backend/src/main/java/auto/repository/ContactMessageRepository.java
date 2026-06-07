package auto.repository;

import auto.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository
    extends JpaRepository<ContactMessage, Long> {
}