import React, { Component } from 'react';
import logo from './images/logo_wcd-json-builder.svg';

import Footer from './components/footer';
import Content from './components/content';

// This is where the App get assembeld. If you use CSS frameworks you may need to import that here.
class App extends Component { 

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Logo" />
        </header>
        <main>
          <Content />
        </main>
        <footer>
         <Footer/>
        </footer>
      </div>
    );
  }
}

export default App;
