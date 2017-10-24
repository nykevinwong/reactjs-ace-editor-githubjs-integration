import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import SystemSettingsButton from './SystemSettingsButton';
import LoginButton from './LoginButton';
import GithubService from '../../../services/logins/GithubService';

class NavigationBar extends React.Component {
    
      constructor(props) {
        super(props);
        this.state = {open: false, logged : GithubService.isLogined()};
      }

      handleToggle = () => this.setState({open: !this.state.open});
      handleClose = () => this.setState({open: false});

      handleLogin  = (event) => {
        GithubService.login(); 
      }

      render() {
        return (
          <div>
          <AppBar title="Home"
          onLeftIconButtonTouchTap={ this.handleToggle }
          iconElementRight = { this.state.logged ? <SystemSettingsButton /> : <LoginButton onClick={this.handleLogin} /> } />
          <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          >
          <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
          </Drawer>
          </div>);
      }

}

export default NavigationBar;
