import React, { Component, Fragment} from 'react';
import DraggableComp from '../draggable_cta';
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
        imgUrl: 'https://www.gol.wip.gidapps.com'
      };
    }

    componentWillReceiveProps(nextProps) {
      this.setState({imgUrl:nextProps.brandName});
  }

    render() {

      const smallSvg = `${this.state.imgUrl}${this.state.imgData.data.svgoverlay.smallImg}`;
      const largeSvg = `${this.state.imgUrl}${this.state.imgData.data.svgoverlay.largeImg}`;
      const smallImg = `${this.state.imgUrl}${this.state.imgData.data.background.content.smallImg}`;
      const largeImg = `${this.state.imgUrl}${this.state.imgData.data.background.content.largeImg}`;
 
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
                <div className="absolute leftTop">
                <DraggableComp link={this.state.jsonValue}>Hi H</DraggableComp>
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
