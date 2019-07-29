import React, { Component, Fragment} from 'react';
import Draggable, {DraggableCore} from 'react-draggable';

class DraggableComp extends Component {
    constructor(props){
      super(props);
      this.state={
        x: this.props.x,
        link:this.prop
      };
    }

    render() {
        console.log(this.props.x);      
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
          link={this.state.link}
          bounds={{left:0, top: 0, right: 610, bottom: 250}}>
          <div className="draggable draggingContainer">
              {this.props.children}
          </div>
        </Draggable>
   
  
        );
      }
  }

  export default DraggableComp;
