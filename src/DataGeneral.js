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
	      <small style={{ "fontSize": "12px", "color": "orange" }}>{ this.props.name}</small>
			  <small style={{ "fontSize": "12px", "color": "red" }}>{ this.props.list}</small>
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
      clicked: ''
      //Object.entries(this.props)
      // 
    };

  }

  render() {

    //const jsonView = (this.state.jsonValue != '') ? `${this.state.jsonStringify}` : 'Nothing to show';
    //let jsonView = JSON.stringify(this.state.jsonValue, null, 2);
    // console.log(`value json now: ${JSON.stringify(this.state.jsonValue)}`);

    //remove first open bracket and last
    /* 
     function s(e) {
            Object.keys(e).forEach(a),
            window.localStorage.setItem(l, JSON.stringify(e))
        }
    */

    return (
      <div className="rightDiv">
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
      targetName: ''
    }
    this.parseJson = this.parseJson.bind(this);
    this.toUpdate = this.toUpdate.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this.elemUpdatedInForm = this.elemUpdatedInForm.bind(this);
    this.setJsonBrand = this.setJsonBrand.bind(this);
    this.focusElem = this.focusElem.bind(this);

  }

  // Create HTML template from json
  parseJson() {

    const origJson = json;
    let jsonNew = this.state.jsonValue;
    console.log(origJson);

    let ctaLinksArray = origJson.data.links.content;
    let linkInputs = ctaLinksArray.map((item, index) => {
      return (`<br> <label htmlFor="text-input-ctaText_${index}">
    ${item.text}: 
    <input data-instanceName="text" id="text-input-ctaText_${index}" placeholder=${item.text} value="${item.text}"/>
    </label>
    <label htmlFor="text-input-ctaLink_${index}" >
    href: 
    <input data-instanceName="href" id="text-input-ctaLink_${index}" placeholder=${item.href} value=${item.href} />
    </label>`);
    });
    let instanceHtml = '';

    instanceHtml = `
        <label htmlFor="text-input_${origJson.instanceDesc.replace(/\s/g, '')}">instanceDesc:
        <input data-instanceName='instanceDesc' id="text-input_${origJson.instanceDesc.replace(/\s/g, '')}" type="text" value=${jsonNew.instanceDesc} placeholder="${origJson.instanceDesc}" />
      </label>
      <br>
      <label htmlFor="text-input_${origJson.experimentRunning}">experimentRunning:
        <select data-instanceName='experimentRunning' id="text-input_${origJson.experimentRunning}">
          <option defaultValue="${jsonNew.experimentRunning}">${jsonNew.experimentRunning}</option>
          <option value="${!jsonNew.experimentRunning}">${!jsonNew.experimentRunning}</option>
        </select>
      </label>
      <br>
      <h5>background properties</h5>
      <label htmlFor="text-input_${origJson.data.background.content.altText.replace(/\s/g, '')}">background altText:
        <input data-instanceName='altText' name="background" id="text-input_${origJson.data.background.content.altText.replace(/\s/g, '')}" type="text" value=${jsonNew.data.background.content.altText} placeholder="${origJson.data.background.content.altText}" />
      </label>
      <br>
      <label htmlFor="text-input_${origJson.data.background.content.largeImg.replace(/\s/g, '')}">background largeImg:
        <input data-instanceName='largeImg' name="background" id="text-input_${origJson.data.background.content.largeImg.replace(/\s/g, '')}" type="text" value=${jsonNew.data.background.content.largeImg} placeholder="${origJson.data.background.content.largeImg}" />
      </label>
      <br>
      <label htmlFor="text-input_${origJson.data.background.content.smallImg.replace(/\s/g, '')}">background smallImg:
        <input data-instanceName='smallImg' name="background" id="text-input_${origJson.data.background.content.smallImg.replace(/\s/g, '')}" type="text" value=${jsonNew.data.background.content.smallImg} placeholder="${origJson.data.background.content.smallImg}" />
      </label>
      <br>
      <h5>svgoverlay properties</h5>
      <label htmlFor="text-input_${origJson.data.svgoverlay.altText.replace(/\s/g, '')}">svgoverlay altText:
        <input data-instanceName='altText' name="svgoverlay" id="text-input_${origJson.data.svgoverlay.altText.replace(/\s/g, '')}" type="text" value=${jsonNew.data.svgoverlay.altText} placeholder="${origJson.data.svgoverlay.altText}" />
      </label>
      <br>
      <label htmlFor="text-input_${origJson.data.svgoverlay.largeImg.replace(/\s/g, '')}">svgoverlay largeImg:
        <input data-instanceName='largeImg' name="svgoverlay" id="text-input_${origJson.data.svgoverlay.largeImg.replace(/\s/g, '')}" type="text" value=${jsonNew.data.svgoverlay.largeImg} placeholder="${origJson.data.svgoverlay.largeImg}" />
      </label>
      <br>
      <label htmlFor="text-input_${origJson.data.svgoverlay.smallImg.replace(/\s/g, '')}">svgoverlay smallImg:
        <input data-instanceName='smallImg' name="svgoverlay" id="text-input_${origJson.data.svgoverlay.smallImg.replace(/\s/g, '')}" type="text" value=${jsonNew.data.svgoverlay.smallImg} placeholder="${origJson.data.svgoverlay.smallImg}" />
      </label>
      <br>
      <h5>CTA links</h5>
      ${linkInputs}
    `;
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
    //console.dir(e.target.dataset.instancename);
    this.setState({
      changedDetected: `${e.target.nodeName.toLowerCase()}`,
      markup: e.target.value,
      customName: e.target.dataset.instancename
    });

    // write changes to json
    this.makeChangesJson();
  }
  makeChangesJson() {
    const deepChange = this.state.jsonValue;
    setTimeout(() => {
      // changing json new value
      let currentChange = this.state.jsonValue[this.state.customName];
      //console.log(`1: ${currentChange}`);
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
        if (deepChange.data.background.content[this.state.customName]) {
          deepChange.data.background.content[this.state.customName] = this.state.markup;
        }
      }
      // svgoverlay Image, SVG, Alt
      if (this.state.targetName === 'svgoverlay') {
        if (deepChange.data.svgoverlay[this.state.customName]) {
          deepChange.data.svgoverlay[this.state.customName] = this.state.markup;
        }

      }
      // links - CTA
      console.log(this.state.targetName);
      if (this.state.targetName === 'href') {
        console.log(this.state.targetName);
      }
      if (this.state.targetName === 'text') {
        console.log(this.state.targetName);
      }

      //jsonNew.data.background.content.altText

      // console.log(`${JSON.stringify(this.state.jsonValue)[this.state.customName]} ${this.state.customName}`);
      // console.log('Changed instance '+this.state.changedDetected +' to ' + this.state.markup + ' ' +currentChange);

      let theUpdatedJson = this.state.jsonValue;

      //console.log(theUpdatedJson);
      this.setState({
        jsonValue: theUpdatedJson
      });
      // console.log(this.state.jsonValue);

      this.parseJson();
    }, 2000);
  }

  setJsonBrand() {
    // selected dropdown json
    this.setState({
      jsonValue: json
    })
  }
  focusElem(e) {
    // this fn helps identify which elem. we are changing
    this.setState({
      targetName: e.target.name
    })
  }
  render() {
    //changeName += `${this.state.changedDetected} ${this.state.markup}`;

    return(<Fragment>
        <div className = "DataGeneral">
        <p>JSON will show here</p>  
        <select onChange = {
          this.parseJson
        } >
        <option defaultValue>JSON Modules</option> 
        <option onSelect = {
        this.setJsonBrand
      }
      value = "empty" > SVGOverlay </option> 
      <option value = "empty">future jsons</option> 
      <option value = "empty">future jsons</option> 
      <option value = "empty" >future jsons</option> 
      </select >
      <br/>
        <Fragment >
        <form style = {
          {
            "display": "flex"
          }
        }
      onInput = {
        this.elemUpdatedInForm
      }
      onFocus = {
          this.focusElem
        }>
        <div dangerouslySetInnerHTML = {
          this.createMarkup()
        }/>
         </form >
        </Fragment> 
        <PlainJson json = {
        this.state.jsonDataRaw
      }detect = {
        this.state.changedDetected
      }markup = {
        this.state.markup
      }jsonValue = {
        this.state.jsonValue
      }/> 
      </div> 
      <div >
        <h6>Last Change</h6> 
        <ListItem name = {
        this.state.changedDetected
      }
      list = {
        this.state.markup
      }/>
       </div>
    </Fragment>
    );
  }
}

export default DataGeneral;