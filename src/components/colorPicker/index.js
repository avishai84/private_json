import React, { Component, Fragment} from 'react';
import {ChromePicker} from 'react-color';

class ColorPicker extends Component {

    render() {
      return ( 
            <Fragment>
                <ChromePicker />
            </Fragment>
        );
      }
  }

  export default ColorPicker;
