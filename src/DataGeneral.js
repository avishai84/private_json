import React, { Component, Fragment } from 'react';
import jsonData from './marketing_json/svgOverlay.json';
const json = JSON.parse(JSON.stringify(jsonData));

class PlainJson extends Component {

  render(){
    return(
      <Fragment>
        I am plain json
      </Fragment>
    );
  }

}

class DataGeneral extends Component {
constructor(props){
  super(props);
  this.state = {
    jsonValue : json,
    elem:'',
    changedDetected:''
  }
  this.parseJson = this.parseJson.bind(this);
  this.toUpdate = this.toUpdate.bind(this);
  this.createMarkup = this.createMarkup.bind(this);
  this.elemUpdatedInForm = this.elemUpdatedInForm.bind(this);
}

// Create HTML template from json
parseJson(){
  const jsonNew = this.state.jsonValue;
  console.log(jsonNew);

    const instanceHtml = `<label htmlFor="text-input_${jsonNew.instanceDesc.replace(/\s/g, '')}">
    instanceDesc:   
    <input id="text-input_${jsonNew.instanceDesc.replace(/\s/g, '')}" type="text" value=${jsonNew.instanceDesc} placeholder="${jsonNew.instanceDesc}"/>
  </label>

  <br>

  <label htmlFor="text-input_${jsonNew.experimentRunning}">
  experimentRunning:  
  <select id="text-input_${jsonNew.experimentRunning}"> 
  <option value="${!jsonNew.experimentRunning}">${jsonNew.experimentRunning}</option>
  <option value="${!jsonNew.experimentRunning}">${!jsonNew.experimentRunning}</option>
  </select>
  </label>
  
 <br>

 <label htmlFor="text-input_${jsonNew.data.background.content.altText.replace(/\s/g, '')}">
    background altText:   
    <input id="text-input_${jsonNew.data.background.content.altText.replace(/\s/g, '')}" type="text" value=${jsonNew.data.background.content.altText} placeholder="${jsonNew.data.background.content.altText}"/>
  </label>

  <br>

  <label htmlFor="text-input_${jsonNew.data.background.content.largeImg.replace(/\s/g, '')}">
  background largeImg:   
  <input id="text-input_${jsonNew.data.background.content.largeImg.replace(/\s/g, '')}" type="text" value=${jsonNew.data.background.content.largeImg} placeholder="${jsonNew.data.background.content.largeImg}"/>
</label>

<br>

<label htmlFor="text-input_${jsonNew.data.background.content.smallImg.replace(/\s/g, '')}">
background smallImg:   
<input id="text-input_${jsonNew.data.background.content.smallImg.replace(/\s/g, '')}" type="text" value=${jsonNew.data.background.content.smallImg} placeholder="${jsonNew.data.background.content.smallImg}"/>
</label>

  `;
  
  console.log(instanceHtml);

  this.toUpdate(instanceHtml);

}

// Update the new HTML to set state
toUpdate(instanceHtml){
  this.setState({
    elem: instanceHtml
  });
  this.createMarkup();
}

// Convert string to HTML and set in DOM
createMarkup() {
  return {__html: this.state.elem};
}

// Detect change on the form
elemUpdatedInForm(){
  this.setState({
    changedDetected: 'changed detected'
  })
}

  render() {
    console.log(this.state.elem);
    return (
        <div className="DataGeneral" >
           <p>JSON will show here</p> 
            <button onClick={this.parseJson}>Parse SVGOverlay</button>
            <br/>
            <Fragment>
              <form style={{"display":"flex"}} onKeyUp={this.elemUpdatedInForm}>
              <div dangerouslySetInnerHTML={this.createMarkup()} /> <small style={{"color":"pink","fontSize":"10px","padding":"1em"}}>{this.state.changedDetected}</small>
              </form>
            </Fragment>
            
            <PlainJson json={jsonData}>
              {this.props.children}
            </PlainJson>
        </div>
    );
  }
}

export default DataGeneral;

