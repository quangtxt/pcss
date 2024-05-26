package com.pcms.be.service.impl;

import com.pcms.be.domain.user.Mentor;
import com.pcms.be.domain.user.Role;
import com.pcms.be.domain.user.Student;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.repository.MentorRepository;
import com.pcms.be.repository.RoleRepository;
import com.pcms.be.repository.StudentRepository;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {
    public final List<String> formatExcel_listStudent = new ArrayList<>(List.of("RollNumber", "Email", "MemberCode", "FullName", "Status", "Note"));
    public final List<String> formatExcel_listMentor = new ArrayList<>(List.of("Empl_ID", "Name", "Gender", "Branch", "Parent Department", "Child Department", "Job Title", "Email FPT", "Email FE", "Telephone", "Contract type"));

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private MentorRepository mentorRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public ResponseEntity<String> checkFormatExcel_Student(MultipartFile file) throws ServiceException{
        try {
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);

            //Kiểm tra xem tên các trường dữ liệu trong Excel đã đúng hay chưa
            for (int i = 0; i < sheet.getRow(0).getLastCellNum(); i++){
                if (!sheet.getRow(0).getCell(i).getStringCellValue().equals(formatExcel_listStudent.get(i).trim())){
                    throw new ServiceException(ErrorCode.EXCEL_IS_NOT_IN_THE_CORRECT_FORMAT);
                }
            }
            List<String> listInValidEmail = new ArrayList<>();
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {
                String email = sheet.getRow(i).getCell(1).getStringCellValue();
                if(!isValidEmail(email)){
                    listInValidEmail.add(email);
                }
            }
            if (listInValidEmail.isEmpty()){
                return ResponseEntity.badRequest().body("Danh sách email không hợp lệ: " + listInValidEmail.toString());
            }

            return ResponseEntity.ok("Excel is corrected format.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> addStudentsByExcel(MultipartFile file) {
        try {
            //public final List<String> formatExcel = new ArrayList<>(List.of("RollNumber", "Email", "MemberCode", "FullName", "Status", "Note"));
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++){

                String userName =  sheet.getRow(i).getCell(2).getStringCellValue();
                String fullName = sheet.getRow(i).getCell(3).getStringCellValue();
                String email = sheet.getRow(i).getCell(1).getStringCellValue();
                //Doi van Quang tao bang Staff de lay Campus

                if (userRepository.findByUsernameIgnoreCase(userName).isEmpty() && userRepository.findByEmail(email).isEmpty()){
                    Set<Role> roles = new HashSet<>();
                    roles.add(roleRepository.findByName("STUDENT").orElseThrow());
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
                }
            }
            return ResponseEntity.ok("Import successfully.");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process the uploaded Excel file: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<String> checkFormatExcel_Mentor(MultipartFile file) throws ServiceException {
        try {
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);

            //Kiểm tra xem tên các trường dữ liệu trong Excel đã đúng hay chưa
            for (int i = 0; i < sheet.getRow(0).getLastCellNum(); i++){
                if (!sheet.getRow(0).getCell(i).getStringCellValue().equals(formatExcel_listMentor.get(i).trim())){
                    throw new ServiceException(ErrorCode.EXCEL_IS_NOT_IN_THE_CORRECT_FORMAT);
                }
            }

            return ResponseEntity.ok("Excel is corrected format.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> addMentorsByExcel(MultipartFile file) {
        try {
            //("Empl_ID", "Name", "Gender", "Branch", "Parent Department", "Child Department", "Job Title", "Email FPT", "Email FE", "Telephone", "Contract type");
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++){

                String emailFE = sheet.getRow(i).getCell(8).getStringCellValue();
                String userName =  emailFE.split("@")[0];
                String fullName = sheet.getRow(i).getCell(1).getStringCellValue();
                //Doi van Quang tao bang Staff de lay Campus

                if (userRepository.findByUsernameIgnoreCase(userName).isEmpty() && userRepository.findByEmail(emailFE).isEmpty()){
                    Set<Role> roles = new HashSet<>();
                    roles.add(roleRepository.findByName("MENTOR").orElseThrow());
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
                }
            }
            return ResponseEntity.ok("Import successfully.");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process the uploaded Excel file: " + e.getMessage());
        }
    }


    public static boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

        Pattern pat = Pattern.compile(emailRegex);
        if (email == null)
            return false;
        return pat.matcher(email).matches();
    }

}
