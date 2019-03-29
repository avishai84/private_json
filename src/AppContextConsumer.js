import React, { Component } from 'react';
// Set Up The Initial Context
const AppContext = React.createContext('Default context value');

export default class AppContextConsumer extends Component {

      render() {
        return (
            <AppContext.Provider.Consumer>
              {(context) => (
                    <div>{context.state.jsondata}</div>
                )}
            </AppContext.Provider.Consumer>
          );
        }
      };
