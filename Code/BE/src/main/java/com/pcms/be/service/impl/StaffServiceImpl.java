package com.pcms.be.service.impl;

import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
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

@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {
    public final List<String> formatExcel = new ArrayList<>(List.of("RollNumber", "Email", "MemberCode", "FullName", "Status", "Note"));
    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<List<Integer>> checkFormatExcel(MultipartFile file) throws ServiceException{
        try {
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);

            //Kiểm tra xem tên các trường dữ liệu trong Excel đã đúng hay chưa
            for (int i = 0; i < sheet.getRow(0).getLastCellNum(); i++){
                if (!sheet.getRow(0).getCell(i).getStringCellValue().equals(formatExcel.get(i).trim())){
                    throw new ServiceException(ErrorCode.EXCEL_IS_NOT_IN_THE_CORRECT_FORMAT);
                }
            }
            //Lấy thứ tự các index các trường dữ liệu
            List<Integer> listIndex = new ArrayList<>();
            for (int i = 0; i < formatExcel.size(); i++){
                for (int j = 0; j < sheet.getRow(0).getLastCellNum(); j++){
                    if(formatExcel.get(i).trim().equals(sheet.getRow(0).getCell(i).getStringCellValue())){
                        listIndex.add(i);
                        break;
                    }
                }
            }

            return ResponseEntity.ok(listIndex);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> addUserByExcel(MultipartFile file) {
        try {
            List<User> users = new ArrayList<>();
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++){
                String username = sheet.getRow(i).getCell(0).getStringCellValue();
                Optional<User> user = userRepository.findByUsernameIgnoreCase(username);
                if (user.isEmpty()){
                    String password = sheet.getRow(i).getCell(1).getStringCellValue();
                    User newUser = new User();
                    newUser.setUsername(username);
                    newUser.setPassword(password);
                    users.add(newUser);
                }
            }
            if (!userDuplicateChecker(users).isEmpty()){
                return ResponseEntity.status(409).body("Danh sách các Username bị chùng: " + userDuplicateChecker(users).toString());
            }else {
                userRepository.saveAll(users);
                return ResponseEntity.ok("Import successfully.");
            }
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process the uploaded Excel file: " + e.getMessage());
        }
    }

    public List<String> userDuplicateChecker(List<User> users){
        List<String> listUsernameDuplicate = new ArrayList<>();
        Set<String> listUsername = new HashSet<>();
        for (User user : users){
            if (!listUsername.add(user.getUsername())){
                listUsernameDuplicate.add(user.getUsername());
            }
        }
        return listUsernameDuplicate;
    }
}
