import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const devices = window.require('./app/local/Devices.js');

export default class Logcat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      devices: []
    };
  }

  componentWillMount() {
    devices.findDevices(this.handleDevices);
  }

  handleDevices = (dev) => {
    this.setState({devices: dev});
  };

  handleChange = (event, index, value) => this.setState({value: value});

  render() {
    let pidItemViews = [];
    for (let i = 0; i < this.state.devices.length; i++) {
      pidItemViews.push(<MenuItem key={i} value={i} primaryText={this.state.devices[i].model + " : " + this.state.devices[i].name}/>);
    }

    return (<div>
      {process.versions.node}
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            {pidItemViews}
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text="Options"/>
          <FontIcon className="muidocs-icon-custom-sort"/>
          <ToolbarSeparator/>
          <RaisedButton label="Create Broadcast" primary={true}/>
          <IconMenu iconButtonElement={<IconButton touch = {
              true
            } > <NavigationExpandMoreIcon/></IconButton>}>
            <MenuItem primaryText="Download"/>
            <MenuItem primaryText="More Info"/>
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    </div>);
  }

}
