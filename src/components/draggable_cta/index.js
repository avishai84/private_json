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
          defaultPosition={{x: -100, y: -100}}
          position={null}
          grid={[1, 1]}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
          link={this.state.link}>
          <div className="draggable draggingContainer">
              {this.props.children}
          </div>
        </Draggable>
   
  
        );
      }
  }

  export default DraggableComp;
