import React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import SystemSettingsButton from './features/component/Buttons/SystemSettingsButton';
import LoginButton from './features/component/Buttons/LoginButton';


class App extends React.Component {
    
      constructor(props) {
        super(props);
        this.state = {open: false, logged : false};
      }
    
      handleToggle = (event) => this.setState({open: !this.state.open});
      handleClose = () => this.setState({open: false});

      render() {
        return (
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div>
          <AppBar title="Home"
          onLeftIconButtonTouchTap={ this.handleToggle }
          iconElementRight = { this.logged ? <SystemSettingsButton /> : <LoginButton /> } />
          <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
          </div>
        </MuiThemeProvider>
);
      }

}

export default App;
