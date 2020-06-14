package com.example.employees.services;

import com.example.employees.FileStorageProperties;
import com.example.employees.exceptions.FileStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {
    Path path;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) throws IOException {
        this.path = Paths.get("profilePictures");
        if (!Files.exists(this.path)) {
            Files.createDirectories(this.path);
        }
    }

    public String storeFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(System.currentTimeMillis() + "-" + file.getOriginalFilename());
        try {
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Path targetLocation = this.path.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation);
            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public String loadFileAsResource(String fileName) {
        Path filePath = this.path.resolve(fileName).normalize();
        return filePath.toUri().toString();
    }
}
