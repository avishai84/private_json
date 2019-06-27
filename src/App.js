import React, { Component } from 'react';
import './App.scss';
import AppData from './AppData.js';
import logo from './images/logo_wcd-json-builder.svg';
import DataGeneral from './DataGeneral';
// This is where the App get assembeld. If you use CSS frameworks you may need to import that here.
class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
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
