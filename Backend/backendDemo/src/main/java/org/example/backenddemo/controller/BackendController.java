package org.example.backenddemo.controller;

import org.example.backenddemo.model.Booking;
import org.example.backenddemo.model.Enrollments;
import org.example.backenddemo.model.Users;
import org.example.backenddemo.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @Autowired
    private org.example.backenddemo.repository.enrollmentsRepository enrollmentsRepository;

    @PostMapping("/registerUser")
    public String registerUser(@RequestBody Users userDto) {
        try {
            Optional<Users> existingUser = usersRepository.findByUsernameOrEmail(
                    userDto.getUsername(), userDto.getEmail());

            if (existingUser.isPresent()) {
                return "User already exists with this username or email!";
            }

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
                    userDetails.put("uid", String.valueOf(user.getUid()));
                    userDetails.put("name", user.getName());
                    userDetails.put("username", user.getUsername());
                    userDetails.put("role", user.getRole());
                    userDetails.put("profile", user.getImage());
                    return userDetails;
                } else {
                    System.out.println("Entered password bytes: " + Arrays.toString(userDto.getPassword().getBytes()));
                    System.out.println("DB password bytes: " + Arrays.toString(user.getPassword().getBytes()));

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

    @PostMapping("/findUser")
    public String findUser(@RequestBody Users userDto) {
        try{
            Optional<Users> userOpt = usersRepository.findByUid(userDto.getUid());
            if(userOpt.isPresent()) {
                Users user = userOpt.get();
                return user.getEmail();
            }else{
                return "User not found!";
            }
        } catch (Exception e) {
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
            Optional<Booking> existingBooking = bookingRepository.findByDateAndTime(
                    bookingDto.getDate(), bookingDto.getTime());

            if (existingBooking.isPresent()) {
                return "This slot is already booked!";
            }

            Users user = usersRepository.findById(bookingDto.getUser().getUid())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            bookingDto.setUser(user);

            bookingRepository.save(bookingDto);
            return "Slot booked successfully!";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/findBooking")
    public ResponseEntity<?> findBooking(@RequestBody Booking bookingDto) {
        try {
            Optional<Booking> bookingOpt = bookingRepository.findByDateAndTime(
                    bookingDto.getDate(),
                    bookingDto.getTime()
            );

            if (bookingOpt.isPresent()) {
                Booking booking = bookingOpt.get();
                // return slot details
                return ResponseEntity.ok(booking);
            } else {
                return ResponseEntity.ok().body("No session booked!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/enroll")
    public String enrollUsers(@RequestBody Enrollments enrollmentDto) {
        try {
            Optional<Enrollments> existingEnrollment = enrollmentsRepository.findByDateAndTimeAndUser(
                    enrollmentDto.getDate(), enrollmentDto.getTime(), enrollmentDto.getUser());


            if (existingEnrollment.isPresent()) {
                return "You have already enrolled!";
            }

            Users user = usersRepository.findById(enrollmentDto.getUser().getUid())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            enrollmentDto.setUser(user);

            Booking booking = bookingRepository.findBySlotId(enrollmentDto.getBooking().getSlot_id())
                    .orElseThrow(() -> new RuntimeException("Slot not found"));

            enrollmentsRepository.save(enrollmentDto);
            return "Slot booked successfully!";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/findEnrollments")
    public ResponseEntity<?> findEnrollments(@RequestBody Enrollments enrollmentDto) {
        try{
            Optional<Enrollments> enrollmentsOpt = enrollmentsRepository.findByDateAndTimeAndUser(
                    enrollmentDto.getDate(), enrollmentDto.getTime(), enrollmentDto.getUser()
            );

            if(enrollmentsOpt.isPresent()){
                Enrollments enrollment = enrollmentsOpt.get();
                return ResponseEntity.ok(enrollment);
            }else {
                return ResponseEntity.ok().body("No session booked!");
            }
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/allEnrollments")
    public ResponseEntity<?> getAllEnrollments() {
        try {
            List<Enrollments> enrollments = enrollmentsRepository.findAll();
            if (enrollments.isEmpty()) {
                return ResponseEntity.ok("No enrollments found.");
            }
            return ResponseEntity.ok(enrollments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/deleteEnrollments")
    public String deleteEnrollments(@RequestBody Enrollments enrollmentDto) {
        try{
            int deletedCount = enrollmentsRepository.deleteEnrollmentByDateAndTime(
                    enrollmentDto.getDate(),
                    enrollmentDto.getTime()
            );

            if (deletedCount > 0) {
                return "Enrollment deleted successfully.";
            } else {
                return "No enrollment found for the given date and time.";
            }

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/updateEnrollments")
    public String updateEnrollments(@RequestBody Enrollments enrollmentDto) {
        try{
            if (enrollmentDto.getDate() == null) {
                return "Date is required to update booking.";
            }

            int updated = enrollmentsRepository.updateEnrollmentByDate(
                    enrollmentDto.getTime(),
                    enrollmentDto.getPayment_status(),
                    enrollmentDto.getDate()
            );

            if (updated > 0) {
                return "Booking updated successfully.";
            } else {
                return "No booking found for the given date.";
            }

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/allBookings")
    public ResponseEntity<?> getAllBookings() {
        try {
            List<Booking> bookings = bookingRepository.findAll();
            if (bookings.isEmpty()) {
                return ResponseEntity.ok("No enrollments found.");
            }
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/deleteBookings")
    public String deleteBookings(@RequestBody Booking bookingDto) {
        try{
            int deletedCount = bookingRepository.deleteBookingByDateAndTime(
                    bookingDto.getDate(),
                    bookingDto.getTime()
            );

            if (deletedCount > 0) {
                return "Booking deleted successfully.";
            } else {
                return "No booking found for the given date and time.";
            }

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/updateBookings")
    public String updateBookings(@RequestBody Booking bookingDto) {
        try {
            if (bookingDto.getDate() == null) {
                return "Date is required to update booking.";
            }

            int updated = bookingRepository.updateBookingByDate(
                    bookingDto.getTime(),
                    bookingDto.getSession_name(),
                    bookingDto.getPayment_status(),
                    bookingDto.getDate()

            );

            if (updated > 0) {
                enrollmentsRepository.updateEnrollmentsBySessionId(
                        bookingDto.getSlot_id(),
                        bookingDto.getDate(),
                        bookingDto.getTime(),
                        bookingDto.getSession_name()
                );
                return "Booking and enrollments updated successfully.";
            } else {
                return "No booking found for the given date.";
            }

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

}
