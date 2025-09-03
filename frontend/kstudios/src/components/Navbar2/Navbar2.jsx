import React,{useState, useEffect} from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar2.css";

const Navbar2 = () => {

  const [role, setRole] = useState("");
   useEffect(() => {
      const userRole = localStorage.getItem("role");
      if (userRole) {
        setRole(JSON.parse(userRole));
      }
    }, []);
  


  return (
    <Navbar expand="lg" className="custom-navbar-bg">
      <Container fluid>
        <Navbar.Brand className="navbar-brand-text">KStudios</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {role === "Admin" ? (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/menu"
                  end
                  className="nav-link-text active"
                >
                  Schedule
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/instructions"
                  end
                  className="nav-link-text"
                >
                  Instructions
                </Nav.Link>
                <Nav.Link as={NavLink} to="/" className="nav-link-text">
                  Classes/Workshops
                </Nav.Link>
                <Nav.Link as={NavLink} to="/" className="nav-link-text">
                  Image Gallery
                </Nav.Link>
                <Nav.Link as={NavLink} to="/bookings" className="nav-link-text">
                  Manage Bookings
                </Nav.Link>
                <Nav.Link as={NavLink} to="/enrollments" className="nav-link-text">
                  Manage Enrollments
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/menu"
                  end
                  className="nav-link-text active"
                >
                  Schedule
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/instructions"
                  end
                  className="nav-link-text"
                >
                  Instructions
                </Nav.Link>
                <Nav.Link as={NavLink} to="/" className="nav-link-text">
                  Classes/Workshops
                </Nav.Link>
                <Nav.Link as={NavLink} to="/" className="nav-link-text">
                  Image Gallery
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar2
