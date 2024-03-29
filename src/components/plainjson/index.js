import React, {Component, Fragment} from 'react';

class PlainJson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: this.props,
      changedDetected: this.props,
      markup: this.props,
      jsonValue: this.props,
      jsonStringify: JSON.stringify(this.jsonValue, null, 2),
      clicked: '',
      customName:this.props
    };
  }

  render() {

    return (
        <Fragment>
          <label style={{"visibility":`${this.props.visibility}`}} htmlFor="textarea-a--json" className="sds_field sds-js_input-control">
            <textarea disabled="disabled" id="textarea-a--json" value={ JSON.stringify(this.state.jsonValue.json, null, 2) }>
            </textarea>
          </label>
        </Fragment>
    );
  }
};

export default PlainJson;
