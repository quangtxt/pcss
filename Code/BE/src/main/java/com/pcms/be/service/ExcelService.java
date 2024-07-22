package com.pcms.be.service;

import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.ExcelUserDTO;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ExcelService {
    List<ExcelUserDTO> getDataFromFile(MultipartFile file);
    void saveData(List<ExcelUserDTO> data) throws ServiceException;

    void downloadTemplate(HttpServletResponse response) throws IOException;
}
