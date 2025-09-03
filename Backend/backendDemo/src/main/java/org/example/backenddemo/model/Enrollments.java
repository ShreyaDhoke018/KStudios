package org.example.backenddemo.model;


import jakarta.persistence.*;

@Entity
@Table(name = "enrollments")
public class Enrollments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollId")
    private int enrollId;

    @Column(length = 200, nullable = false)
    private String session_name;

    @Column(length = 150, nullable = false)
    private String date;


    @Column(length = 150, nullable = false)
    private String time;

    @Column(length = 100, nullable = false)
    private String payment_status;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "uid", nullable = false)
    private Users user;

    public Enrollments() {
    }

    public Enrollments(Users user, String payment_status, String time, String date, String session_name, int enrollId) {
        this.user = user;
        this.payment_status = payment_status;
        this.time = time;
        this.date = date;
        this.session_name = session_name;
        this.enrollId = enrollId;
    }

    public String getPayment_status() {
        return payment_status;
    }

    public void setPayment_status(String payment_status) {
        this.payment_status = payment_status;
    }

    public int getenrollId() {
        return enrollId;
    }

    public void setenrollId(int enrollId) {
        this.enrollId = enrollId;
    }

    public String getSession_name() {
        return session_name;
    }

    public void setSession_name(String session_name) {
        this.session_name = session_name;
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

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
