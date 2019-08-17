import React, { Component } from 'react';
import toolData from '../../toolData.json';
const date = new Date();

class Footer extends Component {
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
        <small>Created: 2019-{date.getFullYear()}</small><br/>
        <small>WCD contributors: {contributor}</small>
      </div>
    );
  }
}

export default Footer;
