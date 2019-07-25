import React, {Component, Fragment} from 'react';


class ListItem extends Component {
  render() {
    return (
      <Fragment>
	      <small style={{ "fontSize": "12px", "color": "orange" }}>{this.props.customName} {this.props.name}</small>&nbsp;
			  <small style={{ "fontSize": "12px", "color": "red" }}>{this.props.list}</small>
			</Fragment>
    );
  }
}

export default ListItem;
