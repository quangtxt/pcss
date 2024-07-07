package com.pcms.be.repository;

import com.pcms.be.domain.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
    // And m.status != 'OVER TIME'
//    @Query(value = "SELECT m.* FROM milestone m WHERE m.phase_id = :phaseId AND m.start_at <= :checkTime AND ", nativeQuery = true)
//    List<Milestone> findByPhaseIdAndDuration(int phaseId, OffsetDateTime checkTime);

    @Query(value = "SELECT m.* FROM milestone m \n" +
            "WHERE m.phase_id = :phaseId \n" +
            "AND (m.start_at < DATE_ADD(:checkTime, INTERVAL :duration*7 DAY) AND m.start_at > :checkTime)\n" +
            "OR (:checkTime > m.start_at AND :checkTime < DATE_ADD(m.start_at, INTERVAL m.duration*7 DAY));", nativeQuery = true)
    List<Milestone> findByPhaseIdAndDuration(int phaseId, OffsetDateTime checkTime, int duration);
    @Query(value = "SELECT m.* FROM milestone m WHERE m.phase_id = :phaseId AND m.id != :id AND m.start_at <= :checkTime", nativeQuery = true)
    List<Milestone> findByPhaseIdAndDurationAndDifferentCurrentMilestone(int phaseId, OffsetDateTime checkTime, int id);

    @Query(value = "SELECT m.*\n" +
            "FROM Milestone m\n" +
            "ORDER BY ABS(DATEDIFF(m.start_at, CURDATE()))\n" +
            "LIMIT 1;", nativeQuery = true)
    Optional<Milestone> findLatestMilestoneEndDate();
}
