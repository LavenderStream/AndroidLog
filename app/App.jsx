import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DrawerView from './components/DrawerView.jsx';
import About from './components/view/About.jsx';
import Format from './components/view/Format.jsx';
import Config from './components/view/Config.jsx';

import {HashRouter, Route} from 'react-router-dom';

class App extends React.Component {

    _handleLeftIconButtonClick = () => {
        this.refs.drawerview.switchDrawer();
    };

    render() {
        return (
            <HashRouter>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            ref="apActionBar"
                            title="Android Tools"
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                            onLeftIconButtonClick={this._handleLeftIconButtonClick}/>
                        <DrawerView ref="drawerview"/>

                        <Route exact path="/" component={About}/>
                        <Route path="/config" component={Config}/>
                        {/*  <Route path="/log" component={Logcat}/>*/}
                        <Route path="/format" component={Format}/>
                    </div>
                </MuiThemeProvider>
            </HashRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
