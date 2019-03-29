import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DataGeneral extends Component {

  render() {
    // console.log(this.props.json.colors);
    const {json} = this.props;
    console.log(json);

    for(let value in json){
        console.log(value);
        console.log(json[value].colors.color[0]);
    }

    // let dataarr = [];
    // for(let [key, value] of json){
    //     dataarr.push(<div key={key}>{value}></div>);
    // }
    return (
        <div className="DataGeneral" >
        {/* <ul>
        { Object.keys(json.home).map((keyName, keyIndex) => <li key={[keyIndex]}>{keyName} : {json.home[keyName]} {json.home.colors.color[keyName]}</li>)
         
            }
        </ul> */}
            <small>DataGeneral</small>
        </div>
    );
  }
}

export default DataGeneral;

DataGeneral.propTypes = {
home: PropTypes.object
};
 // use keyName to get current key's name
  // and a[keyName] to get its value