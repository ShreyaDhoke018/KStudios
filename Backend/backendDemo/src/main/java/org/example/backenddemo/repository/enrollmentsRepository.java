package org.example.backenddemo.repository;

import org.example.backenddemo.model.Enrollments;
import org.example.backenddemo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


public interface enrollmentsRepository extends JpaRepository<Enrollments, Integer> {
    @Override
    Optional<Enrollments> findById(Integer enrollId);

    Optional<Enrollments> findByEnrollId(Integer enrollId);

    Optional<Enrollments> findByDateAndTime(String date, String time);
    Optional<Enrollments> findByDateAndTimeAndUser(String date, String time, Users user);

    @Query("SELECT e FROM Enrollments e")
    List<Enrollments> getAllEnrollments();

    @Modifying
    @Transactional
    @Query("delete Enrollments e  WHERE e.date = :date AND e.time = :time")
    int deleteEnrollmentByDateAndTime(@Param("date") String date, @Param("time") String time);

    @Modifying
    @Transactional
    @Query("update Enrollments e set e.time = :time, e.payment_status = :payment_status WHERE e.date = :date")
    int updateEnrollmentByDate(@Param("time") String time,  @Param("payment_status") String payment_status, @Param("date") String date);


    @Modifying
    @Transactional
    @Query("UPDATE Enrollments e " +
            "SET e.time = :time, " +
            "    e.session_name = :session_name, " +
            "    e.date = :date " +
            "WHERE e.booking.slot_id = :session_id")
    void updateEnrollmentsBySessionId(@Param("session_id") int sessionId,
                                     @Param("date") String date,
                                     @Param("time") String time,
                                     @Param("session_name") String sessionName);
}
