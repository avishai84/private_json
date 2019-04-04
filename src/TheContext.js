import React, { Component } from 'react';
import jsonData from './marketing_json/marketing-gap.json';
// first we will make a new context
const DefaultValue = {"default Data":"no data"};
const MyContext = React.createContext(DefaultValue);

// Then create a provider Component
class MyProvider extends Component {
  state = {
    foo:'you',
    data: jsonData
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
              <p>state: 🍥 {context.data.home.name}</p>
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
    <ContextOutput/>
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