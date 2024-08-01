package com.pcms.be.service;

import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.ExcelGroupDTO;
import com.pcms.be.pojo.DTO.ExcelSupervisorDTO;
import com.pcms.be.pojo.DTO.ExcelStudentDTO;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ExcelService {
    List<ExcelStudentDTO> getStudentsFromFile(MultipartFile file) throws IOException, ServiceException;
    List<ExcelSupervisorDTO> getSupervisorsFromFile(MultipartFile file) throws IOException, ServiceException;
    List<ExcelGroupDTO> getGroupFromFile(MultipartFile file) throws IOException, ServiceException;
    void saveStudents(List<ExcelStudentDTO> data) throws ServiceException;
    void saveSupervisors(List<ExcelSupervisorDTO> data) throws ServiceException;
    void saveGroups(List<ExcelGroupDTO> data) throws ServiceException;

    void downloadTemplateStudent(HttpServletResponse response) throws IOException;
    void downloadTemplateSupervisor(HttpServletResponse response) throws IOException;
    void downloadTemplateGroup(HttpServletResponse response) throws IOException;
}
