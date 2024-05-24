package com.pcms.be.controller;


import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.GroupMentorInvitation;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.GroupDTO;
import com.pcms.be.pojo.GroupResonse;
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

public class MentorController {
    private final GroupMentorInvitationService groupMemberInvitationService;
    private final GroupService groupService;
    private final ModelMapper modelMapper;
    private final UserService userService;
    @GetMapping("/getInvitation")
    public ResponseEntity<List<GroupDTO>> getGroupInvitation(){
        try {
            List<GroupMentorInvitation> listInvitation = groupMemberInvitationService.getListInvitationByStatus("PENDING");
            List<Long> groupIds = listInvitation.stream()
                    .map(invitation -> invitation.getGroupId().getId())
                    .collect(Collectors.toList());
            List<Group> listGroupHaveInvitation = groupService.getListGroupsById(groupIds);
            List<GroupDTO> results = new ArrayList<>();
            for (Group item:listGroupHaveInvitation) {
                GroupDTO groupDTO = modelMapper.map(item, GroupDTO.class);
                groupDTO.setStatus("PENDING");
                results.add(groupDTO);
            }
            return ResponseEntity.ok(results);
        }catch (ServiceException e){
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/getListMentorRegisted")
    public ResponseEntity<List<GroupDTO>> getGroupMentorRegisted(){
        try {
            List<GroupMentorInvitation> listInvitation = groupMemberInvitationService.getListInvitationByStatus("APPROVAL");
            List<Long> groupIds = listInvitation.stream()
                    .map(invitation -> invitation.getGroupId().getId())
                    .collect(Collectors.toList());
            List<Group> listGroupHaveInvitation = groupService.getListGroupsById(groupIds);
            List<GroupDTO> results = new ArrayList<>();
            for (Group item:listGroupHaveInvitation) {
                GroupDTO groupDTO = modelMapper.map(item, GroupDTO.class);
                groupDTO.setStatus("APPROVAL");
                results.add(groupDTO);
            }
            return ResponseEntity.ok(results);
        }catch (ServiceException e){
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PutMapping("/put-status-mentor/{id}/status")
    public ResponseEntity<GroupMentorInvitation> putStatusForMentor(@PathVariable Long id, @RequestParam String status) {
        try {
            GroupMentorInvitation editGroupMentorInvitation = groupMemberInvitationService.putStatus(id,status);
            return ResponseEntity.ok(editGroupMentorInvitation);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

//    @PutMapping("/put-status-leader/{id}/status")
//    public ResponseEntity<GroupMentorInvitation> putStatusForLeaderMentor(@PathVariable Long id, @RequestParam String status) {
//        try {
//            GroupMentorInvitation editGroupMentorInvitation = groupMemberInvitationService.putStatus(id,status);
//            return ResponseEntity.ok(editGroupMentorInvitation);
//        } catch (ServiceException e) {
//            throw new ApiException(e.getErrorCode(), e.getParams());
//        }
//    }
}
