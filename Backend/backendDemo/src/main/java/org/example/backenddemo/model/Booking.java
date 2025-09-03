package org.example.backenddemo.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int slot_id;

    @Column(length = 50, nullable = false)
    private String day;

    @Column(length = 200, nullable = false)
    private String date;

    @Column(length = 200, nullable = false)
    private String time;

    @Column(length = 100, nullable = false)
    private String slot_status;

    @Column(length = 100, nullable = false)
    private String payment_status;

    // Correct mapping: Many bookings can belong to one user
    @ManyToOne
    @JoinColumn(name = "cust_id", referencedColumnName = "uid", nullable = false)
    private Users user;

    @Column(length= 150, nullable = false)
    private String session_name;

    public Booking() {}

    public Booking(Users user, String payment_status, String slot_status,
                   String time, String date, String day, int slot_id, String session_name) {
        this.user = user;
        this.payment_status = payment_status;
        this.slot_status = slot_status;
        this.time = time;
        this.date = date;
        this.day = day;
        this.slot_id = slot_id;
        this.session_name = session_name;
    }

    public String getSession_name() {
        return session_name;
    }

    public void setSession_name(String session_name) {
        this.session_name = session_name;
    }

    public int getSlot_id() {
        return slot_id;
    }

    public void setSlot_id(int slot_id) {
        this.slot_id = slot_id;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getSlot_status() {
        return slot_status;
    }

    public void setSlot_status(String slot_status) {
        this.slot_status = slot_status;
    }

    public String getPayment_status() {
        return payment_status;
    }

    public void setPayment_status(String payment_status) {
        this.payment_status = payment_status;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
