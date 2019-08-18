import React, {Component, Fragment} from 'react';
const newArr = [];

class OptionCTA extends Component {

    constructor(props){
        super(props);
        this.state={
            json: this.props.jsonOption.content,
            ctaContent: newArr,
            isDropdown: false,
            ctaCount : 1,
        }
    }

     async addingCta(e){
        // adding a duplicate of the array from this.props.jsonOption.content
        e.preventDefault();
            const linkInputs = this.state.json.map((item, index) => {
                return (
                <div key={'added_Cta'+this.state.ctaCount}><label key={"key_Text"+this.state.ctaCount} htmlFor={"special_addedCTA_"+this.state.ctaCount}>Text:<input data-added_cta="textAdded" id={"special_addedCTA_"+this.state.ctaCount} name="text" placeholder={item.text} type="text" defaultValue={item.text}/></label><label key={"key__href"+this.state.ctaCount} htmlFor={"slinks_isuniques_"+this.state.ctaCount}>Link:<input data-added_cta="hrefAdded" id={"slinks_isuniques_"+this.state.ctaCount} name="href" placeholder={item.href} type="text" defaultValue={item.href} /></label></div>);
              });
             // convert array to object to prevent deep nesting inside the new array.
            const linkInputsObj = Object.assign({}, ...linkInputs);
              newArr.push(linkInputsObj);
            await this.setState({
                ctaCount: this.state.ctaCount + 1,
                ctaContent: newArr
            })
            this.props.addCtaArr(this.state.ctaContent, this.state.ctaCount);
     }

async removingCta(e) {
    e.preventDefault();
    // remove last in the array of inputs
    newArr.pop();
    await this.setState({
        ctaCount: this.state.ctaCount - 1,
        ctaContent: newArr,
        ctaArr: newArr.length
    });
    // callback to pass on data
    this.props.rmvCtaArr(this.state.ctaContent, this.state.ctaCount)
}

    dropdownSelected(e) {
        this.setState({
            isDropdown: !this.state.isDropdown
        }, this.props.dropdownSelected(e, this.state.isDropdown))
    }
    // pass to content input value for dropdown header
    handleHeaderInputDropdownChange(e) {
        this.props.handleHeaderInputDropdownChange(e);
    }
render(){

    const pluralS = (this.state.ctaCount >= 3) ? `S `: '';

    return(
        <Fragment> 
            <div className="addCta" style={{"visibility":`${this.props.visibility}`}}>
                <label htmlFor="checkbox_dropdown">
                    <input className="p-3" type="checkbox" defaultValue={this.state.isDropdown} onChange={this.dropdownSelected.bind(this)} id="checkbox_dropdown"/>
                    <span className="p-1">Create Dropdown</span>
                </label>
                {/* Dropdown heading text */}
                {this.state.isDropdown ? <label htmlFor="heading_text_dropdown">
                    <span className="p-1">Header Text</span>
                    <input key="heading_text_dropdown100" className="p-1" type="text" defaultValue='header text' id="heading_text_dropdown" placeholder="header text" onChange={this.handleHeaderInputDropdownChange.bind(this)}/>
                    </label>: ''}
                <div className="d-flex">
                    {(this.state.ctaCount >= 2)? <button type="button" className="text-uppercase m-1 btn btn-danger" onClick={this.removingCta.bind(this)}>remove cta</button> : <button type="button" className="text-uppercase m-1 btn btn-danger" disabled>remove cta</button>}
                    <button type="button" className="text-uppercase m-1 btn btn-primary" onClick={this.addingCta.bind(this)}>add cta</button>
                    <div className="ctas">
                        <p>{(this.state.ctaCount >= 2)? `Added CTA${pluralS}: ${this.state.ctaCount - 1}. Total: ${this.state.ctaCount}`:''}</p>
                    </div>
                </div>
                {/* Additional inputs will apear in this div */}
                {/* onChange={this.handleFormChange.bind(this)} */}
                <Fragment>
                    <div className="inputElems" >
                        {this.state.ctaContent}
                    </div>
                </Fragment>
            </div>
        </Fragment>
    );
};

};

export default OptionCTA;