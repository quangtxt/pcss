package com.pcms.be.repository;

import com.pcms.be.domain.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    @Query(value = "SELECT s.* FROM submission s WHERE s.due_date = :dueDate", nativeQuery = true)
    List<Submission> findAllSubmissionByDueDate(OffsetDateTime dueDate);
}
