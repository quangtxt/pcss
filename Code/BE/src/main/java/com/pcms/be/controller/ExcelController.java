package com.pcms.be.controller;

import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.ExcelUserDTO;
import com.pcms.be.service.ExcelService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ExcelController {
    private final ExcelService excelService;

    @PostMapping("/import-excel")
    public ResponseEntity<List<ExcelUserDTO>> importExcel(@RequestParam("file") MultipartFile file) {
        List<ExcelUserDTO> data = excelService.getDataFromFile(file);
        return ResponseEntity.ok(data);
    }

    @PostMapping("/save-data")
    public ResponseEntity<Void> saveData(@RequestBody List<ExcelUserDTO> data){
        try {
            excelService.saveData(data);
            return ResponseEntity.ok().build();
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/template-account")
    public void downloadTemplate(HttpServletResponse response) throws IOException {
        excelService.downloadTemplate(response);
    }

}
