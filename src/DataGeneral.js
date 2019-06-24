import React, {
  Component,
  Fragment
} from 'react';
import jsonData from './marketing_json/svgOverlay.json';
import './DataGeneral.scss';
let json = JSON.parse(JSON.stringify(jsonData));

class ListItem extends Component {
  render() {
    return ( 
      <Fragment>
	      <small style={{ "fontSize": "12px", "color": "orange" }}>{this.props.customName} {this.props.name}</small>&nbsp;
			  <small style={{ "fontSize": "12px", "color": "red" }}>{this.props.list}</small>
			</Fragment>
    );
  }
}
class PlainJson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: this.props,
      changedDetected: this.props,
      markup: this.props,
      jsonValue: this.props,
      jsonStringify: JSON.stringify(this.jsonValue, null, 2),
      clicked: '',
      customName:this.props
    };
  }

  render() {

    return (
      <div className="rightDiv" style={{"visibility":`${this.props.visibility}`}}>
        <Fragment>
          <label htmlFor="textarea-a--json" className="sds_field sds-js_input-control">
            <textarea disabled="disabled" id="textarea-a--json" value={ JSON.stringify(this.state.jsonValue.json, null, 2) }>
            </textarea>
          </label>
        </Fragment>
      </div>
    );
  }
};

class DataGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonValue: jsonData,
      elem: '',
      changedDetected: '',
      jsonDataRaw: jsonData,
      markup: '',
      customName: '',
      targetName: '',
      visibility:'hidden'
    }
    this.parseJson = this.parseJson.bind(this);
    this.toUpdate = this.toUpdate.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this.elemUpdatedInForm = this.elemUpdatedInForm.bind(this);
    this.focusElem = this.focusElem.bind(this);
  }
  // Create HTML template from json
  parseJson() {
    const origJson = json;
    let jsonNew = this.state.jsonValue;
    let ctaLinksArray = origJson.data.links.content;
    let linkInputs = '';
    let instanceHtml = '';
    
    instanceHtml = 
      <div>
        <label htmlFor={origJson.instanceDesc.replace(/\s/g, '')}>
          instance Desc:
          <input data-instancename='instanceDesc' id={origJson.instanceDesc.replace(/\s/g, '')} type="text" placeholder={origJson.instanceDesc} defaultValue={origJson.instanceDesc}/>
        </label>

        <label htmlFor="__experimentRunning">
        experimentRunning:
          <select data-instancename='experimentRunning' id="__experimentRunning">
            <option defaultValue={jsonNew.experimentRunning.toString()}> 
              {jsonNew.experimentRunning.toString()}
            </option>
            <option value={(jsonNew.experimentRunning.toString() == true) ? false: false}>
            {(jsonNew.experimentRunning.toString() == true) ? "false": "false"}
            </option>
          </select>
        </label>

        <h5>background properties</h5>
        <label htmlFor={origJson.data.background.content.altText.replace(/\s/g, '')}>
          background altText:
        <input data-instancename='altText' name="background" id={origJson.data.background.content.altText.replace(/\s/g, '')} type="text" defaultValue={origJson.data.background.content.altText} placeholder={origJson.data.background.content.altText} />
        </label>

        <label htmlFor={origJson.data.background.content.largeImg.replace(/\s/g, '')}>
            background largeImg:
          <input data-instancename='largeImg' name="background" id={origJson.data.background.content.largeImg.replace(/\s/g, '')} type="text" defaultValue={origJson.data.background.content.largeImg} placeholder={origJson.data.background.content.largeImg} />
        </label>

        <label htmlFor={origJson.data.background.content.smallImg.replace(/\s/g, '')}>
          background smallImg:
        <input data-instancename='smallImg' name="background" id={origJson.data.background.content.smallImg.replace(/\s/g, '')} type="text" defaultValue={origJson.data.background.content.smallImg} placeholder={origJson.data.background.content.smallImg} />
        </label>

        <h5>svgoverlay properties</h5>
        <label htmlFor={origJson.data.svgoverlay.altText.replace(/\s/g, '')}>
          svgoverlay altText:
           <input data-instancename='altText' name="svgoverlay" id={origJson.data.svgoverlay.altText.replace(/\s/g, '')} type="text" defaultValue={origJson.data.svgoverlay.altText} placeholder={origJson.data.svgoverlay.altText} />
        </label>

        <label htmlFor={origJson.data.svgoverlay.largeImg.replace(/\s/g, '')}>
          svgoverlay largeImg:
          <input data-instancename='largeImg' name="svgoverlay" id={origJson.data.svgoverlay.largeImg.replace(/\s/g, '')} type="text" defaultValue={jsonNew.data.svgoverlay.largeImg} placeholder={origJson.data.svgoverlay.largeImg} />
        </label>

        <label htmlFor={origJson.data.svgoverlay.smallImg.replace(/\s/g, '')}>
          svgoverlay smallImg:
         <input data-instancename='smallImg' name="svgoverlay" id={origJson.data.svgoverlay.smallImg.replace(/\s/g, '')} type="text" defaultValue={jsonNew.data.svgoverlay.smallImg} placeholder={origJson.data.svgoverlay.smallImg} />
       </label>

       <h5>CTA links</h5>

      {linkInputs = ctaLinksArray.map((item, index) => {
        return (
        <div key={`__wrp_text${index}`}>
            <label key={`__key_text${index}`} htmlFor={`__text${index}`}>Text:
            <input data-instancename="text" id={`__text${index}`} name="text" placeholder={item.text} defaultValue={item.text} onFocus={this.elemUpdatedInForm}/>
            </label>
            <label key={`__key_href${index}`} htmlFor={`__href${index}`}>href:
            <input data-instancename="href" id={`__href${index}`} name="href" placeholder={item.href} defaultValue={item.href} onFocus={this.elemUpdatedInForm}/>
            </label>
        </div>
        );
      })}
     
      </div>;


    this.setState({
      visibility: 'visible'
    })
    this.toUpdate(instanceHtml);
  }
  // Update the new HTML state
  toUpdate(instanceHtml) {
    this.setState({
      elem: instanceHtml
    });
    this.createMarkup();
  }

  // Convert string to HTML and set in DOM
  createMarkup() {
    return {
      __html: this.state.elem
    };
  }

  // Detect change on the form
  elemUpdatedInForm(e) {
    console.dir(e.target);
    this.setState({
      changedDetected: `${e.target.nodeName.toLowerCase()}`,
      markup: e.target.value,
      customName: e.target.dataset.instancename
    });

    // write changes to json
    this.makeChangesJson();
  }
  makeChangesJson() {
    let deepChange = this.state.jsonValue;

    setTimeout(() => {
      // changing json new value
      let currentChange = this.state.jsonValue[this.state.customName];
 
      //console.log(this.state.customName);
      if (this.state.customName === 'experimentRunning') {
        currentChange = currentChange ? (this.state.jsonValue[this.state.customName] = false) : (this.state.jsonValue[this.state.customName] = true);
        // console.log(`2: ${currentChange}`);
      }
      if (this.state.customName === 'instanceDesc') {
        this.state.jsonValue[this.state.customName] = this.state.markup;
        //console.log(`3: ${currentChange}`);
      }
      // Background Image, Alt
     
      if (this.state.targetName === 'background') {
        if (this.state.jsonValue.data.background.content[this.state.customName]) {
          this.state.jsonValue.data.background.content[this.state.customName] = this.state.markup;
        }
      }
      // svgoverlay Image, SVG, Alt
      if (this.state.targetName === 'svgoverlay') {
        
        if (deepChange.data.svgoverlay[this.state.customName]) {
          this.state.jsonValue.data.svgoverlay[this.state.customName] = this.state.markup;
        }

      }
      // links - CTA
      if (this.state.customName === 'href') {
        deepChange.data.links.content.map((element, index) => {
          return element[this.state.customName]= this.state.markup;
        });
      }
      if (this.state.customName === 'text') {
        console.log(this.state.customName);
        deepChange.data.links.content.map((element, index) => {
         return element[this.state.customName]= this.state.markup;
        });

      }

      this.setState({
        jsonValue: this.state.jsonValue
      });
 
      this.parseJson();
    }, 50);
  }

  globalOnChange(e){
    console.log(e.target.value);
  }
  focusElem(e) {
    // this fn helps identify which input elem we are changing
    this.setState({
      targetName: e.target.name
    })
  }
  render() {

    return(
      <Fragment>
        <div className="DataGeneral">
          <p style={{"visibility":`${(this.state.visibility) == 'hidden' ? 'visible': 'hidden'}`}}>JSON will show here</p>
          <select onChange={this.parseJson} >
            <option defaultValue>JSON Modules</option>
            <option value={this.state.jsonValue.name}>{this.state.jsonValue.name}</option>
          </select>
          <br/>
          <Fragment>
            {/* onInput={this.elemUpdatedInForm} */}
            <div style={{ "display": "flex" }} >  
               <form onChange={this.elemUpdatedInForm} onKeyUp={this.focusElem}>
                 {this.state.elem}
               </form>
            </div>
          </Fragment>
          <PlainJson json={this.state.jsonDataRaw} detect={this.state.changedDetected} markup={this.state.markup} jsonValue={this.state.jsonValue} visibility={this.state.visibility}/>
        </div>
        <div>
          <h6>Last Change</h6> 
          <ListItem name={this.state.changedDetected} list={this.state.markup} customName={this.state.customName} />
        </div>
      </Fragment>
    );

  }
}

export default DataGeneral;