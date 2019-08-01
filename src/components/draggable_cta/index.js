import React, { Component, Fragment} from 'react';
import Draggable, {DraggableCore, handleStop} from 'react-draggable';

class DraggableComp extends Component {
    constructor(props){
      super(props);
      this.state={
        x: this.props.x,
        link:this.prop,
        desktopStyles: this.props.desktopStyles,
        positionY:'',
        positionX:''
  
      };
      this.convertToPrecantage=this.convertToPrecantage.bind(this);

    }

    // handleStop(e: MouseEvent, data: Object){
    //   console.log(e.x);
    //   console.log(e.y);
    //   console.log('Event: ', e);
    //   console.log('Data: ', data);
   
    //   console.log((Number.parseFloat(e.x / 16) * 1).toFixed(2));
    //   console.log((Number.parseFloat(e.y / 16) * 1).toFixed(2));
 
    // } 
    convertToPrecantage(e, data: Object){
      this.setState({
        positionX:(Number.parseFloat(data.x / 16) * 1.00).toFixed(2)+'%',
        positionY: (Number.parseFloat(data.y / 16) * 1.00).toFixed(2)+'%'
      });
    }
  
      // Welcome to Prop drilling....
    // We need to get the position X, Y data to update the JSON.
    // The data is coming from Draggable comp. three levels deep
    // Future update to use Contex API

    sendDataUpTheChain = () => {
    this.props.parentPositioningFromDraggbleCallback(this.state.positionX,this.state.positionY);
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
          bounds={{left:0, top: 0, right: 1280, bottom: 1250}}
          onStop = {this.sendDataUpTheChain.bind(this)}
          >
          <div className="draggable draggingContainer" 
          style={{"color":this.state.desktopStyles.color, "backgroundColor":this.state.desktopStyles.backgroundColor,"fontSize":16}}
          >
              {this.props.children}
              <Fragment>
                <div className="toolTip">
                  <span>{this.state.positionY}</span>
                  <span>{this.state.positionX}</span>
                  
                </div>
                {/* <button onClick={this.sendDataUpTheChain.bind(this)}>data</button> */}
              </Fragment>
          </div>
          
        </Draggable>
   
  
        );
      }
  }

  export default DraggableComp;
