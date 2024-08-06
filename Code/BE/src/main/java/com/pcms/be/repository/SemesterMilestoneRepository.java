package com.pcms.be.repository;

import com.pcms.be.domain.Semester;
import com.pcms.be.domain.Semester_Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SemesterMilestoneRepository extends JpaRepository<Semester_Milestone, Long> {

    List<Semester_Milestone> findAllById(Long id);
    List<Semester_Milestone> findAllBySemester(Semester semester);
    @Query(value = "SELECT sm.*\n" +
            "FROM Semester_Milestone sm\n" +
            "INNER JOIN Milestone m\n" +
            "ON sm.milestone_id = m.id\n" +
            "WHERE m.name is null AND  sm.start_date < NOW() AND sm.end_date >= NOW()\n" +
            "ORDER BY ABS(TIMESTAMPDIFF(SECOND, NOW(), sm.end_date)) ASC\n" +
            "LIMIT 1;", nativeQuery = true)
    Optional<Semester_Milestone> findLatestSemesterMilestone();
    @Query(value = "SELECT sm.*\n" +
            "FROM Semester_Milestone sm\n" +
            "INNER JOIN Milestone m\n" +
            "ON sm.milestone_id = m.id\n" +
            "WHERE sm.end_date != :offsetDateTime AND m.name is null AND  sm.start_date < NOW() AND sm.end_date >= NOW()\n" +
            "ORDER BY ABS(TIMESTAMPDIFF(SECOND, NOW(), sm.end_date)) ASC\n" +
            "LIMIT 1;", nativeQuery = true)
    Optional<Semester_Milestone> findLatestSemesterMilestoneAndDifferentCron(LocalDateTime offsetDateTime);
    @Query(value = "SELECT sm.* FROM semester_milestone sm\n" +
            "INNER JOIN Milestone m\n" +
            "ON sm.milestone_id = m.id\n" +
            "WHERE sm.end_date = :endDate AND m.name IS NULL\n" +
            ";", nativeQuery = true)
    List<Semester_Milestone> findByEndDate(LocalDateTime endDate);
}
