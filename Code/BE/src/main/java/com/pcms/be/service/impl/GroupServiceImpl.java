 package com.pcms.be.service.impl;

import com.pcms.be.domain.*;
import com.pcms.be.domain.user.*;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.functions.Git;
import com.pcms.be.functions.NotificationTemplate;
import com.pcms.be.pojo.DTO.GitFolder;
import com.pcms.be.pojo.DTO.GroupDTO;
import com.pcms.be.pojo.DTO.GroupSupervisorDTO;
import com.pcms.be.pojo.DTO.MemberDTO;
import com.pcms.be.pojo.request.CreateGroupRequest;
import com.pcms.be.pojo.request.EditGroupRequest;
import com.pcms.be.pojo.request.SubmitGroupRequest;
import com.pcms.be.pojo.response.GroupResponse;
import com.pcms.be.pojo.response.SubmitGroupResponse;
import com.pcms.be.repository.*;
import com.pcms.be.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.OffsetDateTime;
import java.util.*;


@Service
@RequiredArgsConstructor
@Slf4j
public class GroupServiceImpl implements GroupService {


    private final GroupRepository groupRepository;
    private final UserService userService;
    private final MemberRepository memberRepository;
    private final SupervisorRepository supervisorRepository;
    private final StudentRepository studentRepository;
    private final GroupSupervisorRepository groupSupervisorRepository;
    private final ModelMapper modelMapper;
    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final SemesterRepository semesterRepository;
    private final MilestoneRepository milestoneRepository;
    private final MilestoneGroupRepository milestoneGroupRepository;



