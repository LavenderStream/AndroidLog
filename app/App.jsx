import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DrawerView from './components/DrawerView.jsx';

class App extends React.Component {

  _handleLeftIconButtonClick = () => {
    this.refs.drawerview.switchDrawer();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Android Tools"
                  iconClassNameRight="muidocs-icon-navigation-expand-more"
                  onLeftIconButtonClick={this._handleLeftIconButtonClick}
                  onTitleClick={this._handleLeftIconButtonClick} />
          <DrawerView  ref="drawerview" />
        </div>

      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
