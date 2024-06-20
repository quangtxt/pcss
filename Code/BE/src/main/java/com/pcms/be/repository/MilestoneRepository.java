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
    @Query(value = "SELECT m.* FROM milestone m WHERE m.phase_id = :phaseId AND m.start_at <= :checkTime And m.status != 'OVER TIME' ", nativeQuery = true)
    List<Milestone> findByPhaseIdAndDuration(int phaseId, OffsetDateTime checkTime);
    @Query(value = "SELECT m.* FROM milestone m WHERE m.phase_id = :phaseId AND m.id != :id AND m.start_at <= :checkTime And m.status != 'OVER TIME' ", nativeQuery = true)
    List<Milestone> findByPhaseIdAndDurationAndDifferentCurrentMilestone(int phaseId, OffsetDateTime checkTime, int id);
}
