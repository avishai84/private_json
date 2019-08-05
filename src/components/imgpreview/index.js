import React, { Component, Fragment} from 'react';
import DraggableComp from '../draggable_cta';

const imgWidth = (brandNamePrefix, desktopImgPath) =>{
  // console.log(img);
  // create new image
  let new_img = new Image();
  const src =  brandNamePrefix+desktopImgPath;
  new_img.src = src;
  console.log(new_img);
  console.log(src);
 };
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
        imgUrl: 'https://www.gol.wip.gidapps.com',
        positionX: '',
        positionY: '',
        imgNaturallSize:''
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
          imgNaturallSize: this.props.imgData.data.background.content.largeImg
        })
      this.props.parentPositioningCallback(this.state.positionX,this.state.positionY, this.state.imgNaturallSize);
     

      imgWidth(this.state.brandUpdate, this.state.imgNaturallSize);
    }

    render() {


      const smallSvg = `${this.state.imgUrl}${this.state.imgData.data.svgoverlay.smallImg}`;
      const largeSvg = `${this.state.imgUrl}${this.state.imgData.data.svgoverlay.largeImg}`;
      const smallImg = `${this.state.imgUrl}${this.state.imgData.data.background.content.smallImg}`;
      const largeImg = `${this.state.imgUrl}${this.state.imgData.data.background.content.largeImg}`;
       console.log('ImgPreview ',this.props);
       console.log('Brand: '+ this.state.brandUpdate);
      return (
        <Fragment>
          <div style={{"visibility":`${this.props.visibility}`}}>
            <div className="imgPreview" >
              <div className="mkt-image">
                <picture>
                  <source media="(max-width:767px)" srcSet={smallImg} />
                    <img alt={this.state.imgData.data.background.content.altText} src={largeImg}/>
                  </picture>
                </div>
                <div className="absolute leftTop foo">
                <DraggableComp
                 desktopStyles={this.state.imgData.data.links.style.desktop}
                 parentPositioningFromDraggbleCallback={this.positionsFromDraggable.bind(this)}>
                    <div >{this.state.imgData.data.links.content[0].text}</div>
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
