import React, { Component, Fragment} from 'react';
class ImgPreview extends Component {
    constructor(props){
      super(props);
      this.state={
        svg: this.props.svg,
        img: this.props.img,
        linksText: this.prop,
        elemChange:this.props.elemChange
      };
    }
  
  
    render() {
      const smallSvg = `https://www.gol.wip.gidapps.com${this.state.svg.smallImg}`;
      const largeSvg = `https://www.gol.wip.gidapps.com${this.state.svg.largeImg}`;
      const smallImg = `https://www.gol.wip.gidapps.com${this.state.img.smallImg}`;
      const largeImg = `https://www.gol.wip.gidapps.com${this.state.img.largeImg}`;
      const href =this.props.linksText[0].href;
      const text = this.props.linksText[0].text;
      
  
      return ( 
        <Fragment>
          <div className="imgPreview" style={{"visibility":`${this.props.visibility}`}}>
            <div className="mkt-image">
              <picture>
                <source media="(max-width:767px)" srcSet={smallImg} />
                  <img alt={this.state.img.altText} src={largeImg}/>
                </picture>
              </div>
              <div className="absolute leftTop">
                <picture>
                  <source media="(max-width: 767px)" srcSet={smallSvg}/>
                  <img src={largeSvg} alt={this.state.svg.altText}/>
                </picture>
              </div>  
             </div>
          </Fragment>
  
        );
      }
  }

  export default ImgPreview;