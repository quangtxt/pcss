package com.pcms.be.service.impl;

import com.pcms.be.domain.Campus;
import com.pcms.be.domain.user.Supervisor;
import com.pcms.be.domain.user.Role;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.functions.ValidateData;
import com.pcms.be.pojo.DTO.SupervisorDTO;
import com.pcms.be.pojo.request.AddSupervisorRequest;
import com.pcms.be.pojo.request.EditSupervisorProfileRequest;
import com.pcms.be.pojo.response.SupervisorPageResponse;
import com.pcms.be.pojo.response.SupervisorProfileResponse;
import com.pcms.be.repository.SupervisorRepository;
import com.pcms.be.repository.RoleRepository;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.SupervisorService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SupervisorServiceImpl implements SupervisorService {
    public static final List<String> formatExcel_listSupervisor = new ArrayList<>(List.of("Empl_ID", "Name", "Gender", "Branch", "Parent Department", "Child Department", "Job Title", "Email FPT", "Email FE", "Telephone", "Contract type"));
    private final ModelMapper modelMapper;
    private final ValidateData validateData;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SupervisorRepository supervisorRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserService userService;

    @Override
    public SupervisorPageResponse getSupervisor(String keyword, PageRequest pageRequests) throws ServiceException {
        try {
            Pageable pageable = PageRequest.of(pageRequests.getPageNumber(), pageRequests.getPageSize());
            Page<Supervisor> supervisorPage = supervisorRepository.findSupervisorsByEmailOrName(keyword, pageable);
            SupervisorPageResponse response = new SupervisorPageResponse();
            response.setTotalPage(supervisorPage.getTotalPages());
            response.setTotalCount(supervisorPage.getTotalElements());
            List<SupervisorDTO> supervisorDTOS = supervisorPage.stream()
                    .map(supervisor -> modelMapper.map(supervisor, SupervisorDTO.class))
                    .collect(Collectors.toList());
            response.setData(supervisorDTOS);
            return response;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        }
    }
    @Override
    public SupervisorProfileResponse getSupervisorProfile(int Id) throws ServiceException {
        Optional<User> user = userRepository.findById((long) Id);
        if (user.isEmpty()){
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        }else {
            User infoUser = user.orElseThrow();
            if (infoUser.getSupervisor() == null) {
                throw new ServiceException(ErrorCode.AUTHORITY_LEVEL_NOT_FOUND);
            }
            SupervisorProfileResponse supervisorProfileResponse = new SupervisorProfileResponse();
            supervisorProfileResponse.setFptEmail(infoUser.getEmail());
            supervisorProfileResponse.setPersionalEmail(infoUser.getSupervisor().getPersonalEmail());
            supervisorProfileResponse.setPhone(infoUser.getSupervisor().getPhone());
            supervisorProfileResponse.setFullName(infoUser.getName());
            return supervisorProfileResponse;
        }
    }

    @Override
    public SupervisorProfileResponse editSupervisorProfile(EditSupervisorProfileRequest editSupervisorProfileRequest) throws ServiceException {
        Optional<User> user = userRepository.findById(editSupervisorProfileRequest.getUserId());
        if (user.isEmpty()){
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        }else{
            User infoUser = user.orElseThrow();
            if (infoUser.getSupervisor() == null){
                throw new ServiceException(ErrorCode.AUTHORITY_LEVEL_NOT_FOUND);
            }
            infoUser.setName(editSupervisorProfileRequest.getFullName());
            infoUser.setEmail(editSupervisorProfileRequest.getFptEmail());
            infoUser.getSupervisor().setPersonalEmail(editSupervisorProfileRequest.getPersionalEmail());
            infoUser.getSupervisor().setPhone(editSupervisorProfileRequest.getPhone());
            userRepository.save(infoUser);
            SupervisorProfileResponse supervisorProfileResponse = new SupervisorProfileResponse();
            supervisorProfileResponse.setFptEmail(infoUser.getEmail());
            supervisorProfileResponse.setPersionalEmail(infoUser.getSupervisor().getPersonalEmail());
            supervisorProfileResponse.setPhone(infoUser.getSupervisor().getPhone());
            supervisorProfileResponse.setFullName(infoUser.getName());

            return supervisorProfileResponse;
        }
    }
    @Override
    public ResponseEntity<String> checkFormatExcel_Supervisor(MultipartFile file) throws ServiceException {
        try {
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);

            //Kiểm tra xem tên các trường dữ liệu trong Excel đã đúng hay chưa
            if (!validateData.checkFormatExcel(file, formatExcel_listSupervisor)){
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
    public ResponseEntity<SupervisorDTO> addSupervisor(AddSupervisorRequest addSupervisorRequest) throws ServiceException{
        try{
            if (!validateData.isValidEmail(addSupervisorRequest.getFuEmail())){
                throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_EMAIL);
            }
            if (!validateData.isValidEmail(addSupervisorRequest.getFptEmail())){
                throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_EMAIL);
            }
            if (!validateData.isValidPhoneNumber(addSupervisorRequest.getPhone())){
                throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_PHONE);
            }
            if (userRepository.findByEmail(addSupervisorRequest.getFuEmail()).isPresent()){
                throw new ServiceException(ErrorCode.USER_DUPLICATE_EMAIL);
            } else {
                Campus campus = userService.getCurrentUser().getCampus();
                Set<Role> roles = new HashSet<>();
                roles.add(roleRepository.findByName(Constants.RoleConstants.SUPERVISOR).orElseThrow());
                User newUser = new User();
                newUser.setUsername(addSupervisorRequest.getFuEmail().split("@")[0]);
                newUser.setName(addSupervisorRequest.getFullName());
                newUser.setEmail(addSupervisorRequest.getFuEmail());
                newUser.setStatus(true);
                newUser.setIsAdmin(false);
                newUser.setRoles(roles);
                newUser.setCampus(campus);
                userRepository.save(newUser);
                Supervisor newSupervisor = new Supervisor();
                newSupervisor.setUser(newUser);
                newSupervisor.setGender(addSupervisorRequest.isGender());
                newSupervisor.setPhone(addSupervisorRequest.getPhone());
                supervisorRepository.save(newSupervisor);
                return ResponseEntity.ok(modelMapper.map(newSupervisor, SupervisorDTO.class));
            }
        }catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> addSupervisorsByExcel(MultipartFile file) {
        try {
            if (!validateData.checkFormatExcel(file, formatExcel_listSupervisor)){
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
                    roles.add(roleRepository.findByName(Constants.RoleConstants.SUPERVISOR).orElseThrow());
                    User newUser = new User();
                    newUser.setUsername(userName);
                    newUser.setName(fullName);
                    newUser.setEmail(emailFE);
                    newUser.setStatus(true);
                    newUser.setIsAdmin(false);
                    newUser.setRoles(roles);
                    newUser.setCampus(campus);
                    userRepository.save(newUser);
                    Supervisor supervisor = new Supervisor();
                    supervisor.setUser(newUser);
                    boolean gender = sheet.getRow(i).getCell(2).getStringCellValue().trim().equalsIgnoreCase("m");
                    String phone =  sheet.getRow(i).getCell(9).getStringCellValue();
                    supervisor.setGender(gender);
                    supervisor.setPhone(phone);
                    supervisorRepository.save(supervisor);
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

