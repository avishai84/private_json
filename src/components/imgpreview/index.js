import React, { Component, Fragment} from 'react';

class ImgPreview extends Component {
    constructor(props){
      super(props);
      this.state={
        imgData: this.props.imgData,
        linksText: this.prop,
        elemChange:this.props.elemChange,
        jsonValue : this.props.jsonValue
      };
    }


    render() {
      console.log(this.props);
      console.log(this.state.imgData);
      const renderImg = () => {
        console.log('rendered');
      };
      const smallSvg = `https://www.gol.wip.gidapps.com/${this.state.imgData.data.svgoverlay.smallImg}`;
      const largeSvg = `https://www.gol.wip.gidapps.com/${this.state.imgData.data.svgoverlay.largeImg}`;
      const smallImg = `https://www.gol.wip.gidapps.com/${this.state.imgData.data.background.content.smallImg}`;
      const largeImg = `https://www.gol.wip.gidapps.com/${this.state.imgData.data.background.content.largeImg}`;
      // const href = this.props.img.data.linksText[0].href;
      // const text = this.props.img.linksText[0].text;
//   console.log(this.state.img.largeImg);
//   console.log(largeImg);
//   console.log(this.state.img.smallImg);
renderImg();

      return (
        <Fragment>
          <div className="imgPreview" style={{"visibility":`${this.props.visibility}`}}>
            <div className="mkt-image">
              <picture>
                <source media="(max-width:767px)" srcSet={smallImg} />
                  <img alt={this.state.imgData.data.background.altText} src={largeImg}/>
                </picture>
              </div>
              <div className="absolute leftTop">
                <picture>
                  <source media="(max-width: 767px)" srcSet={smallSvg}/>
                  <img src={largeSvg} alt={this.state.imgData.data.svgoverlay.altText}/>
                </picture>
              </div>
             </div>
          </Fragment>

        );
      }
  }

  export default ImgPreview;
