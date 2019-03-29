import React, { Component } from 'react';
// Set Up The Initial Context
export const AppContext = React.createContext('Default context value');

const importeData = {hello:"world"};

export default class AppContextProvider extends Component {
      state = {
        jsondata:importeData
      }
     // static contextType = AppContext; 
  
      render() {
        return (
            <AppContext.Provider value={this.state}>
             {this.props.children}
            </AppContext.Provider>
          );
        }
      };

  

