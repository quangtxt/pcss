package com.pcms.be.repository;

import com.pcms.be.domain.user.GroupMentorInvitation;
import com.pcms.be.domain.user.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupMentorInvitationRepository extends JpaRepository<GroupMentorInvitation, Long> {


    Optional<GroupMentorInvitation> findById(Long id);

    List<GroupMentorInvitation> findByMentorIdAndStatus(Mentor mentorId, String status);

}
