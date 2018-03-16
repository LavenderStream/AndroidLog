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
              <MenuItem onClick={this._handleLogCatClick}>Logcat</MenuItem>
              <MenuItem onClick={this._handleAboutClick}>About</MenuItem>
       </Drawer>
    );
  }

  switchDrawer = () => {
    this.setState({
      open: !this.state.open
    });
  }

  _handleLogCatClick = () => {
    this._handleClose();
    window.location.href  = "index.html#/log";

  }

  _handleAboutClick = () => {
    this._handleClose();
    window.location.href  = "index.html#/";
  }

  _handleClose = () => this.setState({open: false});

  _handleRequestChange = (op) => {
    this.setState({
      open: op
    });
  }

}
