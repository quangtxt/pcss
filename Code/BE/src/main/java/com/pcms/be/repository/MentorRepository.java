package com.pcms.be.repository;

import com.pcms.be.domain.user.Mentor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long> {
//    @Query(value = "SELECT m.* FROM v_mentor m WHERE m.personal_email = :email", nativeQuery = true)
//    Optional<Mentor> findByPersonalEmail( String email);
}
