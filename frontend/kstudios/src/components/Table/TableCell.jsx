  import axios from "axios";
  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { Modal, Button } from "react-bootstrap";

  const TableCell = ({ day, date, time }) => {
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [userId, setUserId] = useState(() => {
      const uid = localStorage.getItem("uid");
      return uid ? JSON.parse(uid) : null;
    });
    const [isChecked, setIsChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [sessionName, setSessionName] = useState("");
    const [bookedSession, setBookedSession] = useState(null);
    const [bookedSessionId, setBookedSessioId] = useState(null);
    const [slotBooked, setSlotBooked] = useState(false);

    
    

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };

    useEffect(() => {
      const user = localStorage.getItem("user");
      const uid = localStorage.getItem("uid");

      if (user && uid) {
        const parsedUser = JSON.parse(user);
        const parsedUid = JSON.parse(uid); // <-- parse it!
        setIsLogged(true);
        setUserId(parsedUid); // will be a number now
      }
    }, []);

    const handleLogin = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isLogged) {
        alert("Please login for renting/enrolling!");
      }
    };

    // console.log("Uid: ", userId);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("hello");

      try {
        const response = await axios.post("http://localhost:8080/api/booking", {
          day: day,
          date: date,
          time: time,
          user: { uid: userId },
          session_name: sessionName,
          slot_status: "Booked",
          payment_status: "Unpaid",
        });

        const data = response.data;
        if(data!=null){
          alert(data);
          setShowModal(false);
          setSessionName("");
          setIsChecked(false);
          setBookedSession(sessionName);
          setSlotBooked(false);
        }
        

        if (data.error) {
          alert(data.error);
          return;
        }
      } catch (error) {
        if (error.response && error.response.data?.error) {
          alert(error.response.data.error);
        } else {
          alert("Error: " + error.message);
        }
      }
    };


    const handleEnroll = async (e) =>{
      try{
        e.preventDefault();

        const response = await axios.post("http://localhost:8080/api/enroll", {
          user: { uid: userId },
          session_name: bookedSession,
          booking: { slot_id: bookedSessionId },
          date: date,
          time: time,
          payment_status: "Unpaid",
        });

         const data = response.data;
         if (data != null) {
           alert(data);
           setSlotBooked(true);
         }

         if (data.error) {
           alert(data.error);
           setSlotBooked(false);
           return;
         }

      }catch(error){
        if (error.response && error.response.data?.error) {
          alert(error.response.data.error);
        } else {
          alert("Error: " + error.message);
        }
      }
    }

    const buttonLabel = isEmpty ? "Rent Slot" : "Enroll";

     useEffect(() => {
       if (!userId) return;

       const fetchBookingInfo = async () => {
         try {
           const response = await axios.post(
             "http://localhost:8080/api/findBooking",
             { date, time }
           );

           if (response.data && response.data.session_name) {
             setBookedSession(response.data.session_name); // <-- set booked session
             setBookedSessioId(response.data.slot_id);
           } else {
             setBookedSession(null);
             setBookedSessioId(null);
           }
         } catch (error) {
           console.error("Error fetching booking:", error);
         }
       };

       fetchBookingInfo();
     }, [date, time]);


      useEffect(() => {
        if (!userId) return;

        const fetchEnrollInfo = async () => {
          try {
            const response = await axios.post(
              "http://localhost:8080/api/findEnrollments",
              { date: date, time: time, user: { uid: userId } }
            );

            if (response.data && response.data.session_name) {

              setSlotBooked(true);
              setBookedSession(response.data.session_name);
            } else {
              setSlotBooked(false);
            }
          } catch (error) {
            console.error("Error fetching your enrollment:", error);
          }
        };
        fetchEnrollInfo();
      }, [date, time, userId]);

    //  if(type === "enroll"){
    //   isEmpty(false);
    //  }

    // useEffect(() => {
    //   console.log("Uid changed:", userId);
    // }, [userId]);

    return (
      <>
        <td>
          <br />
          {!isLogged && (
            <input
              type="button"
              value={buttonLabel}
              className="menu_table_button"
              onClick={handleLogin}
            />
          )}
          {isLogged && !bookedSession && (
            <input
              type="button"
              value="Rent Slot"
              className="menu_table_button"
              onClick={() => setShowModal(true)}
            />
          )}
          {isLogged && bookedSession && !slotBooked && (
            <div>
              <span style={{ fontWeight: "bold" }}>{bookedSession}</span>
              <br />
              <input
                type="button"
                value="Enroll"
                className="menu_table_button"
                onClick={handleEnroll}
              />
            </div>
          )}
          {isLogged && bookedSession && slotBooked && (
            <div>
              <span style={{ fontWeight: "bold" }}>{bookedSession}</span>
              <br />
              <span style={{ color: "green", fontWeight: "bold" }}>
                Enrolled Successfully ✅
              </span>
            </div>
          )}
        </td>

        {/* Booking Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Booking Slot</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="modal_text">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                I have read the instructions carefully!
              </label>
              <form>
                Classes:{" "}
                <input
                  type="text"
                  name="classes"
                  placeholder="Enter session name!"
                  value={sessionName}
                  onChange={(e) => {
                    console.log(e);
                    setSessionName(e.target.value)}}
                />
                <br />
              </form>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            {isChecked && (
              <Button variant="secondary" onClick={handleSubmit}>
                Rent Slot
              </Button>
            )}
            {!isChecked && (
              <Button variant="secondary" disabled="true">
                Rent Slot
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  export default TableCell;
