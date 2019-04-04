import React, { Component } from 'react';
import toolData from './toolData.json'

class AppData extends Component {
    constructor(props){
        super(props);
        this.state = {
            version: toolData.version
        };
    }

  render() {
    return (
      <div className="AppData">
        <small>Version: {this.state.version}</small>
      </div>
    );
  }
}

export default AppData;
