import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const SystemSettingsButton = (props) => {
  return (<IconMenu
    {...props}
    iconButtonElement={
      <IconButton><FontIcon className="material-icons">settings</FontIcon></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Create a Project" />
    <MenuItem primaryText="Help" />
  </IconMenu>);
};


export default SystemSettingsButton;