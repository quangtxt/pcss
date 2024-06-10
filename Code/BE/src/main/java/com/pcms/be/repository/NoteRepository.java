package com.pcms.be.repository;

import com.pcms.be.domain.meeting.Meeting;
import com.pcms.be.domain.meeting.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findAllByMeeting_Id(Long meetingId);
}
