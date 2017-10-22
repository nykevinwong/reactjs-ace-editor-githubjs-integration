import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AceEditor from 'react-ace';
import 'brace/mode/haxe';
import 'brace/mode/json';
import 'brace/mode/xml';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import GitHub from 'github-api';
import testUser from './settings/user.json';
import TreeExample from './components/TreeExample';

const defaultFileTree = {
  name: '',
  toggled: true,
  children: [],
};

const fillFolder = function(list) {
  const result = list
    .map(item => ({
      name: item.name,
      path: item.path,
      size: item.size,
      sha: item.sha,
      children: item.size === 0 ? [] : undefined,
    }))
    .sort((a, b) => a.size > b.size);

  return result;
};
class App extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onGitHubLogin = this.onGitHubLogin.bind(this);
    this.createFileTree = this.createFileTree.bind(this);
    this.onSelectedFileNode = this.onSelectedFileNode.bind(this);
    this.remoteRepo = null;
    this.state = {
      logined: false,
      code: null,
      data: defaultFileTree,
      text: '123',
      mode: 'haxe',
    };

    this.gh = null;
    //  const parsed = queryString.parse(window.location.search);
  }

  componentDidMount() {
    console.log(window.location.search);
    if (window.location.search.indexOf('code') !== -1) {
      this.state = {
        logined: true,
        code: window.location.search.substring(1).split('=')[1],
        data: defaultFileTree,
        text: '123',
        mode: 'haxe',
      };
      // token: this.state.code
      this.gh = new GitHub({
        username: testUser.USERNAME,
        password: testUser.PASSWORD,
      });
      this.onGitHubLogIn(testUser);
    }
  }

  createFileTree(contents) {
    const rootChildren = fillFolder(contents);
    const self = this;
    rootChildren.map(item => {
      if (item.size === 0) {
        self.remoteRepo.getContents(
          'master',
          item.name,
          false,
          (err, contents) => {
            console.log(`${item.name} folder:`);
            console.log(contents);
            item.children = fillFolder(contents);
          },
        );
      }
    });

    this.setState({
      data: {
        name: '',
        toggled: true,
        children: rootChildren,
      },
    });
  }

  onGitHubLogIn(user) {
    this.remoteRepo = this.gh.getRepo(user.REPOUSER, user.REPO);
    console.log(`getRepo:${JSON.stringify(this.remoteRepo)}`);
    const self = this;

    this.remoteRepo.getContents('master', '', false, (err, contents) => {
      console.log(contents);
      self.createFileTree(contents);
    });
  }

  onChange(newValue) {
    console.log('change', newValue);
  }

  onGitHubLogin() {
    //    e.preventDefault();
    console.log('onGitHubLogin');

    // TODO: add below parameter
    // state - string  - An unguessable random string. It is used to protect against cross-site request forgery attacks.
    // https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/

    const url =
      'http://github.com/login/oauth/authorize?client_id=62f241ae98604e3aecc8';
    window.location = url;
  }

  setNewMode(node) {
    let newMode = 'haxe';

    if (node.name.indexOf('.json') !== -1) {
      newMode = 'json';
    } else if (node.name.indexOf('.xml') !== -1) {
      newMode = 'xml';
    } else if (node.name.indexOf('.hxproj') !== -1) {
      newMode = 'xml';
    } else if (node.name.indexOf('.js') !== -1) {
      newMode = 'javascript';
    } else if (node.name.indexOf('.hx') !== -1) {
      newMode = 'haxe';
    }

    this.setState({ mode: newMode });
  }

  onSelectedFileNode(node) {
    console.log(`onSelectedFileNode:${node.name}`);

    if (this.state.logined === false) {
      console.log('Github login is NOT authenticated');
      return;
    }

    if (node.size === 0 || node.name.indexOf('.png') !== -1) {
      // ignore for now if it is a folder.
      this.setState({
        text: '',
      });
      return;
    }

    this.setNewMode(node);

    const self = this;
    this.remoteRepo.getContents('master', node.path, 'raw', (err, rawText) => {
      console.log(`recieved raw:${JSON.stringify(rawText)}`);

      if (node.name.indexOf('.json') !== -1) {
        rawText = JSON.stringify(rawText);
      }

      self.setState({
        text: rawText,
      });
    });
  }

  render() {
    let githubLogInLabel = null;

    if (!this.state.logined) {
      githubLogInLabel = (
        <button type="button" onClick={this.onGitHubLogin}>
          Github Login
        </button>
      );
    } else {
      githubLogInLabel = <h3>Logged In(github)</h3>;
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Deva Web IDE</h2>
          <h4>Environment: {process.env.NODE_ENV}</h4>
          <br />
        </div>
        {githubLogInLabel}
        <div>
          <div style={{ float: 'left', width: `${30}%` }}>
            <TreeExample
              filetree={this.state.data}
              onSelectedFileNode={this.onSelectedFileNode}
            />
          </div>
          <div style={{ float: 'left', width: `${70}%` }}>
            <AceEditor
              width="100%"
              mode={this.state.mode}
              theme="monokai"
              onChange={this.onChange}
              value={this.state.text}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              wrapEnabled
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
