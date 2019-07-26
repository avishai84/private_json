import React, { Component, Fragment} from 'react';


class SliderToggle extends Component {
    constructor(props){
      super(props);
      this.state={
        isChecked: props.isChecked || false
      };
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
        this.setState({ isChecked: !this.state.isChecked })
      }
    render(){
        return(
            <Fragment>
                <div className="sliderWrapper">
                    <span className="desktop_icon"></span>
                        <label className="switch">
                            <input type="checkbox" value={this.state.isChecked} onChange={this.handleChange}/>
                            <span className="slider round"></span>
                        </label>
                    <span className="iPhone_icon"></span>
                </div>
            </Fragment>
        );
    }
}

export default SliderToggle;