package com.pcms.be.service;

import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.ExcelMentorDTO;
import com.pcms.be.pojo.DTO.ExcelStudentDTO;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ExcelService {
    List<ExcelStudentDTO> getStudentsFromFile(MultipartFile file) throws IOException, ServiceException;
    List<ExcelMentorDTO> getMentorsFromFile(MultipartFile file) throws IOException, ServiceException;
    void saveStudents(List<ExcelStudentDTO> data) throws ServiceException;
    void saveMentors(List<ExcelMentorDTO> data) throws ServiceException;

    void downloadTemplate(HttpServletResponse response) throws IOException;
}
