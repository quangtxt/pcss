package com.pcms.be.repository;

import com.pcms.be.domain.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.Optional;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, Long> {
    @Query(value = "SELECT s.* FROM Semester s WHERE :now BETWEEN s.start_at AND s.end_at", nativeQuery = true)
    Optional<Semester> findByCurrent(@Param("now") OffsetDateTime now);
}
