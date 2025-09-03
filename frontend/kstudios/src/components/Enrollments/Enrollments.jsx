import React, { useState, useEffect } from "react";
import "./Enrollments.css";
import axios from "axios";
import { CSVLink } from "react-csv";
import Navbar2 from "../Navbar2/Navbar2";

const Enrollments = () => {

    const [selectedValue, setSelectedValue] = useState("Default");
    
      const [enrollments, setEnrollments] = useState([]);
    
      const [updatedTime, setUpdatedTime] = useState("");
      const [updatedSessionName, setUpdatedSessionName] = useState("");
      const [updatedPaymentStatus, setUpdatedPaymentStatus] = useState("");
      const [updatedDate, setUpdatedDate] = useState("");
    
      const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
    
      const headers = [
        { label: "Date", key: "date" },
        { label: "Day", key: "day" },
        { label: "Time", key: "time" },
        { label: "Session Name", key: "session_name" },
        { label: "User Email", key: "user_email" },
        { label: "Payment Status", key: "payment_status" },
      ];
    
      useEffect(() => {
        return () => {
          const fetchAllEnrollment = async () => {
            try {
              const response = await axios.post(
                "http://localhost:8080/api/allEnrollments"
              );
    
              if (Array.isArray(response.data)) {
                setEnrollments(response.data);
              } else {
                setEnrollments([]); // empty state
              }
            } catch (error) {
              console.error("Error fetching enrollment:", error);
            }
          };
    
          fetchAllEnrollment();
        };
      }, []);
    
      const cancelEnrollment = async (date, time) => {
        try {
          console.log("Date", date);
          console.log("Time", time);
          const response = await axios.post(
            "http://localhost:8080/api/deleteEnrollments",
            {
              date: date,
              time: time,
            }
          );
          if (response.data) {
            alert(response.data);
            setBookedDate("");
            setBookedTime("");
            window.location.reload();
          }
        } catch (error) {
          console.error("Error fetching enrollment:", error);
        }
      };
    
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
    
        const day = date.getDate();
        const month = months[date.getMonth()]; // always 3 letters
        const year = date.getFullYear();
    
        return `${day} ${month} ${year}`;
      };
    
      const handleUpdate = async (e) => {
        try {
          e.preventDefault();
          console.log("Date",updatedDate);
          console.log("Format Date", formatDate(updatedDate));
          console.log("Payment Status",updatedPaymentStatus);
          console.log("Time",updatedTime);
          console.log("Session Name:",updatedSessionName)
          const response = await axios.post(
            "http://localhost:8080/api/updateEnrollments",
            {
              date: formatDate(updatedDate),
              time: updatedTime,
              session_name: updatedSessionName,
              payment_status: updatedPaymentStatus,
            }
          );
    
          if(response.data){
            alert(response.data)
          }
          window.location.reload();
        } catch (error) {
          console.error("Error fetching enrollment:", error);
        }
      };
    

  return (
    <>
      <header>
        <Navbar2 />
      </header>
      <div className="enrollments_body">
        <div className="enrollments_box">
          <div className="enrollments_head">
            <h1>Enrollments this week:</h1>
          </div>
          <div className="enrollments_table">
            <select value={selectedValue} onChange={handleChange}>
              <option value="Previous_Date">Past Records</option>
              <option value="Default">Default</option>
            </select>

            {/* Scrollable table */}
            <div className="table_container">
              <table className="enrollments_details">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Session Name</th>
                    <th>User Email</th>
                    <th>Payment Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.length > 0 ? (
                    enrollments
                      .filter((b) => {
                        const enrollmentDate = new Date(b.date);
                        const today = new Date();

                        today.setHours(0, 0, 0, 0);

                        if (selectedValue === "Previous_Date") {
                          return enrollmentDate < today;
                        } else {
                          return enrollmentDate >= today;
                        }
                      })
                      .map((b, index) => (
                        <tr key={index}>
                          <td>{b.date}</td>
                          <td>{b.time}</td>
                          <td>{b.session_name}</td>
                          <td>{b.user?.email}</td>
                          <td>{b.payment_status}</td>
                          <button
                            onClick={() => cancelEnrollment(b.date, b.time)}
                            className="btn btn-danger"
                            disabled={
                              new Date(b.date) < new Date().setHours(0, 0, 0, 0)
                            }
                          >
                            Cancel Enrollment
                          </button>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="6">No enrollments found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="enrollments_download">
            <p>Download all data:</p>
            <CSVLink
              data={enrollments.map((b) => ({
                date: b.date,
                time: b.time,
                session_name: b.session_name,
                user_email: b.user?.email,
                payment_status: b.payment_status,
              }))}
              headers={headers}
              filename="enrollments_data.csv"
              className="btn btn-primary"
            >
              Download CSV
            </CSVLink>
          </div>
          <div className="enrollments_head">
            <h1>Update Enrollments:</h1>
          </div>
          <div className="enrollments_update">
            <form className="enrollments_form" onSubmit={handleUpdate}>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={updatedDate}
                onChange={(e) => setUpdatedDate(e.target.value)}
              ></input>
              <label>Time:</label>
              <select
                value={updatedTime}
                onChange={(e) => setUpdatedTime(e.target.value)}
              >
                <option value="default">Select Time</option>
                <option value="8:00 am - 9:00 am">8:00 am - 9:00 am</option>
                <option value="9:00 am - 10:00 am">9:00 am - 10:00 am</option>
                <option value="10:00 am - 11:00 am">10:00 am - 11:00 am</option>
                <option value="11:00 am - 12:00 pm">11:00 am - 12:00 pm</option>
                <option value="12:00 pm - 1:00 pm">12:00 pm - 1:00 pm</option>
                <option value="1:00 pm - 2:00 pm">1:00 pm - 2:00 pm</option>
                <option value="2:00 pm - 3:00 pm">2:00 pm - 3:00 pm</option>
                <option value="3:00 pm - 4:00 pm">3:00 pm - 4:00 pm</option>
                <option value="4:00 pm - 5:00 pm">4:00 pm - 5:00 pm</option>
                <option value="5:00 pm - 6:00 pm">5:00 pm - 6:00 pm</option>
                <option value="6:00 pm - 7:00 pm">6:00 pm - 7:00 pm</option>
                <option value="7:00 pm - 8:00 pm">7:00 pm - 8:00 pm</option>
                <option value="8:00 pm - 9:00 pm">8:00 pm - 9:00 pm</option>
              </select>
              <label>Session Name:</label>
              <input
                type="text"
                name="session_name"
                value={updatedSessionName}
                onChange={(e) => setUpdatedSessionName(e.target.value)}
              ></input>
              <label>Payment Status</label>
              <select
                value={updatedPaymentStatus}
                onChange={(e) => setUpdatedPaymentStatus(e.target.value)}
              >
                <option value="default">Select Payment Status</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
              </select>
              <input
                type="submit"
                value="Update"
                className="enrollments_submitBtn"
              ></input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Enrollments;
