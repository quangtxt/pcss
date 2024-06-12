package com.pcms.be.functions;

import lombok.Getter;
import lombok.Setter;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.DateTimeException;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.regex.Pattern;

@Component
public class ValidateData {
    public boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

        Pattern pat = Pattern.compile(emailRegex);
        if (email == null)
            return false;
        return pat.matcher(email).matches();
    }
    public boolean isValidPhoneNumber(String phoneNumber){
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
    public boolean isValidGender(String gender){
        if(gender.trim().equalsIgnoreCase("m") || gender.trim().equalsIgnoreCase("f")){
            return true;
        }
        return false;
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
    public boolean isOffsetDateTimeValid(OffsetDateTime offsetDateTime) {
        try {
            OffsetDateTime.parse(offsetDateTime.toString());
            return true;
        } catch (DateTimeParseException e) {
            return false;
        }
    }
}
