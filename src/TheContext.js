import React, { Component } from 'react';
import jsonData from './marketing_json/marketing-gap.json';
// first we will make a new context
const DefaultValue = {"defaultData":"no data"};
const MyContext = React.createContext(DefaultValue);

// Then create a provider Component
class MyProvider extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: jsonData
    }
  }

  render() {

    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

class ContextOutput extends Component {
  render() {
    return (
      <div>
        <MyContext.Consumer>
          {(context) => (
            <React.Fragment>
            <p>Mapping: {context.data.home.components[0].data.svgoverlay.altText} </p>
              {/* <button onClick={context.growAYearOlder}>🍰🎂</button> */}
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </div>
    )
  }
}

const SomeData = (props) => (
  <div className="SomeData">
    <ContextOutput>
  
    </ContextOutput>
  </div>
)

class TheContext extends Component {
  render() {
    return (
      <div className="TheContext">
  
        <MyProvider>

            <SomeData/>

        </MyProvider>
      </div>
    )
  }
}


export default TheContext;