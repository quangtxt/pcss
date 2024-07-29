package com.pcms.be.service.impl;

import com.pcms.be.domain.Campus;
import com.pcms.be.domain.user.Supervisor;
import com.pcms.be.domain.user.Role;
import com.pcms.be.domain.user.Student;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.functions.ValidateData;
import com.pcms.be.pojo.DTO.ExcelSupervisorDTO;
import com.pcms.be.pojo.DTO.ExcelStudentDTO;
import com.pcms.be.repository.SupervisorRepository;
import com.pcms.be.repository.RoleRepository;
import com.pcms.be.repository.StudentRepository;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.ExcelService;
import com.pcms.be.service.UserService;
import com.pcms.be.utils.StringUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
@RequiredArgsConstructor
@Slf4j
public class ExcelServiceImpl implements ExcelService {
    public static final List<String> formatExcel_listStudent = new ArrayList<>(List.of("RollNumber", "Email", "MemberCode", "FullName", "Status", "Note"));
    private final UserRepository userRepository;
    private final UserService userService;
    private final ValidateData validateData;
    private final RoleRepository roleRepository;
    private final StudentRepository studentRepository;
    private final SupervisorRepository supervisorRepository;

    @Override
    public List<ExcelStudentDTO> getStudentsFromFile(MultipartFile file) throws IOException, ServiceException {
        User user = null;
        if (!validateData.checkFormatExcel(file, formatExcel_listStudent)) {
            throw new ServiceException(ErrorCode.EXCEL_IS_NOT_IN_THE_CORRECT_FORMAT);
        }
        try {
            user = userService.getCurrentUser();
        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }
        List<ExcelStudentDTO> data = new ArrayList<>();
        if (file.isEmpty()) {
            return data;
        }

        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);
        Campus campus = user.getCampus();
        for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {

            String userName = sheet.getRow(i).getCell(2).getStringCellValue();
            String fullName = sheet.getRow(i).getCell(3).getStringCellValue();
            String email = sheet.getRow(i).getCell(1).getStringCellValue();
            //Doi van Quang tao bang Staff de lay Campus
//userRepository.findByUsernameIgnoreCase(userName).isEmpty() && userRepository.findByEmail(email).isEmpty() && validateData.isValidEmail(email)
            ExcelStudentDTO excelStudentDTO = new ExcelStudentDTO();
            excelStudentDTO.setUsername(userName);
            excelStudentDTO.setFullName(fullName);
            excelStudentDTO.setEmail(email);
            String note = "";
            if (userRepository.findByUsernameIgnoreCase(userName).isPresent()){
                note = note.concat("User name: " + userName + " đã tồn tại trong hệ thống.");
            }
            if (userRepository.findByEmail(email).isPresent()){
                note = note.concat("Email: " + email + " đã tồn tại trong hệ thống.");
            }
            if (!validateData.isValidEmail(email)){
                note = note.concat("Email: "+ email + " không đúng định dạng");
            }
            excelStudentDTO.setNote(note);
            data.add(excelStudentDTO);
        }
        return data;
    }

    @Override
    public List<ExcelSupervisorDTO> getSupervisorsFromFile(MultipartFile file) throws IOException, ServiceException {
        User user = null;
        try {
            user = userService.getCurrentUser();
        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }
        List<ExcelSupervisorDTO> data = new ArrayList<>();
        if (file.isEmpty()) {
            return data;
        }
        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);
        Campus campus = user.getCampus();
        for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++){

            String emailFE = sheet.getRow(i).getCell(8).getStringCellValue();
            String emailFPT = sheet.getRow(i).getCell(7).getStringCellValue();
            String userName =  emailFE.split("@")[0];
            String fullName = sheet.getRow(i).getCell(1).getStringCellValue();
            String phoneNumber = sheet.getRow(i).getCell(9).getStringCellValue();
            String genderTxt = sheet.getRow(i).getCell(2).getStringCellValue();
            //Doi van Quang tao bang Staff de lay Campus

//            userRepository.findByUsernameIgnoreCase(userName).isEmpty() && userRepository.findByEmail(emailFE).isEmpty()
//                    && validateData.isValidEmail(emailFE) && validateData.isValidPhoneNumber(phoneNumber) && validateData.isValidGender(genderTxt)
            ExcelSupervisorDTO excelSupervisorDTO = new ExcelSupervisorDTO();
            excelSupervisorDTO.setEmailFE(emailFE);
            excelSupervisorDTO.setEmailFPT(emailFPT);
            excelSupervisorDTO.setUserName(userName);
            excelSupervisorDTO.setFullName(fullName);
            excelSupervisorDTO.setPhoneNumber(phoneNumber);
            excelSupervisorDTO.setGenderTxt(genderTxt);
            String note = "";
            if (userRepository.findByUsernameIgnoreCase(userName).isPresent()){
                note = note.concat("User name: " + userName + " đã tồn tại trong hệ thống.");
            }
            if (userRepository.findByEmail(emailFE).isPresent()){
                note = note.concat("Email: " + emailFE + " đã tồn tại trong hệ thống.");
            }
            if (!validateData.isValidEmail(emailFE)){
                note = note.concat("Email: "+ emailFE + " không đúng định dạng.");
            }
            if (!validateData.isValidPhoneNumber(phoneNumber)){
                note = note.concat("Số điện thoại: " + phoneNumber + " không đúng định dạng.");
            }
            if (!validateData.isValidGender(genderTxt)){
                note =  note.concat("Gender không đúng định dạng.");
            }
            excelSupervisorDTO.setNote(note);
            data.add(excelSupervisorDTO);
        }

        return data;
    }

    @Override
    public void saveStudents(List<ExcelStudentDTO> data) throws ServiceException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/M/yyyy");
        User user = null;
        try {
            user = userService.getCurrentUser();
        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }
        Campus campus = user.getCampus();
        for (ExcelStudentDTO s : data){
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(Constants.RoleConstants.STUDENT).orElseThrow());
            User newUser = new User();
            newUser.setUsername(s.getUsername());
            newUser.setName(s.getFullName());
            newUser.setEmail(s.getEmail());
            newUser.setStatus(true);
            newUser.setIsAdmin(false);
            newUser.setRoles(roles);
            newUser.setCampus(campus);
            userRepository.save(newUser);

            Student newStudent = new Student();
            newStudent.setUser(newUser);
            studentRepository.save(newStudent);
        }
    }

    @Override
    public void saveSupervisors(List<ExcelSupervisorDTO> data) throws ServiceException {
        User user = null;
        try {
            user = userService.getCurrentUser();
        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }
        Campus campus = user.getCampus();
        for (ExcelSupervisorDTO m : data){
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(Constants.RoleConstants.SUPERVISOR).orElseThrow());
            User newUser = new User();
            newUser.setUsername(m.getUserName());
            newUser.setName(m.getFullName());
            newUser.setEmail(m.getEmailFE());
            newUser.setStatus(true);
            newUser.setIsAdmin(false);
            newUser.setRoles(roles);
            newUser.setCampus(campus);
            userRepository.save(newUser);
            Supervisor supervisor = new Supervisor();
            supervisor.setUser(newUser);
            boolean gender = m.getGenderTxt().trim().equalsIgnoreCase("m");
            String phone =  m.getPhoneNumber();
            supervisor.setGender(gender);
            supervisor.setPhone(phone);
            supervisorRepository.save(supervisor);
        }
    }

    @Override
    public void downloadTemplate(HttpServletResponse response) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Dữ liệu nhân viên");


        CellStyle boldCellStyle = workbook.createCellStyle();
        Font boldFont = workbook.createFont();
        boldFont.setBold(true);
        boldCellStyle.setFont(boldFont);
        boldCellStyle.setAlignment(HorizontalAlignment.CENTER);

        Row headerRow = sheet.createRow(0);
        headerRow.setRowStyle(boldCellStyle);

        Cell cell = headerRow.createCell(0);
        cell.setCellValue("RollNumber");
        cell = headerRow.createCell(1);
        cell.setCellValue("Email");
        cell = headerRow.createCell(2);
        cell.setCellValue("MemberCode");
        cell = headerRow.createCell(3);
        cell.setCellValue("FullName");
        cell = headerRow.createCell(4);
        cell.setCellValue("Status");
        cell = headerRow.createCell(5);
        cell.setCellValue("Note");

        // Set the values of cells row 2
        Row mergedRow = sheet.createRow(1);
        mergedRow.setRowStyle(boldCellStyle);

        // Thiết lập header và body của response
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=sample-data.xlsx");

        // Ghi workbook vào response
        workbook.write(response.getOutputStream());
        workbook.close();
    }

    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    // Xử lý dữ liệu số (number)
                    cell.setCellType(CellType.STRING);
                    return cell.getStringCellValue();
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }

    public static String createUsername(String fullName) {
        fullName = fullName.trim();
        fullName = fullName.toLowerCase();
        fullName = StringUtils.removeDiacriticalMarks(fullName);
        // Tách họ và tên thành các từ riêng biệt
        String[] nameParts = fullName.split("\\s+");
        // Xây dựng username từ chữ cái đầu của các từ trong tên
        String username = nameParts[nameParts.length - 1];
        //Ghép username
        for (int i = 0; i < nameParts.length - 1; i++) {
            if (nameParts[i].length() > 0) {
                username = username.concat(nameParts[i].substring(0, 1));
            }
        }
        return username;
    }
    public boolean checkFormatExcel(MultipartFile file, List<String> formatExcel) throws IOException {
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
