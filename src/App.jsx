import React from "react";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";



import { Switch, Route, HashRouter   } from 'react-router-dom';
import EditorPage  from './features/Pages/EditorPage';
import CreatePage  from './features/Pages/CreatePage';
import NavigationBar from "./features/component/Buttons/NavigationBar";

class App extends React.Component {

  constructor(props)
  {
        super(props);

        this.state = { text: "test", mode: "javascript", displayEditor: false};
  }

  onChange = () => {}

  render() {
    return (
      <HashRouter>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
      <Route path="/" component={NavigationBar} />
      <Route path="/:name/create" component={CreatePage} />
      <Route path="/:name/project/editor/:projname" component={EditorPage} />
      </div>
      </MuiThemeProvider>
      </HashRouter>
    );
  }
}

export default App;
