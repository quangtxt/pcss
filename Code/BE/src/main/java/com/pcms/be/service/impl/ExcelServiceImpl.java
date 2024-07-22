package com.pcms.be.service.impl;

import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.ExcelUserDTO;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.ExcelService;
import com.pcms.be.service.UserService;
import com.pcms.be.utils.StringUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
@RequiredArgsConstructor
@Slf4j
public class ExcelServiceImpl implements ExcelService {
    private final UserRepository userRepository;
    private final UserService userService;


    @Override
    public List<ExcelUserDTO> getDataFromFile(MultipartFile file) {
        User user = null;
        try {
            user = userService.getCurrentUser();
        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }
        String patternNum = "^\\d+$";
        List<ExcelUserDTO> data = new ArrayList<>();
        if (file.isEmpty()) {
            return data;
        }
        return null;
    }

    @Override
    public void saveData(List<ExcelUserDTO> data) throws ServiceException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/M/yyyy");
//        for (ExcelUserDTO dto : data) {
//
//            User currentUser = userService.getCurrentUser();
//
//            User user = new User();
//            user.setEmail(dto.getEmail());
//            user.setIsAdmin(false);
//            user.setCompanyCode(currentUser.getCompanyCode());
//            user.setUsername(dto.getUsername());
//            user.setPassword(dto.getUsername());
//            user.setStatus(true);
//
//            UserDetail userDetail = new UserDetail();
//            userDetail.setNameUppercase(dto.getFullName().toUpperCase());
//            userDetail.setNameLowercase(dto.getFullName().toLowerCase());
//            userDetail.setMaNv(dto.getUsername());
//            userDetail.setPositionCode(position.getCode());
//            userDetail.setDepartmentCode(department.getCode());
//            userDetail.setPhone(dto.getPhone());
//            userDetail.setGender(dto.getGender().equals("Nam") ? 1 : 0);
//            userDetail.setBirthday(LocalDate.parse(dto.getBirthday(), formatter));
//
//            user.setUserDetail(userDetail);
//
//            userService.saveUser(user);
//        }
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

}
