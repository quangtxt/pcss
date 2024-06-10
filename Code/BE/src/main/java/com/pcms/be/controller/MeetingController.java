package com.pcms.be.controller;

import com.pcms.be.domain.meeting.Note;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.CreateNoteRequest;
import com.pcms.be.pojo.request.EditNoteRequest;
import com.pcms.be.pojo.response.NoteResponse;
import com.pcms.be.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/meeting")
public class MeetingController {
    public final NoteService noteService;
    public final ModelMapper modelMapper;
    @PostMapping("/create-note")
    public ResponseEntity<NoteResponse> createNote(@RequestBody CreateNoteRequest createNoteRequest) {
        try {
            Note note = noteService.createNote(createNoteRequest);
            NoteResponse noteResponse = modelMapper.map(note, NoteResponse.class);
            return ResponseEntity.ok(noteResponse);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/edit-note")
    public ResponseEntity<NoteResponse> editNote(@RequestBody EditNoteRequest editNoteRequest) {
        try {
            Note note = noteService.editNote(editNoteRequest);
            NoteResponse noteResponse = modelMapper.map(note, NoteResponse.class);
            return ResponseEntity.ok(noteResponse);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @DeleteMapping("/remove-note")
    public ResponseEntity<NoteResponse> removeNote(@RequestParam int noteId) {
        try {
            Note note = noteService.removeNote(noteId);
            NoteResponse noteResponse = modelMapper.map(note, NoteResponse.class);
            return ResponseEntity.ok(noteResponse);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @GetMapping("/view-notes")
    public ResponseEntity<List<NoteResponse>> viewNotes(@RequestParam int meetingId) {
        try {
            List<Note> notes = noteService.viewNotes(meetingId);
            List<NoteResponse> noteResponseList = new ArrayList<>();
            for (Note note: notes
                 ) {
                NoteResponse noteResponse = modelMapper.map(note, NoteResponse.class);
                noteResponseList.add(noteResponse);
            }
            return ResponseEntity.ok(noteResponseList);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
