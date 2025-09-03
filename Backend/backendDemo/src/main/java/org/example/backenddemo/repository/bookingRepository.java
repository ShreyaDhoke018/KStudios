package org.example.backenddemo.repository;

import org.example.backenddemo.model.Booking;
import org.example.backenddemo.model.Enrollments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Book;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface bookingRepository extends JpaRepository<Booking, Integer> {
    Optional<Booking> findById(int id);

    Optional<Booking> findByDate(String date);

    Optional<Booking> findByDateAndTime(String date, String time);

    @Query("SELECT b FROM Booking b")
    List<Booking> getAllBookings();

    @Modifying
    @Transactional
    @Query("delete Booking b  WHERE b.date = :date AND b.time = :time")
    int deleteBookingByDateAndTime(@Param("date") String date, @Param("time") String time);

    @Modifying
    @Transactional
    @Query("update Booking b set b.time = :time, b.session_name = :session_name, b.payment_status = :payment_status WHERE b.date = :date")
    int updateBookingByDate(@Param("time") String time, @Param("session_name") String session_name, @Param("payment_status") String payment_status, @Param("date") String date);


}
