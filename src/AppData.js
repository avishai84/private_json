import React, { Component } from 'react';
import toolData from './toolData.json'

class AppData extends Component {
    constructor(props){
        super(props);
        this.state = {
            version: toolData
        };
    }

  render() {
    let contributor = this.state.version.contributors.map((name) => {
      return `${name}, `;
    });
    return (
      <div className="AppData">
        <small>Version: {this.state.version.version}</small><br/>
        <small>WCD contributors: {contributor}</small>
      </div>
    );
  }
}

export default AppData;
