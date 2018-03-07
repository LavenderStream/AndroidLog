import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar  title="Title"
                iconClassNameRight="muidocs-icon-navigation-expand-more" />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
