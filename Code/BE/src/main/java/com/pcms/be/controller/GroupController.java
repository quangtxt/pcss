package com.pcms.be.controller;

import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.*;
import com.pcms.be.pojo.request.CreateGroupRequest;
import com.pcms.be.pojo.request.EditGroupRequest;
import com.pcms.be.pojo.request.SubmitGroupRequest;
import com.pcms.be.pojo.response.GroupResponse;
import com.pcms.be.pojo.response.SubmitGroupResponse;
import com.pcms.be.service.GroupService;
import com.pcms.be.service.MemberService;
import com.pcms.be.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/group")

public class GroupController {
    private final GroupService groupService;
    private final StudentService studentService;
    private final MemberService memberService;
    private final ModelMapper modelMapper;

    @PostMapping("/create")
    public ResponseEntity<GroupResponse> createGroup(@Valid @RequestBody CreateGroupRequest createGroupDTO) {
        try {
            GroupResponse createdGroup = groupService.createGroup(createGroupDTO);
            return ResponseEntity.ok(createdGroup);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<GroupResponse> editGroup(@Valid @RequestBody EditGroupRequest editGroupDTO) {
        try {
            GroupResponse editGroup = groupService.editGroup(editGroupDTO);
            return ResponseEntity.ok(editGroup);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/student/invite/allow")
    public ResponseEntity<List<StudentResponse>> getListStudentToInvite() {
        List<StudentResponse> studentResponseList = studentService.getAllStudentToInvite();
        return ResponseEntity.ok(studentResponseList);
    }

    @GetMapping("/invitations")
    public ResponseEntity<List<MemberResponse>> getListInvitationToJoinGroup() {
        try {
            List<MemberResponse> invitation = memberService.getInvitations();
            return ResponseEntity.ok(invitation);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/update/invitation/status")
    public ResponseEntity<MemberResponse> updateInvitationStatus(@Valid @RequestBody UpdateInvitationStatusRequest updateInvitationStatusRequest) {
        try {
            MemberResponse member = memberService.updateStatus(updateInvitationStatusRequest);
            return ResponseEntity.ok(member);

        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @GetMapping("/view")
    public ResponseEntity<GroupResponse> getGroupById(@RequestParam int groupId){
        try {
        GroupResponse groupResponse = groupService.getGroupById(groupId);
        groupResponse.setMembers(memberService.getGroupMember(groupId));
        return ResponseEntity.ok(groupResponse);

        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("inviteMember")
    public ResponseEntity<List<MemberResponse>> inviteMember(@Valid @RequestBody InviteMemberRequest inviteMemberRequest){
        try {
            List<MemberResponse> memberResponse = memberService.inviteMember(inviteMemberRequest);
            return  ResponseEntity.ok(memberResponse);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
//
//    @PostMapping("removeMember")
//    public ResponseEntity<MemberResponse> removeMember(@Valid @RequestBody RemoveMemberRequest removeMemberRequest){
//        try {
//            MemberResponse memberResponse = memberService.removeMember(removeMemberRequest);
//            return  ResponseEntity.ok(memberResponse);
//        } catch (ServiceException e) {
//            throw new ApiException(e.getErrorCode(), e.getParams());
//        }
//    }
    @PostMapping("submitGroup")
    public ResponseEntity<SubmitGroupResponse> sumitGroup(@Valid @RequestBody SubmitGroupRequest submitGroupRequest){
        try {
            SubmitGroupResponse submitGroupResponse = groupService.submitGroup(submitGroupRequest);
            return ResponseEntity.ok(submitGroupResponse);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
