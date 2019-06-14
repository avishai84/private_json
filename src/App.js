import React, { Component } from 'react';
import './App.scss';
import AppData from './AppData.js';
import logo from './images/wcdLogo.png';
import DataGeneral from './DataGeneral';
class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Welcome to SEW JSON/HTML Tool</h2>
           <img src={logo} alt="Logo" />
        </header>
        <main>
          <DataGeneral />
        </main>
        <footer>
         <AppData/>
        </footer>
      </div>
    );
  }
}

export default App;
