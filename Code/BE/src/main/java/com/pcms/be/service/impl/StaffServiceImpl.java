package com.pcms.be.service.impl;

import com.pcms.be.domain.user.User;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.StaffService;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class StaffServiceImpl implements StaffService {
    @Autowired
    private UserRepository userRepository;
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
