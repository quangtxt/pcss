package com.pcms.be.repository;

import com.pcms.be.domain.meeting.Meeting;
import com.pcms.be.domain.user.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> findAllByGroup(Group group);
}
