import React from 'react'
import Navbar2 from '../Navbar2/Navbar2';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Table from './../Table/Table';

const Menu = () => {
return (
  <>
    <header>
      <Navbar2 />
    </header>
    <main>
      <Table />
    </main>
  </>
);
}

export default Menu
