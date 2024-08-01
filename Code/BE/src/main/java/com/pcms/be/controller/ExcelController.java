package com.pcms.be.controller;

import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.ExcelGroupDTO;
import com.pcms.be.pojo.DTO.ExcelSupervisorDTO;
import com.pcms.be.pojo.DTO.ExcelStudentDTO;
import com.pcms.be.pojo.response.SupervisorPageResponse;
import com.pcms.be.service.ExcelService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
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
        try {
            List<ExcelStudentDTO> data = excelService.getStudentsFromFile(file);
            return ResponseEntity.ok(data);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/import-excel/supervisors")
    public ResponseEntity<List<ExcelSupervisorDTO>> importSupervisorExcel(@RequestParam("file") MultipartFile file) throws ServiceException, IOException {
        try {
            List<ExcelSupervisorDTO> data = excelService.getSupervisorsFromFile(file);
            return ResponseEntity.ok(data);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/import-excel/groups")
    public ResponseEntity<List<ExcelGroupDTO>> importGroupExcel(@RequestParam("file") MultipartFile file) throws ServiceException, IOException {
        try {
            List<ExcelGroupDTO> data = excelService.getGroupFromFile(file);
            return ResponseEntity.ok(data);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }


    @PostMapping("/save-data/students")
    public ResponseEntity<Void> saveStudents(@RequestBody List<ExcelStudentDTO> data) {
        try {
            excelService.saveStudents(data);
            return ResponseEntity.ok().build();
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/save-data/supervisors")
    public ResponseEntity<Void> saveSupervisors(@RequestBody List<ExcelSupervisorDTO> data) {
        try {
            excelService.saveSupervisors(data);
            return ResponseEntity.ok().build();
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/save-data/groups")
    public ResponseEntity<Void> saveGroups(@RequestBody List<ExcelGroupDTO> data) {
        try {
            excelService.saveGroups(data);
            return ResponseEntity.ok().build();
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/template/student")
    public void downloadTemplateStudent(HttpServletResponse response) throws IOException {
        excelService.downloadTemplateStudent(response);
    }
    @GetMapping("/template/supervisor")
    public void downloadTemplateSupervisor(HttpServletResponse response) throws IOException {
        excelService.downloadTemplateSupervisor(response);
    }
    @GetMapping("/template/group")
    public void downloadTemplateGroup(HttpServletResponse response) throws IOException {
        excelService.downloadTemplateGroup(response);
    }

}
