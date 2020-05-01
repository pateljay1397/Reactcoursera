import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import Main from './components/MainComponenet';

class App extends Component {
  render() {
    return (
      <div class="container">
        <Main/>
      </div>
    );
  }
}

export default App;
