package com.pcms.be.repository;

import com.pcms.be.domain.Semester;
import com.pcms.be.domain.Semester_Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SemesterMilestoneRepository extends JpaRepository<Semester_Milestone, Long> {

    List<Semester_Milestone> findAllById(Long id);
    List<Semester_Milestone> findAllBySemester(Semester semester);
}
