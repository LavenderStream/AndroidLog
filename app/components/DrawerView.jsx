import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types'

export default class DrawerView extends React.Component {
  static defaultProps = {
    open: false
  }

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <Drawer
              docked={false}
              open={this.state.open}
              onRequestChange={this._handleRequestChange}>
              <MenuItem onClick={this._handleClose}>Logcat</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
       </Drawer>
    );
  }

  switchDrawer = () => {
    this.setState({
      open: !this.state.open
    });
  }

  _handleClose = () => this.setState({open: false});

  _handleRequestChange = (op) => {
    this.setState({
      open: op
    });
  }

}
