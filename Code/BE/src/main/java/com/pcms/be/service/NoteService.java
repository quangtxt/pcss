package com.pcms.be.service;

import com.pcms.be.domain.meeting.Note;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.CreateNoteRequest;
import com.pcms.be.pojo.request.EditNoteRequest;

import java.util.List;

public interface NoteService {
    Note createNote(CreateNoteRequest noteRequest) throws ServiceException;

    Note editNote(EditNoteRequest editNoteRequest) throws ServiceException;

    Note removeNote(int noteId) throws ServiceException;

    List<Note> viewNotes(int meetingId) throws ServiceException;
}
