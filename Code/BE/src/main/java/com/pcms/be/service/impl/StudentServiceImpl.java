package com.pcms.be.service.impl;

import com.pcms.be.domain.*;
import com.pcms.be.domain.user.Mentor;
import com.pcms.be.domain.user.Role;
import com.pcms.be.domain.user.Student;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.*;
import com.pcms.be.pojo.DTO.MentorDTO;
import com.pcms.be.pojo.DTO.StudentDTO;
import com.pcms.be.pojo.request.AddMentorRequest;
import com.pcms.be.pojo.request.AddStudentRequest;
import com.pcms.be.repository.*;
import com.pcms.be.service.StudentService;
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
import com.pcms.be.pojo.request.EditStudentProfileRequest;
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
    public static final List<String> formatExcel_listMentor = new ArrayList<>(List.of("Empl_ID", "Name", "Gender", "Branch", "Parent Department", "Child Department", "Job Title", "Email FPT", "Email FE", "Telephone", "Contract type"));

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

    private final ModelMapper modelMapper;
    @Override
    public List<StudentResponse> getAllStudentToInvite() {

//            List<Student> listStudentToInvite= studentRepository.findStudentsNotInMemberOrInactive();
            List<StudentResponse> studentResponseList = new ArrayList<>();
//            for (Student student: listStudentToInvite) {
//                StudentResponse studentResponse = modelMapper.map(student, StudentResponse.class);
//                studentResponseList.add(studentResponse);
//            }
            return studentResponseList;

    }


    @Override
    public StudentProfileResponse getStudentProfile(int Id) throws ServiceException {
        Optional<User> user = userRepository.findById((long) Id);
        if (user.isEmpty()){
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        }else{
            User infoUser = user.orElseThrow();
            if (infoUser.getStudent() == null){
                throw new ServiceException(ErrorCode.AUTHORITY_LEVEL_NOT_FOUND);
            }
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
    public StudentProfileResponse editStudentProfile(EditStudentProfileRequest editStudentProfileRequest) throws ServiceException {
        Optional<User> user = userRepository.findById(editStudentProfileRequest.getUserId());
        if (user.isEmpty()){
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        }else{
            User infoUser = user.orElseThrow();
            if (infoUser.getStudent() == null){
                throw new ServiceException(ErrorCode.AUTHORITY_LEVEL_NOT_FOUND);
            }
            infoUser.setName(editStudentProfileRequest.getFullName());
            infoUser.getStudent().setGender(editStudentProfileRequest.isGender());
            infoUser.getStudent().setPhone(editStudentProfileRequest.getPhone());
            infoUser.getStudent().setFacebook(editStudentProfileRequest.getFacebook());
            infoUser.getStudent().setAlternativeEmail(editStudentProfileRequest.getAlternativeEmail());
            infoUser.setEmail(editStudentProfileRequest.getEmail());
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
    public Page<User> getListStudentNoneGroup(Pageable pageable) {
        //Page<User> listStudent = userRepository.findAllStudentNoneGroup(pageable);
        return null;
    }
    @Override
    public ResponseEntity<String> checkFormatExcel_Student(MultipartFile file) throws ServiceException{
        try {
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            //Kiểm tra xem tên các trường dữ liệu trong Excel đã đúng hay chưa
            if (!checkFormatExcel(file, formatExcel_listStudent)){
                throw new ServiceException(ErrorCode.EXCEL_IS_NOT_IN_THE_CORRECT_FORMAT);
            }
            List<String> listInValidEmail = new ArrayList<>();
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {
                String email = sheet.getRow(i).getCell(1).getStringCellValue();
                if(!isValidEmail(email)){
                    listInValidEmail.add(email);
                }
            }
            if (!listInValidEmail.isEmpty()){
                return ResponseEntity.badRequest().body("Danh sách email không hợp lệ: " + listInValidEmail.toString());
            }

            return ResponseEntity.ok("Excel is corrected format.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<StudentDTO> addStudent(AddStudentRequest addStudentRequest) throws ServiceException{
        try{
            if (studentRepository.findByAlternativeEmail(addStudentRequest.getEmail()).isPresent()){
                throw new ServiceException(ErrorCode.USER_DUPLICATE_EMAIL);
            }else {
                Set<Role> roles = new HashSet<>();
                roles.add(roleRepository.findByName(Constants.RoleConstants.STUDENT).orElseThrow());
                User newUser = new User();
                newUser.setUsername(addStudentRequest.getEmail().split("@")[0]);
                newUser.setName(addStudentRequest.getFullName());
                newUser.setEmail(addStudentRequest.getEmail());
                newUser.setStatus(true);
                newUser.setIsAdmin(false);
                newUser.setRoles(roles);
                userRepository.save(newUser);
                Student newStudent = new Student();
                newStudent.setUser(newUser);
                studentRepository.save(newStudent);
                return ResponseEntity.ok(modelMapper.map(newStudent, StudentDTO.class));
            }
        }catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> addStudentsByExcel(MultipartFile file) {
        try {
            if (!checkFormatExcel(file, formatExcel_listStudent)){
                throw new ServiceException(ErrorCode.EXCEL_IS_NOT_IN_THE_CORRECT_FORMAT);
            }
            //public final List<String> formatExcel = new ArrayList<>(List.of("RollNumber", "Email", "MemberCode", "FullName", "Status", "Note"));
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++){

                String userName =  sheet.getRow(i).getCell(2).getStringCellValue();
                String fullName = sheet.getRow(i).getCell(3).getStringCellValue();
                String email = sheet.getRow(i).getCell(1).getStringCellValue();
                //Doi van Quang tao bang Staff de lay Campus

                if (userRepository.findByUsernameIgnoreCase(userName).isEmpty() && userRepository.findByEmail(email).isEmpty() && isValidEmail(email)){
                    Set<Role> roles = new HashSet<>();
                    roles.add(roleRepository.findByName(Constants.RoleConstants.STUDENT).orElseThrow());
                    User newUser = new User();
                    newUser.setUsername(userName);
                    newUser.setName(fullName);
                    newUser.setEmail(email);
                    newUser.setStatus(true);
                    newUser.setIsAdmin(false);
                    newUser.setRoles(roles);
                    userRepository.save(newUser);
                    Student newStudent = new Student();
                    newStudent.setUser(newUser);
                    studentRepository.save(newStudent);
                }else {
                    if (!isValidEmail(email)){
                        return ResponseEntity.badRequest().body(email + "IS NOT CORRECTED FORMAT.");
                    }
                }
            }
            return ResponseEntity.ok("Import successfully.");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process the uploaded Excel file: " + e.getMessage());
        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> checkFormatExcel_Mentor(MultipartFile file) throws ServiceException {
        try {
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);

            //Kiểm tra xem tên các trường dữ liệu trong Excel đã đúng hay chưa
            if (!checkFormatExcel(file, formatExcel_listMentor)){
                throw new ServiceException(ErrorCode.EXCEL_IS_NOT_IN_THE_CORRECT_FORMAT);
            }
            List<String> listInValidEmail = new ArrayList<>();
            List<String> listInvalidPhone = new ArrayList<>();
            List<String> listInvalidGender = new ArrayList<>();
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {
                String emailFPT = sheet.getRow(i).getCell(7).getStringCellValue();
                String emailFE = sheet.getRow(i).getCell(8).getStringCellValue();
                String phoneNumber = sheet.getRow(i).getCell(9).getStringCellValue();
                String gender = sheet.getRow(i).getCell(2).getStringCellValue();
                if(!isValidEmail(emailFPT)){
                    listInValidEmail.add(emailFPT);
                }
                if(!isValidEmail(emailFE)){
                    listInValidEmail.add(emailFE);
                }
                if (!isValidPhoneNumber(phoneNumber)){
                    listInvalidPhone.add(phoneNumber);
                }
                if (!isValidGender(gender)){
                    listInvalidGender.add(emailFE);
                }
            }
            if (!listInValidEmail.isEmpty()){
                return ResponseEntity.badRequest().body("Danh sách email không hợp lệ: " + listInValidEmail.toString());
            }
            if (!listInvalidPhone.isEmpty()){
                return ResponseEntity.badRequest().body("Danh sách số điện thoại không hợp lệ: " + listInvalidPhone.toString());
            }
            if (!listInvalidGender.isEmpty()){
                return ResponseEntity.badRequest().body("Danh sách Email có dữ liệu giới tính không hợp lệ: " + listInvalidGender.toString());
            }

            return ResponseEntity.ok("Excel is corrected format.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<MentorDTO> addMentor(AddMentorRequest addMentorRequest) throws ServiceException{
        try{
            if (!isValidEmail(addMentorRequest.getFuEmail())){
                throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_EMAIL);
            }
            if (!isValidEmail(addMentorRequest.getFptEmail())){
                throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_EMAIL);
            }
            if (!isValidPhoneNumber(addMentorRequest.getPhone())){
                throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_PHONE);
            }
            if (userRepository.findByEmail(addMentorRequest.getFuEmail()).isPresent()){
                throw new ServiceException(ErrorCode.USER_DUPLICATE_EMAIL);
            } else {
                Set<Role> roles = new HashSet<>();
                roles.add(roleRepository.findByName(Constants.RoleConstants.MENTOR).orElseThrow());
                User newUser = new User();
                newUser.setUsername(addMentorRequest.getFuEmail().split("@")[0]);
                newUser.setName(addMentorRequest.getFullName());
                newUser.setEmail(addMentorRequest.getFuEmail());
                newUser.setStatus(true);
                newUser.setIsAdmin(false);
                newUser.setRoles(roles);
                userRepository.save(newUser);
                Mentor newMentor = new Mentor();
                newMentor.setUser(newUser);
                newMentor.setGender(addMentorRequest.isGender());
                newMentor.setPhone(addMentorRequest.getPhone());
                mentorRepository.save(newMentor);
                return ResponseEntity.ok(modelMapper.map(newMentor, MentorDTO.class));
            }
        }catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> addMentorsByExcel(MultipartFile file) {
        try {
            if (!checkFormatExcel(file, formatExcel_listMentor)){
                throw new ServiceException(ErrorCode.EXCEL_IS_NOT_IN_THE_CORRECT_FORMAT);
            }
            //("Empl_ID", "Name", "Gender", "Branch", "Parent Department", "Child Department", "Job Title", "Email FPT", "Email FE", "Telephone", "Contract type");
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++){

                String emailFE = sheet.getRow(i).getCell(8).getStringCellValue();
                String emailFPT = sheet.getRow(i).getCell(7).getStringCellValue();
                String userName =  emailFE.split("@")[0];
                String fullName = sheet.getRow(i).getCell(1).getStringCellValue();
                String phoneNumber = sheet.getRow(i).getCell(9).getStringCellValue();
                String genderTxt = sheet.getRow(i).getCell(2).getStringCellValue();
                //Doi van Quang tao bang Staff de lay Campus

                if (userRepository.findByUsernameIgnoreCase(userName).isEmpty() && userRepository.findByEmail(emailFE).isEmpty()
                        && isValidEmail(emailFE) && isValidPhoneNumber(phoneNumber) && isValidGender(genderTxt)){
                    Set<Role> roles = new HashSet<>();
                    roles.add(roleRepository.findByName(Constants.RoleConstants.MENTOR).orElseThrow());
                    User newUser = new User();
                    newUser.setUsername(userName);
                    newUser.setName(fullName);
                    newUser.setEmail(emailFE);
                    newUser.setStatus(true);
                    newUser.setIsAdmin(false);
                    newUser.setRoles(roles);
                    userRepository.save(newUser);
                    Mentor mentor = new Mentor();
                    mentor.setUser(newUser);
                    boolean gender = sheet.getRow(i).getCell(2).getStringCellValue().trim().equalsIgnoreCase("m");
                    String phone =  sheet.getRow(i).getCell(9).getStringCellValue();
                    mentor.setGender(gender);
                    mentor.setPhone(phone);
                    mentorRepository.save(mentor);
                }else {
                    if (!isValidEmail(emailFE)){
                        return ResponseEntity.badRequest().body(emailFE + "is not corrected format!");
                    }
                    if (!isValidEmail(emailFPT)){
                        return ResponseEntity.badRequest().body(emailFPT + "is not corrected format!");
                    }
                    if (!isValidPhoneNumber(phoneNumber)){
                        return ResponseEntity.badRequest().body(phoneNumber + "is not corrected format!");
                    }
                    if (!isValidGender(genderTxt)){
                        return ResponseEntity.badRequest().body("gender of email "+ emailFE +"is not corrected format!");
                    }
                }
            }
            return ResponseEntity.ok("Import successfully.");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process the uploaded Excel file: " + e.getMessage());
        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }


    private static boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

        Pattern pat = Pattern.compile(emailRegex);
        if (email == null)
            return false;
        return pat.matcher(email).matches();
    }
    private static boolean isValidPhoneNumber(String phoneNumber){
        if (phoneNumber.length() != 10 && phoneNumber.length() != 11) {
            return false;
        }

        for (int i = 0; i < phoneNumber.length(); i++) {
            if (!Character.isDigit(phoneNumber.charAt(i))) {
                return false;
            }
        }
        return true;
    }
    private static boolean isValidGender(String gender){
        if(gender.trim().equalsIgnoreCase("m") || gender.trim().equalsIgnoreCase("f")){
            return true;
        }
        return false;
    }
    private static boolean checkFormatExcel(MultipartFile file, List<String> formatExcel) throws IOException {
        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);
        for (int i = 0; i < sheet.getRow(0).getLastCellNum(); i++){
            if (!sheet.getRow(0).getCell(i).getStringCellValue().equals(formatExcel.get(i).trim())){
                return false;
            }
        }
        return true;
    }
}
