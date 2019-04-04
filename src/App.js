import React, { Component } from 'react';
import './App.scss';
import AppData from './AppData.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Welcome to SEW JSON/HTML Tool</h2>
        </header>
        <main>
          main
        </main>
        <footer>
         <AppData/>
        </footer>
        
      </div>
    );
  }
}

export default App;
