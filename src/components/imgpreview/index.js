import React, { Component, Fragment} from 'react';
import DraggableComp from '../draggable_cta';
import MobileToggle from './MobileToggle';

class ImgPreview extends Component {

    constructor(props){
      super(props);
      this.state={
        imgData: this.props.imgData,
        linksText: this.prop,
        elemChange:this.props.elemChange,
        jsonValue : this.props.jsonValue,
        isChecked : this.props,
        brandUpdate: '',
        imgUrl: '',
        positionX: '',
        positionY: '',
        imgNaturalWidth:0,
        imgNaturalHeight:0
      
      };

    }

    componentWillReceiveProps(nextProps) {
      this.setState({imgUrl:nextProps.brandName});
  }

  // Welcome to Prop drilling....
  // We need to get the position X, Y data to update the JSON.
  // The data is coming from Draggable comp. three levels deep
  // Future update to use Contex API

  positionsFromDraggable = (x,y) => {
        this.setState({
          positionX:x,
          positionY:y,
          imgNaturallSize: this.props.imgData.data.background.content.largeImg,
          brandUpdate: this.props.brandName
        })
      // natural width/height values of image to help calc. CTA '%' position
    this.props.parentPositioningCallback(this.state.positionX,this.state.positionY);

    }
    imageLoaded(){
      // Set natural width / Height once image is loaded for desktop
      this.setState({
        imgNaturalWidth:this._image.naturalWidth,
        imgNaturalHeight: this._image.naturalHeight
      })
    }
// componentDidUpdate(){
//   console.log('componentDidUpdate ');
//   console.dir(this.props.dropdownSelected);
// }
    render() {


      const smallSvg = `${this.state.imgUrl}${this.state.imgData.data.svgoverlay.smallImg}`;
      const largeSvg = `${this.state.imgUrl}${this.state.imgData.data.svgoverlay.largeImg}`;
      const smallImg = `${this.state.imgUrl}${this.state.imgData.data.background.content.smallImg}`;
      const largeImg = `${this.state.imgUrl}${this.state.imgData.data.background.content.largeImg}`;
  
      // set context for ref. DOM elem.
      // For more info, see video: https://www.youtube.com/watch?v=VyMziBh4SYM

      let self = this;
      let headerSubmenu = ''
      let linksText = '';
      let dropdownClass = '';
      if(!this.props.dropdownSelected){
        linksText = this.state.imgData.data.links.content;
      }else{
        linksText = this.state.imgData.data.links.content[0].submenu;
        headerSubmenu = this.state.imgData.data.links.content[0].heading.text;
        dropdownClass = 'dropdownCta';
      }


      return (
        <Fragment>
          <div style={{"visibility":`${this.props.visibility}`,"display":`${this.props.display}`}}>
            <MobileToggle imgData={this.state.imgData.data} imgUrl={this.state.imgUrl}/>
            <div className="imgPreview" >
              <div className="mkt-image">
                <picture>
                  <source media="(max-width:767px)" srcSet={smallImg} />
                    <img alt={this.state.imgData.data.background.content.altText} src={largeImg}
                      //  Getting a reference to the image as DOM elem to calc. width/height for boundaries of draggable CTA
                       ref={
                          function(el){
                            self._image = el;
                          }
                        }
                      onLoad={this.imageLoaded.bind(this)}
                    />
                  </picture>
                </div>
                <div className="absolute leftTop">
                <DraggableComp
                 desktopStyles={this.state.imgData.data.links.style.desktop}
                 parentPositioningFromDraggbleCallback={this.positionsFromDraggable.bind(this)}
                 imgNaturalWidth={this.state.imgNaturalWidth}
                 imgNaturalHeight={this.state.imgNaturalHeight}>
                   <div className={dropdownClass}>
                     { (headerSubmenu.length > 0) ? headerSubmenu : ''}
                      <ul>
                        {/* 
                          1. get the name of text link from here: this.state.imgData.data.links.content
                          2. create array and output
                          3. if dropdown true - convert
                          
                        */}
                          {linksText.map((item, index) => {
                            return(<li className="cta_children ml-2 pt-0 pb-1" key={index}>{item.text}</li>);
                          })}
                      </ul>
                   </div>
                  </DraggableComp>
                  <picture>
                    <source media="(max-width: 767px)" srcSet={smallSvg}/>
                    <img src={largeSvg} alt={this.state.imgData.data.svgoverlay.altText}/>
                  </picture>
                </div>
              </div>
            </div>
          </Fragment>

        );
      }
  }

  export default ImgPreview;
