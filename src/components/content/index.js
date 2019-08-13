import React, {Component, Fragment} from 'react';
import brand from '../../marketing_json/brands.json';
import jsonData from '../../marketing_json/svgOverlay.json';
import ImgPreview from '../imgpreview'
import ListItem from '../listitem';
import PlainJson from '../plainjson';
import OptionCTA from './OptionCTA';

const updatedCTAObjFromOptionCTA = {};

let json = JSON.parse(JSON.stringify(jsonData));

class Content extends Component {
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
      visibility:'hidden',
      brand: brand,
      brandName: brand, // 'https://www.gol.wip.gidapps.com',
      positionX: '',
      positionY: '',
      ctaAddedContentArr : '',
      updatedCTAObjFromOptionCTAState:''
    }

    this.parseJson = this.parseJson.bind(this);
    this.toUpdate = this.toUpdate.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this.elemUpdatedInForm = this.elemUpdatedInForm.bind(this);
    this.focusElem = this.focusElem.bind(this);
    this.handleBrand = this.handleBrand.bind(this);
  }
  // Create HTML template from json
  parseJson() {
    const origJson = json;
    let jsonNew = this.state.jsonValue;
    let ctaLinksArray = origJson.data.links.content;
    let linkInputs = ctaLinksArray.map((item, index) => {
      return (
      <div key={index}><label key={"key_Text"+index} htmlFor={"text-input-ctaText_"+index}>Text:<input data-instancename="text" id={"text-input-ctaText_"+index} name="text" placeholder={item.text} type="text" defaultValue={item.text}/></label><label key={"key__href"+index} htmlFor={"text-input-ctaLink_"+index}>Link:<input data-instancename="href" id={"text-input-ctaLink_"+index} name="href" placeholder={item.href} type="text" defaultValue={item.href} /></label></div>);
    });

    // This is the object we create all input fieds to change the json text 
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

  handleBrand(e){
    this.setState({
      brandName: e.target.value
    })
  }

// Welcome to Prop drilling....
// We need to get the position X, Y data to update the JSON.
// The data is coming from Draggable comp. three levels deep
// Future update to use Contex API

callbackPositionFunction = (x,y) => {
    this.setState({
      positionX: x,
      positionY:y
     
    });
    // update json with new positions
    this.state.jsonValue.data.linksContainerStyle.desktop.left = this.state.positionX;
    this.state.jsonValue.data.linksContainerStyle.desktop.top = this.state.positionY;
    this.setState({
      jsonValue: this.state.jsonValue
    });
    this.parseJson();
  }

  // update the CTA object in JSON - this call is originating from OptionCTA component

  async addCtaArr(ctaContentArr){
   await this.setState({
      ctaAddedContentArr: ctaContentArr
      //updateCTA: this.state.jsonValue.data.links.content.push(this.state.ctaAddedContentArr.props.children) 
    });

    this.updateCTA_from_OptionCTA();

  }
  async rmvCtaArr(ctaContentArr){
    await this.setState({
      ctaAddedContentArr: ctaContentArr
    });
    this.removeCTA_from_OptionCTA();
  }

  //componentDidUpdate(){}
  removeCTA_from_OptionCTA(){

    this.state.jsonValue.data.links.content.pop();
    
    
    this.setState({
      updatedCTAObjFromOptionCTAState: updatedCTAObjFromOptionCTA,
      jsonValue: this.state.jsonValue
     });
     this.parseJson();


  }
  updateCTA_from_OptionCTA(){
    /*
        1. Creating a new object from added CTAs and appeding it to the jsonValue text.
        2. We need to update this.state.jsonValue.data.links.content with the new object
    */ 

    for(let item of this.state.ctaAddedContentArr){
      if(item.hasOwnProperty('props')){
        for(let name of item.props.children){
          if(item.hasOwnProperty('props')){
            for(let content of name.props.children){
              if(content !== 'undefined'){
                if(content.hasOwnProperty('props')){
                  if(content.props.hasOwnProperty('defaultValue')){
                    // Assigning new properties inside the object
                    if(content.props.name === 'text'){
                        updatedCTAObjFromOptionCTA.text = content.props.defaultValue;
                      }
                    if(content.props.name === 'href'){
                        updatedCTAObjFromOptionCTA.href = content.props.defaultValue;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
     // Check if both "text" and "href" properties are updatedCTAObjFromOptionCTA object 
    if(updatedCTAObjFromOptionCTA.hasOwnProperty('text') && updatedCTAObjFromOptionCTA.hasOwnProperty('href')){

    // update state with new object
    this.setState({
      updatedCTAObjFromOptionCTAState: updatedCTAObjFromOptionCTA
    });
    // pushi new CTA objectinto array and update state on jsonValue. (This is the string json on the right)
     this.state.jsonValue.data.links.content.push(this.state.updatedCTAObjFromOptionCTAState);
    this.setState({
     jsonValue: this.state.jsonValue
    });
    this.parseJson();

    }
  }

  render() {  



   // console.dir(this.state.markup);
   //console.dir(this.state.ctaAddedContentArr);
   //console.log(JSON.stringify(this.state.ctaAddedContentArr));


  return(
      <Fragment>
        <div className="DataGeneral" >
          <h1>{this.state.message}</h1>
        <span className="select-dropdown">
              <select onChange={this.handleBrand}>
                <option>Select Brand</option>
                {Object.entries(this.state.brand.brand[0]).map((name, index) => {
                  return <option key={'brand_'+index} value={name[1]}>{name[0]}</option>;
                })}
              </select>
          </span>
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
                {/* Option CTA component for advanced settings */}
                <OptionCTA visibility={this.state.visibility} jsonOption={this.state.jsonValue.data.links} addCtaArr={this.addCtaArr.bind(this)} rmvCtaArr={this.rmvCtaArr.bind(this)}/>

               </form>
              </div>
            </Fragment>
           <Fragment>
            <div className="rightDiv">

              <ImgPreview 
                imgData={this.state.jsonValue} 
                visibility={this.state.visibility} 
                brandName={this.state.brandName} 
                parentPositioningCallback = {this.callbackPositionFunction.bind(this)}
                ><p> {this.state.positionX} </p><p> {this.state.positionY} </p></ImgPreview>

              <PlainJson
                json={this.state.jsonDataRaw}
                detect={this.state.changedDetected}
                markup={this.state.markup}
                jsonValue={this.state.jsonValue}
                visibility={this.state.visibility}/>
            </div>
           </Fragment> 
          </div>
        </div>
        <div>
          <h6>Last Change</h6>
          <ListItem 
            name={this.state.changedDetected} 
            list={this.state.markup} 
            customName={this.state.customName} />
        </div>
      </Fragment>
    );

  }
}

export default Content;
