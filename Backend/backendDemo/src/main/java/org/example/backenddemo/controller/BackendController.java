package org.example.backenddemo.controller;

import org.example.backenddemo.model.Booking;
import org.example.backenddemo.model.Users;
import org.example.backenddemo.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class BackendController {
    @Autowired
    private userRepository usersRepository;
    Map<String, String> userDetails = new HashMap<>();
    @Autowired
    private org.example.backenddemo.repository.bookingRepository bookingRepository;

    @PostMapping("/registerUser")
    public String registerUser(@RequestBody Users userDto) {
        try {
            if (userDto.getRole() == null || userDto.getRole().isEmpty()) {
                userDto.setRole("USER");
            }
            usersRepository.save(userDto);
            return "User registered successfully!";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/loginUser")
    public Map<String, String> loginUser(@RequestBody Users userDto) {
        try {
            Optional<Users> userOpt = usersRepository.findByUsernameOrEmail(
                    userDto.getUsername()   // First param (username)
                    , userDto.getUsername() // Second param (email)
            );

            if (userOpt.isPresent()) {
                Users user = userOpt.get();
                System.out.println("Entered password: " + userDto.getPassword());
                System.out.println("DB password: " + user.getPassword());
                System.out.println("DB username: " + user.getUsername() + String.valueOf(user.getUid()));
                if (user.getPassword().equals(userDto.getPassword())) {
                    userDetails.put("id", user.getUsername() + String.valueOf(user.getUid()));
                    userDetails.put("name", user.getName());
                    userDetails.put("username", user.getUsername());
                    userDetails.put("role", user.getRole());
                    userDetails.put("profile", user.getImage());
                    return userDetails;
                } else {
                    userDetails.put("error", "Wrong password!");
                    return userDetails;
                }
            } else {
                userDetails.put("error", "User not found!");
                return userDetails;
//                return "User not found";
            }
        } catch (Exception e) {
            userDetails.put("error", e.getMessage());
            return userDetails;
//            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/profile_image")
    public String profileImage(@RequestBody Users userDto) {
        try{
            Optional<Users> userOpt = usersRepository.findByUsername(userDto.getUsername());
            if (userOpt.isPresent()) {
                Users user = userOpt.get();
                return user.getImage();
            }
            else {
                return "User not found!";
            }
        }catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/profile")
    @Transactional
    public String profile(@RequestBody Users userDto) {
        try {
            String cleanUsername = userDto.getUsername().replaceAll("^\"|\"$", "").trim();
            Optional<Users> userOpt = usersRepository.findByUsername(cleanUsername);

            if (userOpt.isEmpty()) {
                return "User not found!";
            }

            StringBuilder resultMessage = new StringBuilder();

            if (userDto.getPassword() != null && !userDto.getPassword().isBlank()) {
                int updated = usersRepository.updatePasswordByUsername(
                        userDto.getPassword(),
                        cleanUsername
                );
                resultMessage.append(updated > 0 ? "Password updated successfully. " : "Password update failed. ");
            }

            if (userDto.getEmail() != null && !userDto.getEmail().isBlank()) {
                int updated = usersRepository.updateEmailByUsername(
                        userDto.getEmail(),
                        cleanUsername
                );
                resultMessage.append(updated > 0 ? "Email updated successfully. " : "Email update failed. ");
            }

            if (userDto.getPhone() != null && !userDto.getPhone().isBlank()) {
                int updated = usersRepository.updatePhoneByUsername(
                        userDto.getPhone(),
                        cleanUsername
                );
                resultMessage.append(updated > 0 ? "Phone updated successfully. " : "Phone update failed. ");
            }

            if (userDto.getNewUsername() != null && !userDto.getNewUsername().isBlank()) {
                int updated = usersRepository.updateUsernameByUsername(
                        userDto.getNewUsername(),
                        cleanUsername
                );
                resultMessage.append(updated > 0 ? "Username updated successfully. " : "Username update failed. ");
            }

            return resultMessage.length() > 0 ? resultMessage.toString().trim() : "No changes provided.";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/booking")
    public String booking(@RequestBody Booking bookingDto) {
        try {
            bookingRepository.save(bookingDto);
            return "Slot booked successfully!";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }


}
