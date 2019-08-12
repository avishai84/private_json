import React, {Component, Fragment} from 'react';
import { create } from 'istanbul-reports';
import { SSL_OP_NETSCAPE_CA_DN_BUG } from 'constants';
const newArr = [];

class OptionCTA extends Component {

    constructor(props){
        super(props);
        this.state={
            json: this.props.jsonOption.content,
            ctaNum : 0,
            ctaContent: 'No Added CTA Yet.',
            isDropdown: false,
            ctaArr : 0,
            lengthCtaArr : this.props.jsonOption.content.length,
            ctaCount : 0,
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('nextState: '+nextState.isDropdown?true:false);
    //     console.log('nextState: '+nextProps.isDropdown?true:false);
    // }
    componentWillReceiveProps(nextProps) {
        console.log('nextProps: '+nextProps.newArr);
       // this.setState({ctaContent: nextProps.newArr});
    }

    addingCta(e){
        // adding a duplicate of the array from this.props.jsonOption.content
        e.preventDefault();

        console.log('this.state.ctaCount: '+ this.state.ctaCount);

           const linkInputs = this.props.jsonOption.content.map((item, index) => {
            return (
            <div key={'added_Cta'+this.state.ctaCount}><label key={"key_Text"+this.state.ctaCount} htmlFor={"text-input-ctaText_"+this.state.ctaCount}>Text:<input data-instancename="text" id={"text-input-ctaText_"+this.state.ctaCount} name="text" placeholder={item.text} type="text" defaultValue={item.text}/></label><label key={"key__href"+this.state.ctaCount} htmlFor={"text-input-ctaLink_"+this.state.ctaCount}>Link:<input data-instancename="href" id={"text-input-ctaLink_"+this.state.ctaCount} name="href" placeholder={item.href} type="text" defaultValue={item.href} /></label></div>);
          });
          for(let i=0; i < this.state.ctaCount; i++){
            newArr.push(linkInputs)
         };

   

       this.setState({
        ctaCount: this.state.ctaCount + 1,
        ctaContent: newArr,
       })

       this.props.addCtaArr(this.state.ctaCount, this.state.ctaContent);





        // let linkInputs = this.state.json.map((item, ctaArr) => {
        //     return();
        // });



    }





    removingCta(e){
        //console.log('removingCta before ' + this.state.ctaCount );
         let ctaCurrNum = this.state.ctaNum;
        // const newArr = [this.props.jsonOption.content];
        e.preventDefault();


       this.setState({
        ctaNum : (ctaCurrNum === 0 ) ? ctaCurrNum : ctaCurrNum - 1,
        // json: newArr.pop(),
        ctaCount: (this.state.ctaCount !== 0 ) ? this.state.ctaCount - 1 : this.state.ctaCount,
        ctaContent: newArr.pop(),
       })
       this.props.addCtaArr(this.state.ctaCount, this.state.ctaContent);
    }


    handleFormChange(){
       // console.log('change detected!');
    }

    dropdownSelected(e){
       // console.log(this.state.isDropdown );
        this.setState({
            isDropdown: !this.state.isDropdown 
        })
    }




render(){
    //console.log('this.state.ctaCount ' + this.state.ctaCount );
   // console.log('newArr ' + newArr );
const pluralS = (this.state.ctaCount > 1) ? `S: `: ':';

    return(
        <Fragment>
            <div className="addCta" style={{"visibility":`${this.props.visibility}`}}>
                <label htmlFor="checkbox_dropdown">
                    <input className="p-3" type="checkbox" defaultValue={this.state.isDropdown} onChange={this.dropdownSelected.bind(this)} id="checkbox_dropdown"/>
                    <span className="p-1">Create Dropdown</span>
                </label>
                {(this.state.ctaCount >= 1)? <button type="button" className="text-uppercase m-1 btn btn-danger" onClick={this.removingCta.bind(this)}>remove cta</button> :''}
                <button type="button" className="text-uppercase m-1 btn btn-primary" onClick={this.addingCta.bind(this)}>add cta</button>
                <div className="ctas">
                    {`Number of CTA${pluralS} ${this.state.ctaCount}`}
                    <Fragment>
                        <div className="inputElems" onChange={this.handleFormChange.bind(this)}>
                            {this.state.ctaContent}
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

};

export default OptionCTA;