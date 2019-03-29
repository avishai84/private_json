import React, { Component } from 'react';
import './App.scss';
import DataGeneral from './DataGeneral';
import PipelineData from './PipelineData'
import FooContext from './FooContext';


class App extends Component {

  render() {
    return (
    <div>
        <div className="App">
            <header className="App-header">
              <h2>Welcome to SEW JSON/HTML Tool</h2>
            </header>
            <FooContext></FooContext>
            <div>
              <DataGeneral />
            </div>
          </div>
       </div>
    );
  }
}

export default App;
