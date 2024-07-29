package com.pcms.be.controller;

import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.ExcelSupervisorDTO;
import com.pcms.be.pojo.DTO.ExcelStudentDTO;
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

    @PostMapping("/import-excel/students")
    public ResponseEntity<List<ExcelStudentDTO>> importStudentExcel(@RequestParam("file") MultipartFile file) throws ServiceException, IOException {
        List<ExcelStudentDTO> data = excelService.getStudentsFromFile(file);
        return ResponseEntity.ok(data);
    }

    @PostMapping("/import-excel/supervisors")
    public ResponseEntity<List<ExcelSupervisorDTO>> importsupervisorExcel(@RequestParam("file") MultipartFile file) throws ServiceException, IOException {
        List<ExcelSupervisorDTO> data = excelService.getSupervisorsFromFile(file);
        return ResponseEntity.ok(data);
    }

    @PostMapping("/save-data/students")
    public ResponseEntity<Void> saveStudents(@RequestBody List<ExcelStudentDTO> data){
        try {
            excelService.saveStudents(data);
            return ResponseEntity.ok().build();
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/save-data/supervisors")
    public ResponseEntity<Void> savesupervisors(@RequestBody List<ExcelSupervisorDTO> data){
        try {
            excelService.saveSupervisors(data);
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
