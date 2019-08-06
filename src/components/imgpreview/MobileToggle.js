import React, { Component, Fragment} from 'react';


class MobileToggle extends Component {
    constructor(props){
      super(props);
      this.state={
        isChecked: false,
        mobile: '',
        mobileSvg: '',
        desktop:'',
        svgDesktop:'',
        imgUrl: this.props.imgUrl,
        imgData: this.props.imgData
      };
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
        this.setState({ 
            isChecked: !this.state.isChecked,
            mobile: this.props.imgData.background.content.largeImg,
            imgUrl:this.props.imgData
        })

      }
        render(){
            const smallSvg = `${this.props.imgUrl}${this.state.imgData.svgoverlay.smallImg}`;
            const smallImg = `${this.props.imgUrl}${this.state.imgData.background.content.smallImg}`;
            return(
                <Fragment>
                <div className="switchWrapper">
                    <div>
                        <div className="onoffswitch">
                            <input type="checkbox" value={this.state.isChecked} id="mobileonOffSwitch" onChange={this.handleChange} name="onoffswitch" className="onoffswitch-checkbox"/>
                            <label className="onoffswitch-label" htmlFor="mobileonOffSwitch">   
                                <span className="onoffswitch-inner"></span>
                                <span className="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
               
                    <Fragment>
                        {
                            this.state.isChecked ? <div style={{
                                "width": "414px",
                                "height": "auto",
                                "border": "2px solid grey",
                                "borderRadius": "10px",
                                "position":"relative",
                                "padding": "12px",
                                "backgroundColor": "black",
                                "marginLeft": "15px",
                                "boxShadow": "2px 2px 10px #040404"}}>
                                    <img style={{"maxWidth":"380px"}} src={smallImg} alt={this.state.imgData.background.content.altText}/>
                                    <div style={{"position":"absolute","top":0,"left":0}}>
                                    <img style={{"maxWidth":"380px"}} src={smallSvg} alt={this.state.imgData.svgoverlay.altText}/>
                                    </div>
                                </div> :``
                        }
                    </Fragment>
                </div>
            </Fragment>
            );    
        }
    }

export default MobileToggle;