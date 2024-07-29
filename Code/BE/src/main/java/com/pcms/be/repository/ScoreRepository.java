package com.pcms.be.repository;

import com.pcms.be.domain.user.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    @Query(value = "SELECT s.*\n" +
            "FROM v_scores s\n" +
            "INNER JOIN v_members m ON s.member_id = m.id\n" +
            "WHERE m.group_id = :groupId\n" +
            "  AND m.status = 'INGROUP'\n" +
            "  AND s.milestone_id = :milestoneId", nativeQuery = true)
    List<Score> getScoreByGroupIdAndMileStoneId(int groupId,int milestoneId);
    @Query(value = "SELECT s.*\n" +
            "FROM v_scores s\n" +
            "INNER JOIN v_members m ON s.member_id = m.id\n" +
            "WHERE m.group_id = :groupId\n" +
            "  AND m.status = 'INGROUP'", nativeQuery = true)
    List<Score> getScoreByGroupId(int groupId);

    Optional<Score> findByMemberIdAndMilestoneId(Long memberId, Long milestoneId);
}
