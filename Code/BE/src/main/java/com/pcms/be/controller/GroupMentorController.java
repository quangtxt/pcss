package com.pcms.be.controller;


import com.pcms.be.domain.user.GroupMentor;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.response.GroupMentorResponse;
import com.pcms.be.service.GroupMentorService;
import com.pcms.be.service.GroupService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/group-mentor")

public class GroupMentorController {
    private final GroupMentorService groupMentorService;
    private final GroupService groupService;
    private final ModelMapper modelMapper;
    private final UserService userService;
    @GetMapping("/list")
    public ResponseEntity<List<GroupMentorResponse>> getGroupInvitation(){
        try {
           List<GroupMentorResponse> groupMentorResponse = groupMentorService.getListInvitationByStatus(Constants.MentorStatus.PENDING_MENTOR);
           return ResponseEntity.ok(groupMentorResponse);
        }catch (ServiceException e){
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/getListMentorRegisted")
    public ResponseEntity<List<GroupMentorResponse>> getGroupMentorRegisted(){
        try {
            List<GroupMentorResponse> groupMentorResponse = groupMentorService.getListInvitationByStatus(Constants.MentorStatus.PENDING_LEADER_TEACHER);
            return ResponseEntity.ok(groupMentorResponse);
        }catch (ServiceException e){
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<GroupMentor> putStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            GroupMentor editGroupMentor = groupMentorService.putStatus(id,status);
            return ResponseEntity.ok(editGroupMentor);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
