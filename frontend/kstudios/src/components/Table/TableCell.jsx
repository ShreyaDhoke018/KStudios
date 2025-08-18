import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TableCell = ({ day, time }) => {
     const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogged(true);
    }
  }, []);

  const handleLogin = () => {
    if (!isLogged) {
      alert("Please login for renting/enrolling!");
    }
    navigate("/login");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try{
  //     const response = await axios.post("http://localhost:8080/api/booking")

  //   }

  // }

   const buttonLabel = {isEmpty} ? "Enroll" : "Rent Slot";

  //  if(type === "enroll"){
  //   isEmpty(false);
  //  }

  return (
    <td>
      {activity && <b>{activity}</b>}
      <br />
      {!isLogged && (
        <input
          type="submit"
          value={buttonLabel}
          className="menu_table_button"
          onClick={handleLogin}
        />
      )}
      {isLogged && (
        <input type="submit" value={buttonLabel} className="menu_button" onClick={handleSubmit}/>
      )}
    </td>
  );
};

export default TableCell;
