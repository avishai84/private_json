import React, { Component, Fragment} from 'react';
import Draggable, {DraggableCore, handleStop} from 'react-draggable';

class DraggableComp extends Component {
    constructor(props){
      super(props);
      this.state={
        x: this.props.x,
        link:this.prop,
        desktopStyles: this.props.desktopStyles,
        top:'',
        left:''
      };
      this.convertToPrecantage=this.convertToPrecantage.bind(this);
    }

    handleStop(e: MouseEvent, data: Object){
      console.log(e.x);
      console.log(e.y);
      console.log('Event: ', e);
      console.log('Data: ', data);
   
      console.log((Number.parseFloat(e.x / 16) * 1).toFixed(2));
      console.log((Number.parseFloat(e.y / 16) * 1).toFixed(2));
 
    } 
    convertToPrecantage(e){
      this.setState({
        top:(Number.parseFloat(e.y / 16) * 1).toFixed(2)+'%',
        left: (Number.parseFloat(e.x / 16) * 1).toFixed(2)+'%'
      });
    }
    render() {
 
      return ( 
        <Draggable
          axis="both"
          handle=".draggingContainer"
          defaultPosition={{x: 200, y: 160}}
          position={null}
          grid={[1, 1]}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
          onDrag={this.convertToPrecantage}
          link={this.state.link}
          bounds={{left:-400, top: -1000, right: 1000, bottom: 1250}}>
          <div className="draggable draggingContainer" style={{"color":this.state.desktopStyles.color, "backgroundColor":this.state.desktopStyles.backgroundColor,"fontSize":16}}>
              {this.props.children}
              <Fragment>
                <div className="toolTip">
                  <span>{this.state.top}</span>
                  <span>{this.state.left}</span>
                </div>
              </Fragment>
     
          </div>
        </Draggable>
   
  
        );
      }
  }

  export default DraggableComp;
