import React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import NavigationBar from './features/component/Buttons/NavigationBar';

class App extends React.Component {
    

      render() {
        return (
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
        <NavigationBar />
        </div>
        </MuiThemeProvider>
);
      }

}

export default App;
