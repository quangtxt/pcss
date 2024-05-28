package com.pcms.be.controller;


import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.GroupMentorInvitation;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.response.GroupMentorInvitationResponse;
import com.pcms.be.pojo.response.GroupResponse;
import com.pcms.be.service.GroupMentorInvitationService;
import com.pcms.be.service.GroupService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/group-member-invitation")

public class GroupMentorInvitationController {
    private final GroupMentorInvitationService groupMemberInvitationService;
    private final GroupService groupService;
    private final ModelMapper modelMapper;
    private final UserService userService;
    @GetMapping("/getInvitation")
    public ResponseEntity<List<GroupMentorInvitationResponse>> getGroupInvitation(){
        try {
           List<GroupMentorInvitationResponse> groupMentorInvitationResponses = groupMemberInvitationService.getListInvitationByStatus(Constants.MentorStatus.PENDING_MENTOR);
           return ResponseEntity.ok(groupMentorInvitationResponses);
        }catch (ServiceException e){
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/getListMentorRegisted")
    public ResponseEntity<List<GroupMentorInvitationResponse>> getGroupMentorRegisted(){
        try {
            List<GroupMentorInvitationResponse> groupMentorInvitationResponse = groupMemberInvitationService.getListInvitationByStatus(Constants.MentorStatus.PENDING_LEADER_TEACHER);
            return ResponseEntity.ok(groupMentorInvitationResponse);
        }catch (ServiceException e){
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<GroupMentorInvitation> putStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            GroupMentorInvitation editGroupMentorInvitation = groupMemberInvitationService.putStatus(id,status);
            return ResponseEntity.ok(editGroupMentorInvitation);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
