package com.pcms.be.controller;


import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.GroupMentorInvitation;
import com.pcms.be.domain.user.Mentor;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.EditGroupRequest;
import com.pcms.be.pojo.GroupResonse;
import com.pcms.be.pojo.MentorDTO;
import com.pcms.be.service.GroupMentorInvitationService;
import com.pcms.be.service.GroupService;
import com.pcms.be.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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
    public ResponseEntity<List<GroupResonse>> getGroupInvitation(){
        try {
            List<GroupMentorInvitation> listInvitation = groupMemberInvitationService.getListInvitationByStatus("PENDING");
            List<Long> groupIds = listInvitation.stream()
                    .map(invitation -> invitation.getGroupId().getId())
                    .collect(Collectors.toList());
            List<Group> listGroupHaveInvitation = groupService.getGroupsById(groupIds);
            List<GroupResonse> results = new ArrayList<>();
            for (Group item:listGroupHaveInvitation) {
                GroupResonse groupResonse = modelMapper.map(item, GroupResonse.class);
                results.add(groupResonse);
            }
            return ResponseEntity.ok(results);
        }catch (ServiceException e){
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/getListMentorRegisted")
    public ResponseEntity<List<GroupResonse>> getGroupMentorRegisted(){
        try {
            List<GroupMentorInvitation> listInvitation = groupMemberInvitationService.getListInvitationByStatus("APPROVAL");
            List<Long> groupIds = listInvitation.stream()
                    .map(invitation -> invitation.getGroupId().getId())
                    .collect(Collectors.toList());
            List<Group> listGroupHaveInvitation = groupService.getGroupsById(groupIds);
            List<GroupResonse> results = new ArrayList<>();
            for (Group item:listGroupHaveInvitation) {
                GroupResonse groupResonse = modelMapper.map(item, GroupResonse.class);
                results.add(groupResonse);
            }
            return ResponseEntity.ok(results);
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
