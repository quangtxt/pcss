package com.pcms.be.repository;

import com.pcms.be.domain.Milestone;
import com.pcms.be.domain.MilestoneGroup;
import org.checkerframework.checker.nullness.Opt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MilestoneGroupRepository extends JpaRepository<MilestoneGroup, Long> {
    List<MilestoneGroup> findAllByMilestoneId(int milestoneId);
    Optional<MilestoneGroup> findByGroupIdAndMilestoneId(int groupId, int milestoneId);
}
