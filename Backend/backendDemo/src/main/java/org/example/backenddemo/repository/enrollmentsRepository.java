package org.example.backenddemo.repository;

import org.example.backenddemo.model.Enrollments;
import org.example.backenddemo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface enrollmentsRepository extends JpaRepository<Enrollments, Integer> {
    @Override
    Optional<Enrollments> findById(Integer enrollId);

    Optional<Enrollments> findByEnrollId(Integer enrollId);

    Optional<Enrollments> findByDateAndTime(String date, String time);
    Optional<Enrollments> findByDateAndTimeAndUser(String date, String time, Users user);



}
