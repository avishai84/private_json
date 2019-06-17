import React, { Component, Fragment } from 'react';
import jsonData from './marketing_json/svgOverlay.json';
import './DataGeneral.scss';
const json = JSON.parse(JSON.stringify(jsonData));
let changeName = '';

class ListItem extends Component {
  render(){
    return(
      <Fragment>
        <small style={{"fontSize":"10px","color":"red"}}>{this.props.list}</small>
      </Fragment>
    );
  }
}
class PlainJson extends Component {
  constructor(props){
    super(props);
   this.state={
    json: this.props,
    changedDetected: this.props,
    markup:this.props,
    jsonValue:this.props,
    jsonStringify :JSON.stringify(this.props, null, 2),
    clicked:''
    //Object.entries(this.props)
    // 
  };
  this.clickHandler = this.clickHandler.bind(this);
 }

   clickHandler(e){
      const clicked = [e.target.textContent];
      console.dir(JSON.parse(clicked[0]).json);
      this.setState({
        clicked:e.target
      })
      //console.log(this.state.clicked);
    }

  render(){

    const jsonView = (this.state.jsonValue != '') ? `${this.state.jsonStringify}` : 'wait...';
  //  console.log(this.state.jsonStringify);
  //  console.log(this.state.changedDetected);
    return(
      <div className="rightDiv">
        <Fragment>
  
          <label htmlFor="textarea-a--json" class="sds_field sds-js_input-control">
            <textarea id="textarea-a--json">{jsonView}</textarea>
          </label>
   
          {/* <pre onClick={this.clickHandler}>{jsonView}</pre>  */}
        </Fragment>
      </div>
    );
  }
};

class DataGeneral extends Component {
constructor(props){
  super(props);
  this.state = {
    jsonValue : json,
    elem:'',
    changedDetected:'',
    jsonDataRaw:jsonData,
    markup:''
  }
  this.parseJson = this.parseJson.bind(this);
  this.toUpdate = this.toUpdate.bind(this);
  this.createMarkup = this.createMarkup.bind(this);
  this.elemUpdatedInForm = this.elemUpdatedInForm.bind(this);
  this.setJsonBrand = this.setJsonBrand.bind(this);
}

// Create HTML template from json
parseJson(){
 

  const jsonNew = this.state.jsonValue;
  // console.log(jsonNew);

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
  
  // console.log(instanceHtml);

  this.toUpdate(instanceHtml);

}

// Update the new HTML state
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
elemUpdatedInForm(e){

  this.setState({
    changedDetected: `changed detected on element: "${e.target.nodeName.toLowerCase()}" `,
    markup:e.target.value
  })
}

setJsonBrand(){
  // selected dropdown json
  this.setState({
    jsonValue: json
  })
}



  render() {
    console.log(this.state.jsonValue);
    console.log(this.state.markup);
    console.log(this.state.changedDetected);
    // <small style={"color":"pink","fontSize":"10px","padding":"1em"}}>
    changeName += `${this.state.changedDetected} ${this.state.markup}`;


    return (
      <Fragment>
        <div className="DataGeneral" >
           <p>JSON will show here</p> 
           <select onChange={this.parseJson}>
           <option defaultValue>JSON Modules</option>
            <option onSelect={this.setJsonBrand} value="empty">SVGOverlay</option>
            <option value="empty">future jsons</option>
            <option value="empty">future jsons</option>
            <option value="empty">future jsons</option>
            </select>
        
            <br/>
            <Fragment>
              <form style={{"display":"flex"}} onInput={this.elemUpdatedInForm}>
              <div dangerouslySetInnerHTML={this.createMarkup()} />
              <div>
                <h6>History</h6>
                <ul>
                <ListItem list={changeName} />
                </ul>
              
              </div>
      
              </form>
            </Fragment>
            <PlainJson json={this.state.jsonDataRaw} detect={this.state.changedDetected} markup={this.state.markup} jsonValue={this.state.jsonValue}/>
        </div> 
      </Fragment>

    );
  }
}

export default DataGeneral;

