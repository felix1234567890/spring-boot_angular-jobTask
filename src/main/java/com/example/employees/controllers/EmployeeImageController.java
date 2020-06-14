package com.example.employees.controllers;

import com.example.employees.DTO.UploadFileResponse;
import com.example.employees.models.Employee;
import com.example.employees.models.EmployeeImage;
import com.example.employees.repositories.EmployeeImageRepository;
import com.example.employees.repositories.EmployeeRepository;
import com.example.employees.services.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping(path = "/employeeImage")
public class EmployeeImageController {
    @Autowired
    EmployeeImageRepository employeeImageRepository;
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/uploadFile/{id}")
    public UploadFileResponse uploadFile(@RequestParam("imageFile") MultipartFile file, @PathVariable("id") Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Employee with that ID doesn't exist"));
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/profilePictures/")
                .path(fileName)
                .toUriString();
        EmployeeImage employeeImage = new EmployeeImage(file.getOriginalFilename(), fileDownloadUri, employee);
        employeeImageRepository.save(employeeImage);
        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @GetMapping(value = "/{id}")
    public EmployeeImage findImageById(@PathVariable("id") Long id) {
        EmployeeImage employeeImage = employeeImageRepository.findByUser(id);
        return employeeImage;
    }
}
