package com.pcms.be.repository;

import com.pcms.be.domain.user.GroupMentorInvitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface GroupMentorInvitationRepository extends JpaRepository<GroupMentorInvitation, Long> {
    @Transactional
    @Modifying
    @Query(value = "SELECT * FROM iqi5186tmljsc2ji.v_group_mentor_invitation where (mentor_id = :mentorId and status = :status) ", nativeQuery = true)
    List<GroupMentorInvitation> findAllByMentorIdAndStatus(Long mentorId, String status);
}
