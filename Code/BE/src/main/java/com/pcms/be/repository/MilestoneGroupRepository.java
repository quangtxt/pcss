package com.pcms.be.repository;

import com.pcms.be.domain.MilestoneGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MilestoneGroupRepository extends JpaRepository<MilestoneGroup, Long> {
    List<MilestoneGroup> findAllByMilestoneId(int milestoneId);

    @Query(value = "SELECT mg.* FROM v_milestone_group mg\n" +
            "WHERE mg.group_id = :groupId And mg.milestone_id = :milestoneId ;", nativeQuery = true)
    Optional<MilestoneGroup> findByGroupIdAndMilestoneId(int groupId, int milestoneId);
}
