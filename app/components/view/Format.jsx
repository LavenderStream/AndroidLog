import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

let beautifyHtml = require('js-beautify').html;
let beautifyJs = require('js-beautify');

const styles = {
    inputTextStyle: {
        padding: 0,
    },
    runBtnStyle: {
        margin: 12
    }
};

export default class Format extends React.Component {

    static defaultProps = {
        fileType: ["Json", "Html", "JavaScript"]
    };

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            text: "",
            top: 0,
        };
    }

    componentWillMount() {
        //window.addEventListener('resize', () => this.updateSize());
    }

    componentDidMount() {
        this.updateSize();
    }

    componentWillUnmount() {
        //window.removeEventListener('resize', () => this.updateSize());
    }

    updateSize = () => {
        const titleBar = ReactDOM.findDOMNode(this.refs.toolbar);
        const actionBar = ReactDOM.findDOMNode(this).parentNode.childNodes.item(0);
        const top = actionBar.offsetHeight + titleBar.offsetHeight - 5;

        this.setState({top});
    };

    handleChange = (event, index, value) => {
        this.setState({value: value});
    };

    render() {
        let typeItemViews = [];
        for (let i = 0; i < this.props.fileType.length; i++) {
            typeItemViews.push(<MenuItem key={i} value={i}
                                         primaryText={this.props.fileType[i]}/>);
        }

        let tip = this.props.fileType[this.state.value];

        return (<div>
            <Toolbar ref='toolbar'>
                <ToolbarGroup firstChild={false}>
                    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                        {typeItemViews}
                    </DropDownMenu>
                </ToolbarGroup>
                <RaisedButton label="haha" secondary={true} style={styles.runBtnStyle}
                              onClick={this._handleFormat}/>
            </Toolbar>
            <textarea
                key={this.state.value}
                ref="text_field"
                style={{
                    position: 'absolute',
                    padding: 16,
                    left: 0,
                    top: this.state.top,
                    bottom: 0,
                    width: '100%',
                    boxSizing: 'border-box',
                    border: 'none',
                    outline: 'none',
                    resize: 'none'
                }}
                defaultValue={"骚年, 来段" + tip}/>
        </div>);
    }

    _handleFormat = () => {
        let str = this.refs.text_field.value;
        switch (this.state.value) {
            case 0:
                str = beautifyJs(str);
                break;
            case 1:
                str = beautifyHtml(str);
                break;
            case 2:
                str = beautifyJs(str);
                break;
        }
        this.refs.text_field.value = str;
    };
}
