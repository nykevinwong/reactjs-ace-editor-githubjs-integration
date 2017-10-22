import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

class App extends React.Component {
    
      constructor(props) {
        super(props);
        this.state = {open: false};
      }
    
      handleToggle = () => this.setState({open: !this.state.open});
    
      render() {
        return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <AppBar title="Home" />
        </MuiThemeProvider>
);
      }

}

export default App;
