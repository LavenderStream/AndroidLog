import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DrawerView from './components/DrawerView.jsx';
import Logcat from './components/logcat/Logcat.jsx'
import About from './components/logcat/About.jsx'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends React.Component {

  _handleLeftIconButtonClick = () => {
    this.refs.drawerview.switchDrawer();
  }

  render() {
    return (
      <Router>
          <div>
            <ul>
              <li><Link to="/">About</Link></li>
              <li><Link to="/log">log</Link></li>
            </ul>

            <hr/>

            <Route exact path="/" component={About}/>
            <Route path="/log" component={Logcat}/>
          </div>
        </Router>
     //  <MuiThemeProvider>
     //    <div>
     //    <ul>
     //   <li><Link to="/">Home</Link></li>
     //   <li><Link to="/about">About</Link></li>
     // </ul>
     //      <AppBar title="Android Tools"
     //              iconClassNameRight="muidocs-icon-navigation-expand-more"
     //              onLeftIconButtonClick={this._handleLeftIconButtonClick}
     //              onTitleClick={this._handleLeftIconButtonClick} />
     //      <DrawerView  ref="drawerview" />
     //
     //      <Route exact path="/" component={Logcat}/>
     // <Route path="/about" component={Logcat}/>
     //
     //    </div>
     //
     //  </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
