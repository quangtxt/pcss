package com.pcms.be.service.impl;

import com.pcms.be.domain.meeting.Meeting;
import com.pcms.be.domain.meeting.Note;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.CreateNoteRequest;
import com.pcms.be.pojo.request.EditNoteRequest;
import com.pcms.be.repository.MeetingRepository;
import com.pcms.be.repository.NoteRepository;
import com.pcms.be.service.NoteService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class NoteServiceImpl implements NoteService {
    private final UserService userService;
    private final MeetingRepository meetingRepository;
    private final NoteRepository noteRepository;
    @Override
    public Note createNote(CreateNoteRequest noteRequest) throws ServiceException {
        try {
            Optional<Meeting> meeting = meetingRepository.findById(Long.valueOf(noteRequest.getMeetingId()));
            if(!meeting.isPresent()){
                throw new ServiceException(ErrorCode.NOT_FOUND);
            }
            Note newNote = new Note();
            newNote.setContent(noteRequest.getContent());
            newNote.setTitle(noteRequest.getTitle());
            newNote.setAuthor(userService.getCurrentUser());
            newNote.setMeeting(meeting.get());
            noteRepository.save(newNote);
            return newNote;
        }catch (Exception e){
            throw new ServiceException(ErrorCode.FAILED_CREATE_NOTE);
        }
    }

    @Override
    public Note editNote(EditNoteRequest editNoteRequest) throws ServiceException {
        try {
            Optional<Meeting> meeting = meetingRepository.findById(Long.valueOf(editNoteRequest.getMeetingId()));
            if(!meeting.isPresent()){
                throw new ServiceException(ErrorCode.NOT_FOUND);
            }
            Optional<Note> note = noteRepository.findById(Long.valueOf(editNoteRequest.getNoteId()));
            if(!note.isPresent()){
                throw new ServiceException(ErrorCode.NOT_FOUND);
            }
            if(userService.getCurrentUser().getId() != Long.valueOf(editNoteRequest.getAuthorId())){
                throw new ServiceException(ErrorCode.USER_NOT_ALLOW);
            }
            Note editNote = note.get();
            editNote.setContent(editNoteRequest.getContent());
            editNote.setTitle(editNoteRequest.getTitle());
            noteRepository.save(editNote);
            return editNote;
        }catch (Exception e){
            throw new ServiceException(ErrorCode.FAILED_EDIT_NOTE);
        }
    }

    @Override
    public Note removeNote(int noteId) throws ServiceException {
        Optional<Note> note = noteRepository.findById(Long.valueOf(noteId));
        if(!note.isPresent()){
            throw new ServiceException(ErrorCode.NOT_FOUND);
        }
        Note removeNote = note.get();
        if(userService.getCurrentUser().getId() != removeNote.getAuthor().getId()){
            throw new ServiceException(ErrorCode.USER_NOT_ALLOW);
        }
        noteRepository.delete(removeNote);
        return removeNote;
    }

    @Override
    public List<Note> viewNotes(int meetingId) throws ServiceException {
        List<Note> notes = noteRepository.findAllByMeeting_Id(Long.valueOf(meetingId));
        return notes;
    }
}
