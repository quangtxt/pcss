package com.pcms.be.repository;

import com.pcms.be.domain.user.GroupMentor;
import com.pcms.be.domain.user.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupMentorRepository extends JpaRepository<GroupMentor, Long> {


    Optional<GroupMentor> findById(Long id);

    List<GroupMentor> findByMentorIdAndStatus(Mentor mentorId, String status);
    List<GroupMentor> findAllByStatus(String status);



}
