import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Modal, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import profileImage from "../../images/profile_image.png";
import "./AppNavbar.css";
import axios from "axios";

const AppNavbar = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const userRole = localStorage.getItem("role");
    const userProfile = localStorage.getItem("profile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      if (userRole) setRole(JSON.parse(userRole));
      setImage(JSON.parse(userProfile));
    }
   
  }, []);

useEffect(() => {
      const userRole = localStorage.getItem("role");
      if (userRole) {
        setRole(JSON.parse(userRole));
      }
    }, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setUser(null);
    setRole("");

    setShowModal(false);
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar-bg">
        <Container fluid>
          <Navbar.Brand className="navbar-brand-text">KStudios</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                About Us
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact">
                Contact Us
              </Nav.Link>
              {!user && (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              )}
              {user && (
                <>
                  <Nav.Link as={NavLink} to="/profile">
                    My Profile
                  </Nav.Link>
                  {role === "Admin" && (
                    <Nav.Link as={NavLink} to="/registerAdmin">
                      Register Admin
                    </Nav.Link>
                  )}
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="navbar-profile-img"
                    onClick={() => setShowModal(true)}
                    style={{ cursor: "pointer" }}
                  />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Profile Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={profileImage} alt="Profile" className="modal_image" />
          <p className="modal_text">
            <strong>Welcome to KStudios</strong>

            {user}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppNavbar;
