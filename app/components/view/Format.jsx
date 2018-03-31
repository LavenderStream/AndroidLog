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
            width: props.width || -1,
            height: props.height || -1
        };
    }

    componentWillMount() {
        this.updateSize();
        window.addEventListener('resize', () => this.updateSize());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateSize());
    }

    updateSize = () => {
        try {
            const parentDom = ReactDOM.findDOMNode(this).parentNode;
            let {width, height} = this.props;
            //如果props没有指定height和width就自适应
            if (!width) {
                width = parentDom.offsetWidth;
            }
            if (!height) {
                height = width * 0.38;
            }
            width -= 3;
            this.setState({width, height});
        } catch (ignore) {
            console.log("ignore: " + ignore);
        }
    };

    handleChange = (event, index, value) => this.setState({value: value});

    render() {
        let typeItemViews = [];
        for (let i = 0; i < this.props.fileType.length; i++) {
            typeItemViews.push(<MenuItem key={i} value={i}
                                         primaryText={this.props.fileType[i]}/>);
        }
        return (<div>
            <Toolbar ref="tool_bar">
                <ToolbarGroup firstChild={false}>
                    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                        {typeItemViews}
                    </DropDownMenu>
                </ToolbarGroup>
                <RaisedButton label="haha" secondary={true} style={styles.runBtnStyle} onClick={this._handleFormat}/>
            </Toolbar>
            <textarea
                ref="text_field"
                style={{width: this.state.width, height: this.state.height, border: 0}}
                defaultValue={"骚年, 来段" + this.props.fileType[this.state.value]}
            />
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
