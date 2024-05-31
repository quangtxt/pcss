package com.pcms.be.service.impl;

import com.pcms.be.domain.Campus;
import com.pcms.be.domain.user.Mentor;
import com.pcms.be.domain.user.Role;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.functions.ValidateData;
import com.pcms.be.pojo.DTO.MentorDTO;
import com.pcms.be.pojo.request.AddMentorRequest;
import com.pcms.be.pojo.request.EditMentorProfileRequest;
import com.pcms.be.pojo.response.MentorProfileResponse;
import com.pcms.be.repository.MentorRepository;
import com.pcms.be.repository.RoleRepository;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.MentorService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@Service
public class MentorServiceImpl implements MentorService {
    public static final List<String> formatExcel_listMentor = new ArrayList<>(List.of("Empl_ID", "Name", "Gender", "Branch", "Parent Department", "Child Department", "Job Title", "Email FPT", "Email FE", "Telephone", "Contract type"));
    private final ModelMapper modelMapper;
    private final ValidateData validateData;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MentorRepository mentorRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserService userService;
    @Override
    public MentorProfileResponse getMentorProfile(int Id) throws ServiceException {
        Optional<User> user = userRepository.findById((long) Id);
        if (user.isEmpty()){
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        }else {
            User infoUser = user.orElseThrow();
            if (infoUser.getMentor() == null) {
                throw new ServiceException(ErrorCode.AUTHORITY_LEVEL_NOT_FOUND);
            }
            MentorProfileResponse mentorProfileResponse = new MentorProfileResponse();
            mentorProfileResponse.setFptEmail(infoUser.getEmail());
            mentorProfileResponse.setPersionalEmail(infoUser.getMentor().getPersonalEmail());
            mentorProfileResponse.setPhone(infoUser.getMentor().getPhone());
            mentorProfileResponse.setFullName(infoUser.getName());
            return mentorProfileResponse;
        }
    }

