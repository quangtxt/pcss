package com.pcms.be.repository;

import com.pcms.be.domain.CapstonePhase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CapstonePhaseRepository extends JpaRepository<CapstonePhase, Long> {
    @Query(value = "SELECT c.* FROM capstone_phase c\n" +
            "WHERE c.semester_id = :semester_id AND (:start BETWEEN c.start_at And c.end_at OR :end BETWEEN c.start_at And c.end_at)\n" +
            "OR (:start <= c.start_at AND :end >= c.end_at)", nativeQuery = true)
    List<CapstonePhase> findAllByStartAndEnd(OffsetDateTime start, OffsetDateTime end, int semester_id);
    @Query(value = "SELECT c.* FROM capstone_phase c\n" +
            "WHERE c.semester_id = :semester_id AND c.id != :phase_id AND ((:start BETWEEN c.start_at And c.end_at OR :end BETWEEN c.start_at And c.end_at)\n" +
            "OR (:start <= c.start_at AND :end >= c.end_at))", nativeQuery = true)
    List<CapstonePhase> findAllByStartAndEndAndDifferentCurrent(OffsetDateTime start, OffsetDateTime end, int semester_id, int phase_id);

    @Query(value = "SELECT c.* FROM capstone_phase c " +
            "WHERE c.name = :name AND c.semester_id = :semester_id", nativeQuery = true)
    Optional<CapstonePhase> findByName(String name, int semester_id);
}
