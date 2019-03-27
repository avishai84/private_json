import React, { Component } from 'react';
import './App.scss';
import DataGeneral from './DataGeneral';
import AppContextProvider from './AppContextProvider';

const json = {
  "home": {
  "instanceName": "HomePage_031219",
  "ciid": "16840624",
  "type": "home",
  "name": "HomeMultiSimple",
  "colors":{  
    "color":["red","blue"]}
  }
};
   

/*        <AppContextProvider.Consumer>
        {(context) => (
            <React.Fragment>
              <div>
             
              </div>
            </React.Fragment>
          )}
        </AppContextProvider.Consumer> */ 

class App extends Component {
  render() {

  
    return (
      <div className="App" >
        <header className="App-header">
          <h2>Welcome to SEW JSON/HTML Tool</h2>
        </header>
        <AppContextProvider.Consumer></AppContextProvider.Consumer>
      </div>
    );
  }
}

export default App;
