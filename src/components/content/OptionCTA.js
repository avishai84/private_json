import React, {Component, Fragment} from 'react';
const newArr = [];

class OptionCTA extends Component {

    constructor(props){
        super(props);
        this.state={
            json: this.props.jsonOption.content,
            ctaNum : 0,
            ctaContent: newArr,
            isDropdown: false,
            ctaArr : newArr.length,
            lengthCtaArr : this.props.jsonOption.content.length,
            ctaCount : 1,
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('nextState: '+nextState.isDropdown?true:false);
    //     console.log('nextState: '+nextProps.isDropdown?true:false);
    // }
    // componentWillReceiveProps(nextProps) {
    //    // console.log('nextProps: '+nextProps.newArr);
    //    // this.setState({ctaContent: nextProps.newArr});
    // }
    // componentWillRecieveProps(newProps) 
    // { 
    //     if (this.props !== newProps) { 
    //         console.log(" New Props have been assigned "); 
    //         // Use this.setState() to rerender the page. 
    //     } 
    // } 




     async addingCta(e){
        // adding a duplicate of the array from this.props.jsonOption.content
        e.preventDefault();
       
            const linkInputs = this.state.json.map((item, index) => {
                return (
                <div key={'added_Cta'+this.state.ctaCount}><label key={"key_Text"+this.state.ctaCount} htmlFor={"text-input-ctaText_"+this.state.ctaCount}>Text:<input data-instancename="text" id={"text-input-ctaText_"+this.state.ctaCount} name="text" placeholder={item.text} type="text" defaultValue={item.text}/></label><label key={"key__href"+this.state.ctaCount} htmlFor={"text-input-ctaLink_"+this.state.ctaCount}>Link:<input data-instancename="href" id={"text-input-ctaLink_"+this.state.ctaCount} name="href" placeholder={item.href} type="text" defaultValue={item.href} /></label></div>);
              });
             // convert array to object to prevent deep nesting
              const linkInputsObj = Object.assign({}, ...linkInputs);
              newArr.push(linkInputsObj);

            await this.setState({
                ctaCount: this.state.ctaCount + 1,
                ctaContent: newArr
            })
        this.props.addCtaArr(this.state.ctaCount, this.state.ctaContent);

     }





   async removingCta(e){
        //console.log('removingCta before ' + this.state.ctaCount );
        // let ctaCurrNum = this.state.ctaNum;
        // const newArr = [this.props.jsonOption.content];
        e.preventDefault();

        console.log(newArr);
        newArr.pop();
     await this.setState({
        //ctaNum : (ctaCurrNum === 0 ) ? ctaCurrNum : ctaCurrNum - 1,
        // json: newArr.pop(),
        ctaCount: this.state.ctaCount - 1, //(this.state.ctaCount !== 0 ) ? this.state.ctaCount - 1 : this.state.ctaCount,
         ctaContent: newArr,
         ctaArr : newArr.length
       })


       //console.log('this.state.ctaContent: '+this.state.ctaContent);
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


    // componentDidUpdate(){
    //     alert('rendered');
 
    // } 


render(){
    //console.log('this.state.ctaCount ' + this.state.ctaCount );
   // console.log('newArr ' + newArr );
const pluralS = (this.state.ctaCount > 1) ? `S: `: ':';
//onsole.log('ctaArr array length '+ this.state.ctaArr );
    return(
        <Fragment> 
            <div className="addCta" style={{"visibility":`${this.props.visibility}`}}>
                <label htmlFor="checkbox_dropdown">
                    <input className="p-3" type="checkbox" defaultValue={this.state.isDropdown} onChange={this.dropdownSelected.bind(this)} id="checkbox_dropdown"/>
                    <span className="p-1">Create Dropdown</span>
                </label>
                <div className="d-flex">
                    {(this.state.ctaCount >= 2)? <button type="button" className="text-uppercase m-1 btn btn-danger" onClick={this.removingCta.bind(this)}>remove cta</button> : <button type="button" className="text-uppercase m-1 btn btn-danger" disabled>remove cta</button>}
                    <button type="button" className="text-uppercase m-1 btn btn-primary" onClick={this.addingCta.bind(this)}>add cta</button>
                    <div className="ctas">
                        {`Number of ${this.state.ctaCount - 1} CTA${pluralS}`}
                    </div>
                </div>
                    <Fragment>
                        <div className="inputElems" onChange={this.handleFormChange.bind(this)}>
                            {this.state.ctaContent}
                        </div>
                    </Fragment>
                </div>
           
        </Fragment>
    );
};

};

export default OptionCTA;