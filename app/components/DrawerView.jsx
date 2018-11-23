import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';

export default class DrawerView extends React.Component {
    static defaultProps = {
        open: false
    };

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
                <MenuItem onClick={this._handleFormatClick}>Format</MenuItem>
                <MenuItem onClick={this._handleConfigToolClick}>Config</MenuItem>
                <MenuItem onClick={this._handleAboutClick}>About</MenuItem>
            </Drawer>
        );
    }

    switchDrawer = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _handleConfigToolClick = () => {
        this._handleClose();
        window.location.href = "index.html#/config";
    };

    _handleAboutClick = () => {
        this._handleClose();
        window.location.href = "index.html#/";
    };

    _handleFormatClick = () => {
        this._handleClose();
        window.location.href = "index.html#/format";
    };

    _handleClose = () => this.setState({open: false});

    _handleRequestChange = (op) => {
        this.setState({
            open: op
        });
    }
}