    @Override
    @Transactional
    public GroupResponse createGroup(CreateGroupRequest createGroupDTO) throws ServiceException {
        try {
            User currentUser = userService.getCurrentUser();
            if (memberRepository.findByStudentIdAndStatus(currentUser.getStudent().getId(), Constants.MemberStatus.INGROUP) != null) {
                throw new ServiceException(ErrorCode.STUDENT_ALREADY_IN_A_GROUP);
            }
            if (createGroupDTO.getListStudentID().stream().count() > 4) {
                throw new ServiceException(ErrorCode.MAXIMUM_SIZE_OF_A_GROUP);
            }
            List<Member> members = memberRepository.findAllByStudentIdAndStatus(Long.valueOf(currentUser.getStudent().getId()), Constants.MemberStatus.PENDING);
            for (Member m : members
            ) {
                m.setStatus(Constants.MemberStatus.OUTGROUP);
                memberRepository.save(m);
            }
            List<Member> memberList = new ArrayList<>();
            Member ownerGroup = new Member();
            ownerGroup.setRole(Constants.MemberRole.OWNER);
            ownerGroup.setStatus(Constants.MemberStatus.INGROUP);
            ownerGroup.setStudent(userService.getCurrentUser().getStudent());
            memberList.add(ownerGroup);    // add owner group

            //add members pending
            for (Integer studentId : createGroupDTO.getListStudentID()) {
                if (studentRepository.findById(Long.valueOf(studentId)) == null) {
                    throw new ServiceException(ErrorCode.STUDENT_NOT_FOUND);
                }
                if ((Long.valueOf(studentId)) == userService.getCurrentUser().getStudent().getId()
                        || memberRepository.findByStudentIdAndStatus(Long.valueOf(studentId), Constants.MemberStatus.INGROUP) != null) {
                    throw new ServiceException(ErrorCode.STUDENT_ALREADY_IN_A_GROUP);
                }
                Member newInviteMember = new Member();
                newInviteMember.setRole(Constants.MemberRole.MEMBER);
                newInviteMember.setStatus(Constants.MemberStatus.PENDING);
                newInviteMember.setStudent(studentRepository.findById(Long.valueOf(studentId)).orElse(null));
                memberList.add(newInviteMember);
            }
            Group group = createGroupInternal(createGroupDTO, memberList);
            GroupResponse groupResponse = modelMapper.map(group, GroupResponse.class);
            return groupResponse;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_CREATE_GROUP);
        }
    }


    @Transactional
    @Override
    public Group createGroupInternal(CreateGroupRequest createGroupDTO, List<Member> memberList) {
        Group group = new Group();
        group.setAbbreviations(createGroupDTO.getAbbreviations());
        group.setDescription(createGroupDTO.getDescription());
        group.setKeywords(createGroupDTO.getKeywords());
        group.setName(createGroupDTO.getName());
        group.setVietnameseTitle(createGroupDTO.getVietnameseTitle());
        group.setStatus(Constants.GroupStatus.PENDING);
        groupRepository.save(group);

        for (Member member : memberList) {
            member.setGroup(group);
        }
        group.setMembers(new HashSet<>(memberList));
        groupRepository.save(group);
        return group;
    }  //tao list members


    private void inviteMember(Group group, Integer studentId) {
        Member newInviteMember = new Member();
        newInviteMember.setRole(Constants.MemberRole.MEMBER);
        newInviteMember.setStatus(Constants.MemberStatus.PENDING);
        newInviteMember.setStudent(studentRepository.findById(Long.valueOf(studentId)).orElse(null));
        newInviteMember.setGroup(group);
        memberRepository.save(newInviteMember);
    }

    @Override
    public GroupResponse editGroup(EditGroupRequest editGroupDTO) throws ServiceException {
        try {
            Optional<Group> group1 = groupRepository.findById(Long.valueOf(editGroupDTO.getGroupId()));
            if (!group1.isPresent()) {
                throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
            }
            Group group = group1.get();
            User user = userService.getCurrentUser();
            Member member = memberRepository.findByStudentIdAndGroupId(user.getStudent().getId(), editGroupDTO.getGroupId());
            if (!member.getRole().equals(Constants.MemberRole.OWNER)) {
                throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
            }
            if (!group.getStatus().equals(Constants.GroupStatus.PENDING)) {
                throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
            }
            if (group != null) {
                group.setAbbreviations(editGroupDTO.getAbbreviations());
                group.setDescription(editGroupDTO.getDescription());
                group.setKeywords(editGroupDTO.getKeywords());
                group.setName(editGroupDTO.getName());
                group.setVietnameseTitle(editGroupDTO.getVietnameseTitle());
                groupRepository.save(group);
                GroupResponse groupResponse = modelMapper.map(group, GroupResponse.class);
                return groupResponse;
            } else {
                throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
            }

        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
    }

    @Override
    public GroupResponse getGroupByMemberId() throws ServiceException {
        try {
            User user = userService.getCurrentUser();
            Member member = memberRepository.findByStudentIdAndStatus(user.getStudent().getId(), Constants.MemberStatus.INGROUP);
            if (member != null) {
                GroupResponse groupResponse = modelMapper.map(member.getGroup(), GroupResponse.class);
                return groupResponse;
            }
            return null;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
        }
    }


    @Override
    public GroupResponse getGroupById(int groupId) throws ServiceException {
        try {
            Optional<Group> group = groupRepository.findById(Long.valueOf(groupId));
            if (group.isPresent()) {
                Group group1 = group.get();
                GroupResponse groupResponse = modelMapper.map(group1, GroupResponse.class);
                return groupResponse;
            }
            return null;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
        }
    }

    @Override
    public List<GroupResponse> getGroupsBySupervisor(int supervisorId, int semesterId) throws ServiceException {
        List<GroupResponse> groupResponses = new ArrayList<>();
        try {
            Optional<Group> group = groupRepository.findById(Long.valueOf(supervisorId));
            if (group.isPresent()) {
                Group group1 = group.get();
                GroupResponse groupResponse = modelMapper.map(group1, GroupResponse.class);
                List<Member> memberInGroup = memberRepository.findAllByGroupIdAndStatus(groupResponse.getId(), Constants.MemberStatus.INGROUP);
                List<MemberDTO> memberDTOList = new ArrayList<>();
                List<GroupSupervisorDTO> groupSupervisorDTOS = new ArrayList<>();
                for (Member member : memberInGroup
                ) {
                    memberDTOList.add(modelMapper.map(member, MemberDTO.class));
                }
                groupResponse.setMembers(memberDTOList);
                groupResponses.add( groupResponse);
            }
            return groupResponses;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
        }
    }

    @Override
    @Transactional
    public SubmitGroupResponse submitGroup(SubmitGroupRequest submitGroupRequest) throws ServiceException {
        try {
            Group group = groupRepository.findById(Long.valueOf(submitGroupRequest.getGroupId())).orElse(null);

            if (group == null) {
                throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
            }
            if (submitGroupRequest.getSupervisorIds().size() > 2) {
                throw new ServiceException(ErrorCode.MAXIMUM_SIZE_SUPERVISOR_OF_A_GROUP);
            }
            List<Member> members = memberRepository.findAllByGroupIdAndStatus(group.getId(), Constants.MemberStatus.PENDING);
            for (Member m : members) {
                m.setStatus(Constants.MemberStatus.OUTGROUP);
                memberRepository.save(m);
            }

            SubmitGroupResponse submitGroupResponse = new SubmitGroupResponse();

            List<Member> memberInGroup = memberRepository.findAllByGroupIdAndStatus(group.getId(), Constants.MemberStatus.INGROUP);
            List<MemberDTO> memberDTOList = new ArrayList<>();
            List<GroupSupervisorDTO> groupSupervisorDTOS = new ArrayList<>();
            for (Member member : memberInGroup
            ) {
                memberDTOList.add(modelMapper.map(member, MemberDTO.class));
            }
            if (submitGroupRequest.getSupervisorIds().size() <= 2) {
                for (Integer supervisorId : submitGroupRequest.getSupervisorIds()) {
                    Optional<Supervisor> m = supervisorRepository.findById(Long.valueOf(supervisorId));
                    if (m.isPresent()) {
                        GroupSupervisor groupSupervisor = new GroupSupervisor();
                        groupSupervisor.setGroup(group);
                        groupSupervisor.setSupervisor(m.get());
                        groupSupervisor.setStatus(Constants.SupervisorStatus.PENDING_SUPERVISOR);
                        groupSupervisorRepository.save(groupSupervisor);
                        groupSupervisorDTOS.add(modelMapper.map(groupSupervisor, GroupSupervisorDTO.class));
                    }
                }
            }
            group.setStatus(Constants.GroupStatus.SUBMITTED);
            groupRepository.save(group);
            submitGroupResponse = modelMapper.map(group, SubmitGroupResponse.class);
            submitGroupResponse.setGroupSupervisors(groupSupervisorDTOS);
            submitGroupResponse.setMembers(memberDTOList);
            return submitGroupResponse;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
    }
    @Transactional
    @Override
    public ResponseEntity<String> automaticallyCreateGroups() throws ServiceException {
        try {
            //Lấy danh sách student chưa có group (danh sách sv1)
            List<Student> listStudentNoneGroup = studentRepository.findStudentsNotInMemberOrInactive();
            if(!listStudentNoneGroup.isEmpty()){
                Collections.shuffle(listStudentNoneGroup);

            }
            //Lấy danh sách nhóm chưa đầy đủ thành viên (danh sách gr1)
            List<Group> listGroupIsNotEnoughMember = groupRepository.findGroupsWithMemberCountLessThan(5);
            clearGroup(listGroupIsNotEnoughMember);

            // Lấy các sinh viên từ sv1 lấp đầy vào gr1.
            setStudentsToGroup(listGroupIsNotEnoughMember, listStudentNoneGroup);
            int size = listStudentNoneGroup.size();

//            // Sau khi thực hiện sẽ xảy ra 3 trường hợp
//            // TH1: danh sách sv1 vẫn còn, danh sách gr1 đã bị lấp đầy thành các group hoàn chỉnh có 5 thành viên
//            // TH2: danh sách sv1 đã hết, danh sách gr1 vẫn còn những nhóm chưa đủ thành viên
//            // TH3: perfect case
            listGroupIsNotEnoughMember = groupRepository.findGroupsWithMemberCountLessThan(5);
//            // TH1
            if (!listStudentNoneGroup.isEmpty()){
                if (listStudentNoneGroup.size() >= 5){ //DONE:  Nếu lượng sinh viên lớn hơn hoặc bằng 5 thì khởi tạo nhiều nhóm
                    createGroups(listStudentNoneGroup);
                }else{ //DONE:  Nếu lượng sinh viên nhỏ hơn 5 thì sếp các sinh viên vào các nhóm random
                    setEachStudentToEachGroup(listStudentNoneGroup);
                }
            }else if (!listGroupIsNotEnoughMember.isEmpty()){ //TH2
               int totalMember = listGroupIsNotEnoughMember.stream()
                       .mapToInt(group -> group.getMembers().size())
                       .sum();
                List<Student> students = new ArrayList<>();
                //Lấy các danh sách sinh viên và xoá nhóm chưa đầy sinh viên
                for (Group gr : listGroupIsNotEnoughMember){
                    for (Member member : gr.getMembers()){
                        students.add(member.getStudent());
                    }
                    groupRepository.delete(gr);
                }
               if (totalMember >= 5){ //
                   createGroups(students);
               }else{// Cho các sinh viên này vào các nhóm random
                   setEachStudentToEachGroup(students);
               }

            }

        }catch (Exception e){
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
        List<Group> groups = groupRepository.findAllNewGroup();
        setMilestoneGroup(groups);
        setSemesterForGroup();
        return ResponseEntity.ok("Automatically grouped successfully");
    }
    @Transactional
    public void createJoinGroupNotification(Group group){
        Map<String, String> map = new HashMap<>();
                String listMember = "";
                String leaderName = "";
                List<User> users = new ArrayList<>();
                for (Member m : group.getMembers()) {
                    listMember += m.getStudent().getUser().getName() + ";";
                    users.add(m.getStudent().getUser());
                    if (m.getRole().equals(Constants.MemberRole.OWNER)) {
                        leaderName = m.getStudent().getUser().getName();
                    }
                }

                map.put("_ListMember-txt", listMember.substring(0, listMember.length() - 1));
                map.put("_GroupName-txt_", group.getName());
                map.put("_Leader-txt_", leaderName);
                String content = notificationService.createContentNotification(NotificationTemplate.UserNotification.joinGroupTemplate, map);
                for (User u : users){
                    notificationService.saveNotification(u, content);
                }
    }

    @Override
    public ResponseEntity<Map<String, Object>> getGroups(Pageable pageable, String keyword) {
        Page<Group> groups = groupRepository.findAllByNameContaining(pageable, keyword);
        List<GroupDTO> groupDTOs = new ArrayList<>();
        Map<String, Object> result = new HashMap<>();
        for (Group group : groups.getContent()){
            groupDTOs.add(modelMapper.map(group, GroupDTO.class));
        }
        result.put("totalCount", groups.getTotalElements());
        result.put("totalPage", groups.getTotalElements());
        result.put("data", groupDTOs);
        return ResponseEntity.ok(result);
    }




    @Transactional
    public void createGroup(List<Student> students){
        Group group = new Group();

        groupRepository.save(group);
        group.setName("FPT_University_Group_Capstone_"+group.getId());
        Set<Member> members = new HashSet<>();
        for (int i = 0; i < students.size() ; i++) {
            Member member = new Member();

            if (i == 0){
                member.setRole(Constants.MemberRole.OWNER);
            }else{
                member.setRole(Constants.MemberRole.MEMBER);
            }
            member.setGroup(group);
            member.setStatus(Constants.MemberStatus.INGROUP);
            member.setStudent(students.get(i));
            memberRepository.save(member);
            members.add(member);
        }
            group.setMembers(members);
            groupRepository.save(group);
        createJoinGroupNotification(group);
    }
    @Transactional
    public void createGroups(List<Student> students){
        List<Student> listStudentToCreateNewGroup = students.subList(0, students.size() - students.size()%5);
        for (int i = 0; i < listStudentToCreateNewGroup.size(); i += 5) {
            createGroup(listStudentToCreateNewGroup.subList(i, i + 5));
        }
        if (students.size() % 5 != 0){
            setEachStudentToEachGroup(students.subList(students.size() - students.size()%5, students.size()));
        }
    }
    @Transactional
    public void setEachStudentToEachGroup(List<Student> students){
        List<Group> allGroup = groupRepository.findAll();
        Collections.shuffle(allGroup);
        for (int i = 0; i < students.size(); i++){
            Group group = allGroup.get(i);
            Member member = new Member();
            member.setRole(Constants.MemberRole.MEMBER);
            member.setGroup(group);
            member.setStatus(Constants.MemberStatus.INGROUP);
            member.setStudent(students.get(i));
            memberRepository.save(member);
            group.getMembers().add(member);
            groupRepository.save(group);
        }
        for (Group group : allGroup){
            createJoinGroupNotification(group);

        }
    }
    @Transactional
    public void setStudentsToGroup(List<Group> groups, List<Student> students){
        List<Student> recordStudents = new ArrayList<>();
        if (!groups.isEmpty() && !students.isEmpty()){
            int indexStudent = 0;
            for (Group gr : groups){
                if (indexStudent == students.size()){
                    break;
                }
                int limit = 5 - gr.getMembers().size();
                for (int i = 0; i < limit; i++) {

                    Member member = new Member();
                    member.setRole(Constants.MemberRole.MEMBER);
                    member.setGroup(gr);
                    member.setStatus(Constants.MemberStatus.INGROUP);
                    member.setStudent(students.get(indexStudent));
                    memberRepository.save(member);
                    recordStudents.add(students.get(indexStudent));
                    indexStudent++;
                    if (indexStudent == students.size() || gr.getMembers().size() == 5 || students.isEmpty()){
                        break;
                    }
                }
            }
            students.removeAll(recordStudents);
        }
        for (Group group : groups){
            createJoinGroupNotification(group);
        }
    }

   @Transactional
    public void clearGroup(List<Group> groups){//test done
        for (Group group : groups) {
            List<Member> memberListToRemove = new ArrayList<>();
            for (Member m : group.getMembers()) {
                if (!m.getStatus().equalsIgnoreCase(Constants.MemberStatus.INGROUP)) {
                    memberListToRemove.add(m);
                }
            }
            if(!memberListToRemove.isEmpty()){
                group.getMembers().removeAll(memberListToRemove);
                groupRepository.save(group);
            }
        }
    }

    @Transactional
    public void setSemesterForGroup() throws ServiceException{
        List<Group> groups = groupRepository.findAllNewGroup();
        if (groups != null && !groups.isEmpty()){
            OffsetDateTime now = OffsetDateTime.now();
            Optional<Semester> semester = semesterRepository.findByCurrent(now);
            if (semester.isEmpty()){
                throw new ServiceException(ErrorCode.SEMESTER_NOT_FOUND_BY_CURRENT);
            }
            for (Group g : groups){
                g.setSemester(semester.get());
                groupRepository.save(g);
            }
        }

    }

    @Transactional
    public void setMilestoneGroup(List<Group> groups){
        List<Milestone> milestones = milestoneRepository.findAllSubmission();
        if (groups != null && !groups.isEmpty() && milestones != null && !milestones.isEmpty()){
            for (Group gr : groups){
                for (Milestone m : milestones){
                    MilestoneGroup milestoneGroup = new MilestoneGroup();
                    milestoneGroup.setMilestone(m);
                    milestoneGroup.setGroup(gr);
                    milestoneGroup.setStatus(false);
                    milestoneGroupRepository.save(milestoneGroup);
                }
            }
        }

    }

    @Transactional
    public void setMentorForEachGroup(){
        List<Supervisor> supervisors = supervisorRepository.findAllByHavingCountTotalGroupLessThanFour();
        List<Group> groups = groupRepository.findAllByHavingCountTotalSupervisorLessThanTwo();
        if (!supervisors.isEmpty() && !groups.isEmpty()){
            List<Supervisor> supervisorsHighPriority = new ArrayList<>();
            List<Supervisor> supervisorsLowPriority = new ArrayList<>();
            int indexSize = 1;
            supervisorsHighPriority = getSupervisorsByGroupSize(supervisors, 0);
            supervisorsLowPriority = getSupervisorsByGroupSize(supervisors, indexSize);
            for (Group group : groups){
                if (indexSize == 5){
                    break;
                }
                Supervisor supervisor = supervisorsHighPriority.get(0);
                group.getSupervisors().add(supervisor);
                groupRepository.save(group);
                supervisorsLowPriority.add(supervisorsHighPriority.get(0));
                supervisorsHighPriority.remove(supervisor);
                if (supervisorsHighPriority.isEmpty()){
                    indexSize ++ ;
                    supervisorsHighPriority = supervisorsLowPriority;
                    supervisorsLowPriority = getSupervisorsByGroupSize(supervisors, indexSize);
                }
            }
        }
    }
    List<Supervisor> getSupervisorsByGroupSize(List<Supervisor> supervisors, int size){
        List<Supervisor> result = new ArrayList<>();
        for (Supervisor supervisor : supervisors){
            if (supervisor.getGroups().size() == size){
                result.add(supervisor);
            }
        }
        return result;
    }

@Override
public ResponseEntity<String> addGit(int groupId, String gitId) throws ServiceException {
        Optional<Group> group = groupRepository.findById(Long.valueOf(groupId));
        if (group.isPresent()){
            String href = Git.GitSrc.repositoryTree.replace("_projectId-txt_", String.valueOf(gitId));
            List<GitFolder> gitFolders = MilestoneServiceImpl.getObjectByCallApiToGit(href);
            if (gitFolders == null){
                return ResponseEntity.badRequest().body("Your Id is incorrect or your impression is not in Public status.");
            }else{
                group.get().setGitId(gitId);
                groupRepository.save(group.get());
                return ResponseEntity.ok("Add Git Id successfully");
            }
        }else{
            return ResponseEntity.badRequest().body("Can not find group by groupId: " + groupId);
        }

}
}
