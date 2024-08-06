package com.pcms.be.controller;

import com.pcms.be.domain.meeting.Note;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.MeetingDTO;
import com.pcms.be.pojo.request.CreateNoteRequest;
import com.pcms.be.pojo.request.EditMeetingRequest;
import com.pcms.be.pojo.request.EditNoteRequest;
import com.pcms.be.pojo.request.CreateMeetingRequest;
import com.pcms.be.pojo.response.NoteResponse;
import com.pcms.be.service.MeetingService;
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
    public final MeetingService meetingService;
    public final ModelMapper modelMapper;

    @PostMapping("/note/create")
    public ResponseEntity<NoteResponse> createNote(@RequestBody CreateNoteRequest createNoteRequest) {
        try {
            Note note = noteService.createNote(createNoteRequest);
            NoteResponse noteResponse = modelMapper.map(note, NoteResponse.class);
            return ResponseEntity.ok(noteResponse);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PutMapping("note/edit")
    public ResponseEntity<NoteResponse> editNote(@RequestBody EditNoteRequest editNoteRequest) {
        try {
            Note note = noteService.editNote(editNoteRequest);
            NoteResponse noteResponse = modelMapper.map(note, NoteResponse.class);
            return ResponseEntity.ok(noteResponse);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @DeleteMapping("/note")
    public ResponseEntity<NoteResponse> removeNote(@RequestParam int noteId) {
        try {
            Note note = noteService.removeNote(noteId);
            NoteResponse noteResponse = modelMapper.map(note, NoteResponse.class);
            return ResponseEntity.ok(noteResponse);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/notes/{meetingId}")
    public ResponseEntity<List<NoteResponse>> viewNotes(@PathVariable int meetingId) {
        try {
            List<Note> notes = noteService.viewNotes(meetingId);
            List<NoteResponse> noteResponseList = new ArrayList<>();
            for (Note note : notes
            ) {
                NoteResponse noteResponse = modelMapper.map(note, NoteResponse.class);
                noteResponseList.add(noteResponse);
            }
            return ResponseEntity.ok(noteResponseList);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/view/{groupId}")
    public ResponseEntity<List<MeetingDTO>> viewMeetings(@PathVariable int groupId) {
        try {
            List<MeetingDTO> meetings = meetingService.viewMeetings(groupId);
            return ResponseEntity.ok(meetings);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<List<MeetingDTO>> createMeeting(@RequestBody List<CreateMeetingRequest> meetingRequests){
        try {
            List<MeetingDTO> newMeetings = meetingService.createMeeting(meetingRequests);
            return ResponseEntity.ok(newMeetings);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<List<MeetingDTO>> updateMeeting(@RequestBody List<EditMeetingRequest> editMeetingRequests){
        try {
            List<MeetingDTO> updateMeetings = meetingService.updateMeeting(editMeetingRequests);
            return ResponseEntity.ok(updateMeetings);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @DeleteMapping("/delete/{meetingId}")
    public ResponseEntity<MeetingDTO> deleteMeeting(@PathVariable int meetingId){
        try {
            MeetingDTO deleteMeeting = meetingService.removeMeeting(meetingId);
            return ResponseEntity.ok(deleteMeeting);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/getByMeetingId/{meetingId}")
    public ResponseEntity<MeetingDTO> getByMeetingId(@PathVariable int meetingId) throws ServiceException{
        return meetingService.getByMeetingId(meetingId);
    }

}
