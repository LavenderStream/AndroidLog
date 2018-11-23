import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const devices = window.require('./app/local/Devices.js');
const config = window.require('./app/local/Config.js');

const styles = {
    toolLayout: {
        marginTop: 12
    },
    toolButton: {
        margin: 12
    },
    snackbar: {}
};

export default class Config extends React.Component {

    static defaultProps = {
        autoHideDuration: 5000
    };

    constructor(props) {
        super(props);
        this.state = {
            configRobot: "",
            configHost: "",
            configStomp: "",
            dialogEdit: false,
            snackMessage: "",
            catMessage: '',
            snackbar: false,
            dialog: false,
            disable: false,
            // Devices index
            value: 0,
            devices: [],
            timer: {}
        };
    }

    componentWillMount() {
        devices.findDevices(this.handleDevices);
        this.state.timer = setInterval(() => {
            devices.findDevices(this.handleDevices);
        }, 5000);
    }

    componentWillUnmount() {
        if (this.state.timer != null) {
            clearInterval(this.state.timer);
        }
    }

    handleDevices = (dev) => {
        this._handleDisableBtn(dev.length);
        this.setState({devices: dev});
    };

    handleChange = (event, index, value) => this.setState({value: value});

    _handleDisableBtn = (count) => {
        this.setState({disable: count === 0});
    };

    _handleClickCatBtn = () => {
        config.cat((e) => {
            this.setState({catMessage: e});
            this._handleCatDialogOpen();
        });
    };

    _handleClickPushBtn = () => {
        config.push(this.state.devices[this.state.value], (err, out) => {
            console.log(err);

            let msg = err ? "跪了" : out.toString().split(":")[0];
            this.setState({
                snackMessage: msg
            });
            this.setState({
                snackbar: true
            });
        });
    };

    _handleClickLogBtn = () => {
        config.log(this.state.devices[this.state.value], this._handleShowSnakeBar);
    };

    _handleCatDialogOpen = () => {
        this.setState({dialog: true});
    };

    _handleCatDialogClose = () => {
        this.setState({dialog: false});
    };

    _handleEditDialogOpen = () => {
        this.setState({dialogEdit: true});
    };


    _handleEditDialogClose = () => {
        this.setState({dialogEdit: false});
    };

    _handleActionClose = () => {
        this.setState({
            snackbar: false,
        });
    };

    _handleRequestClose = () => {
        this.setState({
            snackbar: false,
        });
    };

    _handleSaveConfig = () => {
        this._handleEditDialogClose();
        config.edit(this.state.devices[this.state.value],
            this.state.configRobot,
            this.state.configHost,
            this.state.configStomp,
            this._handleShowSnakeBar
        );
    };

    _handleRobotId = (e, v) => {
        this.setState({
            configRobot: v,
        });
    };

    _handleStomp = (e, v) => {
        this.setState({
            configStomp: v,
        });
    };

    _handleHost = (e, v) => {
        this.setState({
            configHost: v,
        });
    };

    _handleShowSnakeBar = (err, out) => {
        console.log(err);

        let msg = err ? "跪了" : "可以了";
        this.setState({
            snackMessage: msg
        });
        this.setState({
            snackbar: true
        });
    };

    render() {
        let devicesItemViews = [];
        for (let i = 0; i < this.state.devices.length; i++) {
            let itemText = this.state.devices[i].name + "-" + this.state.devices[i].id;
            devicesItemViews.push(<Toolbar key={i}>
                <ToolbarGroup
                    key={i}
                    firstChild={true}>
                    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                        <MenuItem key={i}
                                  value={i}
                                  primaryText={itemText}/>
                    </DropDownMenu>
                </ToolbarGroup>
            </Toolbar>);
        }

        const actions = [
            <FlatButton
                label="存了"
                primary={true}
                keyboardFocused={true}
                onClick={this._handleSaveConfig}
            />,
        ];


        return (<div>
            {/*加载设备列表*/}
            {devicesItemViews}
            <div style={styles.toolLayout}>
                {/*添加工具列表*/}
                <RaisedButton
                    disabled={this.state.disable}
                    onClick={this._handleClickPushBtn}
                    primary={true}
                    label="上传配置"
                    style={styles.toolButton}/>
                <RaisedButton
                    disabled={this.state.disable}
                    onClick={this._handleClickCatBtn}
                    label="查看配置"
                    style={styles.toolButton}/>
                <RaisedButton
                    onClick={this._handleEditDialogOpen}
                    disabled={this.state.disable}
                    label="修改配置"
                    style={styles.toolButton}/>
                <RaisedButton
                    onClick={this._handleClickLogBtn}
                    disabled={this.state.disable}
                    secondary={true}
                    label="抓取日志"
                    style={styles.toolButton}/>
            </div>
            {/*查看配置的dialog*/}
            <Dialog
                modal={false}
                open={this.state.dialog}
                onRequestClose={this._handleCatDialogClose}>
                {this.state.catMessage}
            </Dialog>
            {/*设置配置dialog*/}
            <Dialog
                modal={false}
                actions={actions}
                open={this.state.dialogEdit}
                onRequestClose={this._handleEditDialogClose}>
                <TextField hintText="机器人id" onChange={this._handleRobotId}/>
                <TextField hintText="Host" onChange={this._handleHost}/>
                <TextField hintText="Stomp host" onChange={this._handleStomp}/>
            </Dialog>

            {/*信息提示*/}
            <Snackbar
                open={this.state.snackbar}
                action="嗯那"
                autoHideDuration={this.props.autoHideDuration}
                onActionClick={this._handleActionClose}
                message={this.state.snackMessage}
                onRequestClose={this._handleRequestClose}
            />

        </div>);
    }
}


