import React, { Component, types } from 'react';
// import types from './types';
// Set Up The Initial Context
const defaultValue = {"defaultValue":"Hello"};
export const AppContext = React.createContext(defaultValue);


export default class AppContextProvider extends Component {
  constructor(props) {
    super(props);
      //Object.assign({},defaultValue);
          this.state = {
            defaultValue:defaultValue
          };
        }
  
  
      render() {
        return (
            <AppContext.Provider value={this.state}>
              {this.props.children}
            </AppContext.Provider>
          );
        }
      };

  

      //AppContext.propTypes = types;

      export const AppContextProviderData = InnerComponent => props => (
        <AppContext.Consumer>
          {consumerState => (
             <React.Fragment>
                <InnerComponent value={consumerState} {...props} />
             </React.Fragment>
            )
          }
        </AppContext.Consumer>
      );

