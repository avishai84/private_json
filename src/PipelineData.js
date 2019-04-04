import React, { Component } from 'react';
import AppContextProvider from './AppContextProvider'
import jsonData from './marketing_json/marketing-gap.json';



export default class PipelineData extends Component {
  constructor(props){
    super(props);
      this.state = {
        data:jsonData
      };
    }
      render() {
        return (
          // <AppContextProvider>
          //     {(context) => <div><ul>${context.data}</ul></div>}
          //  </AppContextProvider>
        <AppContextProvider>
          {consumerState => (
            <React.Fragment>
              <p value={consumerState}>Hi</p>
            </React.Fragment>
          )}
        </AppContextProvider>


          );
        }
      };
