package org.example.backenddemo.repository;

import org.example.backenddemo.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface bookingRepository extends JpaRepository<Booking, Integer> {
    Optional<Booking> findByBookingId(int bookingId);
    Optional<Booking> findByUserId(int userId);


}
