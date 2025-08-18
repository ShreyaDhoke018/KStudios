import React from "react";
import "./Contact.css";
import StudioLocation from "./StudioLocation";

const Contact = () => {
  return (
    <div className="contact_body">
      <div className="contact_left">
        <StudioLocation />
        <h1>Address:</h1>
        <p>
          Shop No. 102, Shri Vallabh CHSL, Mathuradas Road, Kandivali, Bhagat
          Colony, Kandivali West, Mumbai, Maharashtra 400067
        </p>
      </div>
      <div className="contact_right">
        <div className="contact_info">
          <div className="contact_email">
            <h4>Email Us: </h4>
            <form>
              <label>Subject: </label>
              <br></br>
              <input type="text" name="subject"></input>
              <br></br>
              <label>Body:</label>
              <br></br>
              <textarea rows={10} cols={90} name="body" />
              <br></br>
              <label>Attach Files:</label>
              <br></br>
              <input type="file" name="file" className="contact_filebtn"></input>
              <input type="submit" value={"Send Email"} className="contact_submit"></input>
            </form>
            <br></br>
            <h4>Phone Number: </h4>
            <ul>
              <li>
                <p>9819-240-360</p>
              </li>
              <li>
                <p>9819-255-537</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
