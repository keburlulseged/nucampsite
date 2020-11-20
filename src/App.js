import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import React, { Component } from 'react';

function App() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href='/'>NuCamp</NavbarBrand>
        </div>
      </Navbar>
    </div>
  );
}

export default App;
