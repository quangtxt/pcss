package com.pcms.be.repository;

import com.pcms.be.domain.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
    @Query(value = "SELECT m.* FROM Milestone m WHERE m.parent is null", nativeQuery = true)
    List<Milestone> findAllMilestoneRoot();
    @Query(value = "SELECT m.* FROM Milestone m WHERE m.name is null", nativeQuery = true)
    List<Milestone> findAllSubmission();
}
