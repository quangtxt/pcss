package com.pcms.be.controller;


import com.pcms.be.domain.user.GroupMentorInvitation;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.service.GroupMentorInvitationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/group-member-invitation")

public class GroupMentorInvitationController {
    private final GroupMentorInvitationService groupMemberInvitationService;
    @GetMapping("/getInvitation")
    public ResponseEntity<List<GroupMentorInvitation>> getGroupInvitation(){
        try {
            List<GroupMentorInvitation> listInvitaion = groupMemberInvitationService.getListInvitation();
            return ResponseEntity.ok(listInvitaion);
        }catch (ServiceException e){
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
