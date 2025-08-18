package org.example.backenddemo.controller;

import org.example.backenddemo.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    @Value("${upload.dir:uploads}")
    private String uploadDir;

    @Autowired
    private userRepository usersRepository;

    @PostMapping("/uploadProfileImage")
    @Transactional
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                              @RequestParam("username") String username) {
        try {
            // Ensure folder exists
            Files.createDirectories(Paths.get(uploadDir));

            // Create unique file name
            String fileName = username + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            // Save file locally
            file.transferTo(filePath.toFile());

            // Path to store in DB (relative path)
            String dbPath = "/uploads/" + fileName;

            // Update DB with new image path
            int updated = usersRepository.updateImageByUsername(dbPath, username);

            if (updated > 0) {
                return ResponseEntity.ok(dbPath); // return relative path
            } else {
                return ResponseEntity.status(404).body("User not found for update");
            }

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error uploading file: " + e.getMessage());
        }
    }
}
