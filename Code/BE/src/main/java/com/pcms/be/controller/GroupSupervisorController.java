package com.pcms.be.controller;


import com.pcms.be.domain.user.GroupSupervisor;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.response.GroupSupervisorResponse;
import com.pcms.be.service.GroupSupervisorService;
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
@RequestMapping("/api/v1/group-supervisor")

public class GroupSupervisorController {
    private final GroupSupervisorService groupSupervisorService;
    @GetMapping("/list/invitation")
    public ResponseEntity<List<GroupSupervisorResponse>> getGroupInvitation(){
        try {
           List<GroupSupervisorResponse> groupSupervisorResponse = groupSupervisorService.getByStatus(Constants.SupervisorStatus.PENDING_SUPERVISOR);
           return ResponseEntity.ok(groupSupervisorResponse);
        }catch (ServiceException e){
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/groups/pending")
    public ResponseEntity<List<GroupSupervisorResponse>> getGroupSupervisorRegisted(){
        try {
            List<GroupSupervisorResponse> groupSupervisorResponse = groupSupervisorService.getByStatus(Constants.SupervisorStatus.PENDING_LEADER_TEACHER);
            return ResponseEntity.ok(groupSupervisorResponse);
        }catch (ServiceException e){
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<GroupSupervisor> putStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            GroupSupervisor editGroupSupervisor = groupSupervisorService.putStatus(id,status);
            return ResponseEntity.ok(editGroupSupervisor);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/list/{semesterId}")
    public ResponseEntity<List<GroupSupervisorResponse>> getGroupsOfSupervisor(@PathVariable int semesterId){
        try {
            List<GroupSupervisorResponse> groupSupervisorResponse = groupSupervisorService.getGroupBySemester(semesterId);
            return ResponseEntity.ok(groupSupervisorResponse);
        }catch (ServiceException e){
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
