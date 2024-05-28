package com.pcms.be.repository;

import com.pcms.be.domain.user.Mentor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long> {
//    @Query(value = "SELECT m.* FROM v_mentor m WHERE m.personal_email = :email", nativeQuery = true)
//    Optional<Mentor> findByPersonalEmail( String email);

    @Query("SELECT m "
            + "FROM Mentor m "
            + "JOIN m.user u "
            + "WHERE u.email LIKE %:keyword% "
            + "   OR u.name LIKE %:keyword%")
    Page<Mentor> findMentorsByEmailOrName(@Param("keyword") String keyword, Pageable pageable);
}
