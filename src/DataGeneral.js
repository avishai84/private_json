import React, {Component, Fragment} from 'react';
import jsonData from './marketing_json/svgOverlay.json';
import './DataGeneral.scss';
import ImgPreview from './ImgPreview'
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
    let linkInputs = ctaLinksArray.map((item, index) => {
      return (
      <div key={index}>`<label key={"key_Text"+index} htmlFor={"text-input-ctaText_"+index}>Text:<input data-instancename="text" id={"text-input-ctaText_"+index} name="text" placeholder={item.text} type="text" defaultValue={item.text}/></label><label key={"key__href"+index} htmlFor={"text-input-ctaLink_"+index}>Link:<input data-instancename="href" id={"text-input-ctaLink_"+index} name="href" placeholder={item.href} type="text" defaultValue={item.href} /></label>`</div>);
    });


    let instanceHtml = 
      <div>
        <label htmlFor={origJson.instanceDesc.replace(/\s/g, '')}>Instance Description:
          <input data-instancename='instanceDesc' id={origJson.instanceDesc.replace(/\s/g, '')} type="text" placeholder={origJson.instanceDesc} defaultValue={origJson.instanceDesc}/>
        </label>
        <br/>
        <h5>Background Properties</h5>
        <label htmlFor={origJson.data.background.content.altText.replace(/\s/g, '')}>Background Alt Text:
        <input data-instancename='altText' name="background" id={origJson.data.background.content.altText.replace(/\s/g, '')} type="text" defaultValue={origJson.data.background.content.altText} placeholder={origJson.data.background.content.altText} />
        </label>
        <br/>
        <label htmlFor={origJson.data.background.content.largeImg.replace(/\s/g, '')}>Background Desktop Image:
          <input data-instancename='largeImg' name="background" id={origJson.data.background.content.largeImg.replace(/\s/g, '')} type="text" defaultValue={origJson.data.background.content.largeImg} placeholder={origJson.data.background.content.largeImg} />
        </label>
        <br/>
        <label htmlFor={origJson.data.background.content.smallImg.replace(/\s/g, '')}>Background Mobile Image:
        <input data-instancename='smallImg' name="background" id={origJson.data.background.content.smallImg.replace(/\s/g, '')} type="text" defaultValue={origJson.data.background.content.smallImg} placeholder={origJson.data.background.content.smallImg} />
        </label>
        <br/>
        <h5>SVG Overlay Properties</h5>
        <label htmlFor={origJson.data.svgoverlay.altText.replace(/\s/g, '')}>Svg Overlay Alt Text:
           <input data-instancename='altText' name="svgoverlay" id={origJson.data.svgoverlay.altText.replace(/\s/g, '')} type="text" defaultValue={origJson.data.svgoverlay.altText} placeholder={origJson.data.svgoverlay.altText} />
        </label>
        <br/>
        <label htmlFor={origJson.data.svgoverlay.largeImg.replace(/\s/g, '')}>Svg Overlay Desktop Image:
          <input data-instancename='largeImg' name="svgoverlay" id={origJson.data.svgoverlay.largeImg.replace(/\s/g, '')} type="text" defaultValue={origJson.data.svgoverlay.largeImg} placeholder={origJson.data.svgoverlay.largeImg} />
        </label>
        <br/>
        <label htmlFor={origJson.data.svgoverlay.smallImg.replace(/\s/g, '')}>Svg Overlay Mobile Image:
          <input data-instancename='smallImg' name="svgoverlay" id={origJson.data.svgoverlay.smallImg.replace(/\s/g, '')} type="text" defaultValue={origJson.data.svgoverlay.smallImg} placeholder={origJson.data.svgoverlay.smallImg} />
        </label>
        <br/>
        <h5>CTA links</h5>
        {linkInputs}
        <br/>
        <h5>Advanced Option</h5>
        <label htmlFor="__experimentRunning">Experiment Running:
        <select data-instancename='experimentRunning' id="__experimentRunning">
          <option defaultValue={this.state.jsonValue.experimentRunning.toString()}> 
            {this.state.jsonValue.experimentRunning.toString()}
          </option>
          <option defaultValue={(this.state.jsonValue.experimentRunning !== true) ? 'true': 'false'}>
          {(this.state.jsonValue.experimentRunning !== true) ? 'true': 'false'}
          </option>
        </select>
      </label></div>;


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
  elemUpdatedInForm = (e) => {
    this.setState({
      changedDetected: `${e.target.nodeName.toLowerCase()}`,
      markup: e.target.value,
      customName: e.target.dataset.instancename
    }, () => { this.makeChangesJson() });
   // write changes to json
   // https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/
  }
  makeChangesJson() {
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

      if (this.state.targetName === 'background') {
         this.state.jsonValue.data.background.content[this.state.customName] = this.state.markup;
      }

      // svgoverlay Image, SVG, Alt
      if (this.state.targetName === 'svgoverlay') {
          this.state.jsonValue.data.svgoverlay[this.state.customName] = this.state.markup;
        }

      // links - CTA
      if (this.state.customName === 'href') {
        this.state.jsonValue.data.links.content.map((element, index) => {
          return element[this.state.customName]= this.state.markup;
        });
      }
      if (this.state.customName === 'text') {
        //console.log(this.state.customName);
        this.state.jsonValue.data.links.content.map((element, index) => {
         return element[this.state.customName]= this.state.markup;
        });

      }
      this.setState({
        jsonValue: this.state.jsonValue
      });
      this.parseJson();
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
         
          <span className="select-dropdown">
            
              <select onChange={this.parseJson}><option>Select Template</option>
                <option value={this.state.jsonValue.name}>{this.state.jsonValue.name}</option>
              </select>
          </span>
          <div className="SelectForm">
            <Fragment>
              <div className="leftDiv">
              <form 
               onChange={this.elemUpdatedInForm} 
               onKeyUp={this.focusElem}
               onBlur={this.focusElem}
               onClick={this.focusElem}>
                {this.state.elem}
               </form>
              </div>
            </Fragment>
            <PlainJson json={this.state.jsonDataRaw} detect={this.state.changedDetected} markup={this.state.markup} jsonValue={this.state.jsonValue} visibility={this.state.visibility}/>
            </div>
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