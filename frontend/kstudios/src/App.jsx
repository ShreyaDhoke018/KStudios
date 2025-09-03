import "./App.css";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";

import AppNavbar from "./components/Navbar/AppNavbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Instructions from "./components/Instructions/Instructions";
import RegisterAdmin from "./components/registerAdmin/registerAdmin";
import Profile from "./components/Profile/Profile";
import Bookings from "./components/Bookings/Bookings";

const App = () => {
  const location = useLocation();

  // // Only show AppNavbar for routes other than menu/instructions
  // const showAppNavbar = !["/menu", "/instructions"].includes(location.pathname);

  return (
    <>
      <header>
        <AppNavbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/registerAdmin" element={<RegisterAdmin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />}/>
      </Routes>
    </>
  );
};

export default App;
