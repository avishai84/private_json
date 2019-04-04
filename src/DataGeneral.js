import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TheContext from './TheContext';
import jsonData from './marketing_json/marketing-gap.json';
class DataGeneral extends Component {

  render() {

    return (
        <div className="DataGeneral" >
            <TheContext/>
            
        </div>
    );
  }
}

export default DataGeneral;

