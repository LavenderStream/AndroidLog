import React from 'react';
import ReactDOM from 'react-dom';
import {emojify} from 'react-emojione';

export default class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            top: 0,
        };
    }

    componentDidMount() {
        this.updateSize();
    }

    updateSize = () => {
        const actionBar = ReactDOM.findDOMNode(this).parentNode.childNodes.item(0);
        const top = actionBar.offsetHeight;

        this.setState({top});
    };

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    padding: 0,
                    left: 0,
                    top: this.state.top,
                    bottom: 0,
                    right: 0,
                    width: '100%',
                    boxSizing: 'border-box',
                    border: 'none',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                {emojify(':stuck_out_tongue_winking_eye:')}

            </div>
        );
    }

}
