package com.pcms.be.service.impl;

import com.pcms.be.domain.*;
import com.pcms.be.domain.user.Mentor;
import com.pcms.be.domain.user.Role;
import com.pcms.be.domain.user.Student;
import com.pcms.be.functions.Constants;
import com.pcms.be.functions.ValidateData;
import com.pcms.be.pojo.*;
import com.pcms.be.pojo.DTO.MentorDTO;
import com.pcms.be.pojo.DTO.StudentDTO;
import com.pcms.be.pojo.request.*;
import com.pcms.be.repository.*;
import com.pcms.be.service.StudentService;
import com.pcms.be.service.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.StudentProfileResponse;
import com.pcms.be.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.*;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentServiceImpl implements StudentService {
    public static final List<String> formatExcel_listStudent = new ArrayList<>(List.of("RollNumber", "Email", "MemberCode", "FullName", "Status", "Note"));

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SemesterRepository semesterRepository;
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private MentorRepository mentorRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserService userService;

    @PersistenceContext
    private EntityManager entityManager;

    private final ModelMapper modelMapper;
    private final ValidateData validateData;

    @Override
    public List<StudentResponse> getAllStudentToInvite() {

        List<Student> listStudentToInvite = studentRepository.findStudentsNotInMemberOrInactive();
        List<StudentResponse> studentResponseList = new ArrayList<>();
        for (Student student : listStudentToInvite) {
            StudentResponse studentResponse = modelMapper.map(student, StudentResponse.class);
            studentResponseList.add(studentResponse);
        }
        return studentResponseList;

    }


    @Override
    public StudentProfileResponse getStudentProfile(int Id) throws ServiceException {
        Optional<User> user = userRepository.findById((long) Id);
        if (user.isEmpty()) {
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        } else {
            User infoUser = user.orElseThrow();
            if (infoUser.getStudent() == null) {
                throw new ServiceException(ErrorCode.AUTHORITY_LEVEL_NOT_FOUND);
            }
            OffsetDateTime now = OffsetDateTime.now();
            StudentProfileResponse studentProfileResponse = new StudentProfileResponse();
            studentProfileResponse.setFullName(infoUser.getName());
            studentProfileResponse.setGender(infoUser.getStudent().isGender());
            studentProfileResponse.setRollNumber(infoUser.getEmail().split("@")[0]);
            if (infoUser.getStudent().getSpecificMajor() != null) {
                studentProfileResponse.setProfession(infoUser.getStudent().getSpecificMajor().getMajor().getName());
                studentProfileResponse.setSpecialty(infoUser.getStudent().getSpecificMajor().getName());
            }
            studentProfileResponse.setSemester(semesterRepository.findByCurrent(now).orElseThrow(null).getName());
            studentProfileResponse.setEmail(infoUser.getEmail());
            studentProfileResponse.setPhone(infoUser.getStudent().getPhone());
            studentProfileResponse.setAlternativeEmail(infoUser.getStudent().getAlternativeEmail());
            studentProfileResponse.setFacebook(infoUser.getStudent().getFacebook());
            return studentProfileResponse;
        }

    }

    @Override
    public StudentProfileResponse editStudentProfile(EditStudentProfileRequest editStudentProfileRequest) throws ServiceException {
        Optional<User> user = userRepository.findById(userService.getCurrentUser().getId());
        if (user.isEmpty()) {
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        } else {
            User infoUser = user.orElseThrow();
            if (infoUser.getStudent() == null) {
                throw new ServiceException(ErrorCode.AUTHORITY_LEVEL_NOT_FOUND);
            }
            infoUser.setName(editStudentProfileRequest.getFullName());
            infoUser.getStudent().setGender(editStudentProfileRequest.isGender());
            infoUser.getStudent().setPhone(editStudentProfileRequest.getPhone());
            infoUser.getStudent().setFacebook(editStudentProfileRequest.getFacebook());
            infoUser.getStudent().setAlternativeEmail(editStudentProfileRequest.getAlternativeEmail());
            userRepository.save(infoUser);

            OffsetDateTime now = OffsetDateTime.now();
            StudentProfileResponse studentProfileResponse = new StudentProfileResponse();
            studentProfileResponse.setFullName(infoUser.getName());
            studentProfileResponse.setGender(infoUser.getStudent().isGender());
            studentProfileResponse.setRollNumber(infoUser.getEmail().split("@")[0]);
            studentProfileResponse.setProfession(infoUser.getStudent().getSpecificMajor().getMajor().getName());
            studentProfileResponse.setSpecialty(infoUser.getStudent().getSpecificMajor().getName());
            studentProfileResponse.setSemester(semesterRepository.findByCurrent(now).orElseThrow(null).getName());
            studentProfileResponse.setEmail(infoUser.getEmail());
            studentProfileResponse.setPhone(infoUser.getStudent().getPhone());
            studentProfileResponse.setFacebook(infoUser.getStudent().getFacebook());
            return studentProfileResponse;
        }
    }

    @Override
    public ResponseEntity<String> checkFormatExcel_Student(MultipartFile file) throws ServiceException {
        try {
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            //Kiểm tra xem tên các trường dữ liệu trong Excel đã đúng hay chưa
            if (!validateData.checkFormatExcel(file, formatExcel_listStudent)) {
                throw new ServiceException(ErrorCode.EXCEL_IS_NOT_IN_THE_CORRECT_FORMAT);
            }
            List<String> listInValidEmail = new ArrayList<>();
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {
                String email = sheet.getRow(i).getCell(1).getStringCellValue();
                if (!validateData.isValidEmail(email)) {
                    listInValidEmail.add(email);
                }
            }
            if (!listInValidEmail.isEmpty()) {
                return ResponseEntity.badRequest().body("Danh sách email không hợp lệ: " + listInValidEmail.toString());
            }

            return ResponseEntity.ok("Excel is corrected format.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<StudentDTO> addStudent(AddStudentRequest addStudentRequest) throws ServiceException {
        try {
            if (studentRepository.findByEmail(addStudentRequest.getEmail()).isPresent()) {
                throw new ServiceException(ErrorCode.USER_DUPLICATE_EMAIL);
            } else {
                Campus campus = userService.getCurrentUser().getCampus();
                Set<Role> roles = new HashSet<>();
                roles.add(roleRepository.findByName(Constants.RoleConstants.STUDENT).orElseThrow());
                User newUser = new User();
                newUser.setUsername(addStudentRequest.getEmail().split("@")[0]);
                newUser.setName(addStudentRequest.getFullName());
                newUser.setEmail(addStudentRequest.getEmail());
                newUser.setStatus(true);
                newUser.setIsAdmin(false);
                newUser.setRoles(roles);
                newUser.setCampus(campus);
                userRepository.save(newUser);
                Student newStudent = new Student();
                newStudent.setUser(newUser);
                studentRepository.save(newStudent);
                return ResponseEntity.ok(modelMapper.map(newStudent, StudentDTO.class));
            }
        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> addStudentsByExcel(MultipartFile file) {
        try {
            if (!validateData.checkFormatExcel(file, formatExcel_listStudent)) {
                throw new ServiceException(ErrorCode.EXCEL_IS_NOT_IN_THE_CORRECT_FORMAT);
            }
            //public final List<String> formatExcel = new ArrayList<>(List.of("RollNumber", "Email", "MemberCode", "FullName", "Status", "Note"));
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            Campus campus = userService.getCurrentUser().getCampus();
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {

                String userName = sheet.getRow(i).getCell(2).getStringCellValue();
                String fullName = sheet.getRow(i).getCell(3).getStringCellValue();
                String email = sheet.getRow(i).getCell(1).getStringCellValue();
                //Doi van Quang tao bang Staff de lay Campus

                if (userRepository.findByUsernameIgnoreCase(userName).isEmpty() && userRepository.findByEmail(email).isEmpty() && validateData.isValidEmail(email)) {
                    Set<Role> roles = new HashSet<>();
                    roles.add(roleRepository.findByName(Constants.RoleConstants.STUDENT).orElseThrow());
                    User newUser = new User();
                    newUser.setUsername(userName);
                    newUser.setName(fullName);
                    newUser.setEmail(email);
                    newUser.setStatus(true);
                    newUser.setIsAdmin(false);
                    newUser.setRoles(roles);
                    newUser.setCampus(campus);
                    userRepository.save(newUser);
                    Student newStudent = new Student();
                    newStudent.setUser(newUser);
                    studentRepository.save(newStudent);
                } else {
                    if (!validateData.isValidEmail(email)) {
                        return ResponseEntity.badRequest().body(email + "IS NOT CORRECTED FORMAT.");
                    }
                }
            }
            return ResponseEntity.ok("Import successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process the uploaded Excel file: " + e.getMessage());
        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<Map<String, Object>> getListStudent(Pageable pageable, FilterStudentsRequest filterStudentsRequest) {
        String sql = "SELECT s.* FROM v_student s " +
                "INNER JOIN v_user u ON s.user_id = u.id ";
        if (filterStudentsRequest.getFindBy().equals(Constants.FilterStudents.ByName)) {
            sql += "WHERE u.username LIKE CONCAT('%', :keyword, '%') ";
        } else {
            sql += "WHERE u.email LIKE CONCAT('%', :keyword, '%') ";
        }
        TypedQuery<Student> query = (TypedQuery<Student>) entityManager.createNativeQuery(sql, Student.class);
        query.setParameter("keyword", filterStudentsRequest.getKeyword());
        int pageNumber = pageable.getPageNumber();
        int pageSize = pageable.getPageSize();
        query.setFirstResult(pageNumber * pageSize);
        query.setMaxResults(pageSize);
        List<Student> students = query.getResultList();

//        Page<Student> studentPage = studentRepository.findAll(pageable, String keyword);
        long totalCount = getTotalRows(sql, filterStudentsRequest);
        int totalPages = (int) Math.ceil((double) totalCount / pageable.getPageSize());
        Map<String, Object> result = new HashMap<>();
//            List<Student> students = studentPage.getContent();
        List<StudentDTO> studentDTOs = new ArrayList<>();
        for (Student student : students) {
            studentDTOs.add(modelMapper.map(student, StudentDTO.class));
        }
        result.put("totalCount", totalCount);
        result.put("totalPage", totalPages);
        result.put("data", studentDTOs);
        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<StudentDTO> setActiveStudent(SetActiveStudentRequest setActiveStudentRequest) {
        Optional<Student> optionalStudent = studentRepository.findById(Long.valueOf(setActiveStudentRequest.getId()));
        if (optionalStudent.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            Student student = optionalStudent.orElseThrow();
            student.getUser().setStatus(setActiveStudentRequest.isStatus());
            studentRepository.save(student);
            return ResponseEntity.ok(modelMapper.map(student, StudentDTO.class));
        }
    }

    private long getTotalRows(String sql, FilterStudentsRequest filterStudentsRequest) {
        // Tính tổng số hàng trong truy vấn (không giới hạn phân trang)
        String countSql = "SELECT COUNT(*) FROM (" + sql + ") AS countQuery";
        Query query = entityManager.createNativeQuery(countSql);
        query.setParameter("keyword", filterStudentsRequest.getKeyword());
        return ((Number) query.getSingleResult()).longValue();
    }
}