    @Override
    public MentorProfileResponse editMentorProfile(EditMentorProfileRequest editMentorProfileRequest) throws ServiceException {
        Optional<User> user = userRepository.findById(editMentorProfileRequest.getUserId());
        if (user.isEmpty()){
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        }else{
            User infoUser = user.orElseThrow();
            if (infoUser.getMentor() == null){
                throw new ServiceException(ErrorCode.AUTHORITY_LEVEL_NOT_FOUND);
            }
            infoUser.setName(editMentorProfileRequest.getFullName());
            infoUser.setEmail(editMentorProfileRequest.getFptEmail());
            infoUser.getMentor().setPersonalEmail(editMentorProfileRequest.getPersionalEmail());
            infoUser.getMentor().setPhone(editMentorProfileRequest.getPhone());
            userRepository.save(infoUser);
            MentorProfileResponse mentorProfileResponse = new MentorProfileResponse();
            mentorProfileResponse.setFptEmail(infoUser.getEmail());
            mentorProfileResponse.setPersionalEmail(infoUser.getMentor().getPersonalEmail());
            mentorProfileResponse.setPhone(infoUser.getMentor().getPhone());
            mentorProfileResponse.setFullName(infoUser.getName());

            return mentorProfileResponse;
        }
    }
    @Override
    public ResponseEntity<String> checkFormatExcel_Mentor(MultipartFile file) throws ServiceException {
        try {
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);

            //Kiểm tra xem tên các trường dữ liệu trong Excel đã đúng hay chưa
            if (!validateData.checkFormatExcel(file, formatExcel_listMentor)){
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
                if(!validateData.isValidEmail(emailFPT)){
                    listInValidEmail.add(emailFPT);
                }
                if(!validateData.isValidEmail(emailFE)){
                    listInValidEmail.add(emailFE);
                }
                if (!validateData.isValidPhoneNumber(phoneNumber)){
                    listInvalidPhone.add(phoneNumber);
                }
                if (!validateData.isValidGender(gender)){
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
            if (!validateData.isValidEmail(addMentorRequest.getFuEmail())){
                throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_EMAIL);
            }
            if (!validateData.isValidEmail(addMentorRequest.getFptEmail())){
                throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_EMAIL);
            }
            if (!validateData.isValidPhoneNumber(addMentorRequest.getPhone())){
                throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_PHONE);
            }
            if (userRepository.findByEmail(addMentorRequest.getFuEmail()).isPresent()){
                throw new ServiceException(ErrorCode.USER_DUPLICATE_EMAIL);
            } else {
                Campus campus = userService.getCurrentUser().getCampus();
                Set<Role> roles = new HashSet<>();
                roles.add(roleRepository.findByName(Constants.RoleConstants.MENTOR).orElseThrow());
                User newUser = new User();
                newUser.setUsername(addMentorRequest.getFuEmail().split("@")[0]);
                newUser.setName(addMentorRequest.getFullName());
                newUser.setEmail(addMentorRequest.getFuEmail());
                newUser.setStatus(true);
                newUser.setIsAdmin(false);
                newUser.setRoles(roles);
                newUser.setCampus(campus);
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
            if (!validateData.checkFormatExcel(file, formatExcel_listMentor)){
                throw new ServiceException(ErrorCode.EXCEL_IS_NOT_IN_THE_CORRECT_FORMAT);
            }
            //("Empl_ID", "Name", "Gender", "Branch", "Parent Department", "Child Department", "Job Title", "Email FPT", "Email FE", "Telephone", "Contract type");
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            Campus campus = userService.getCurrentUser().getCampus();
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++){

                String emailFE = sheet.getRow(i).getCell(8).getStringCellValue();
                String emailFPT = sheet.getRow(i).getCell(7).getStringCellValue();
                String userName =  emailFE.split("@")[0];
                String fullName = sheet.getRow(i).getCell(1).getStringCellValue();
                String phoneNumber = sheet.getRow(i).getCell(9).getStringCellValue();
                String genderTxt = sheet.getRow(i).getCell(2).getStringCellValue();
                //Doi van Quang tao bang Staff de lay Campus

                if (userRepository.findByUsernameIgnoreCase(userName).isEmpty() && userRepository.findByEmail(emailFE).isEmpty()
                        && validateData.isValidEmail(emailFE) && validateData.isValidPhoneNumber(phoneNumber) && validateData.isValidGender(genderTxt)){
                    Set<Role> roles = new HashSet<>();
                    roles.add(roleRepository.findByName(Constants.RoleConstants.MENTOR).orElseThrow());
                    User newUser = new User();
                    newUser.setUsername(userName);
                    newUser.setName(fullName);
                    newUser.setEmail(emailFE);
                    newUser.setStatus(true);
                    newUser.setIsAdmin(false);
                    newUser.setRoles(roles);
                    newUser.setCampus(campus);
                    userRepository.save(newUser);
                    Mentor mentor = new Mentor();
                    mentor.setUser(newUser);
                    boolean gender = sheet.getRow(i).getCell(2).getStringCellValue().trim().equalsIgnoreCase("m");
                    String phone =  sheet.getRow(i).getCell(9).getStringCellValue();
                    mentor.setGender(gender);
                    mentor.setPhone(phone);
                    mentorRepository.save(mentor);
                }else {
                    if (!validateData.isValidEmail(emailFE)){
                        return ResponseEntity.badRequest().body(emailFE + "is not corrected format!");
                    }
                    if (!validateData.isValidEmail(emailFPT)){
                        return ResponseEntity.badRequest().body(emailFPT + "is not corrected format!");
                    }
                    if (!validateData.isValidPhoneNumber(phoneNumber)){
                        return ResponseEntity.badRequest().body(phoneNumber + "is not corrected format!");
                    }
                    if (!validateData.isValidGender(genderTxt)){
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
}

