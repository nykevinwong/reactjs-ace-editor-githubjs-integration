import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AceEditor from 'react-ace';
import 'brace/mode/haxe';
import 'brace/theme/monokai';

import GitHub from 'github-api';
import testUser from './settings/user.json';


class App extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onGitHubLogin = this.onGitHubLogin.bind(this);
    this.state = {
     logined: false,
     code: null
    };

    this.gh = null;

    //  const parsed = queryString.parse(window.location.search);
    console.log(window.location.search);
    if(window.location.search.indexOf("code")!==-1)
    {
      this.state = {
      logined: true,
      code: window.location.search.substring(1).split("=")[1]
      };
//token: this.state.code
      this.gh = new GitHub({
        username:testUser.USERNAME,
        password:testUser.PASSWORD
      });

      var remoteRepo = this.gh.getRepo(testUser.REPOUSER, testUser.REPO);
      alert("Repo:" + JSON.stringify(remoteRepo));

      remoteRepo.getContents('master', '', false, function(err, contents) {
        alert("Contents:"+ JSON.stringify(contents));
        console.log(contents);
      });

    }
  }

  onChange(newValue) {
    console.log('change',newValue);
  }

  onGitHubLogin() {
//    e.preventDefault();
   console.log('onGitHubLogin');

// TODO: add below parameter
// state - string  - An unguessable random string. It is used to protect against cross-site request forgery attacks.
// https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/

    let url ="http://github.com/login/oauth/authorize?client_id=62f241ae98604e3aecc8";
    window.location = url;
  }

  render() {

    let githubLogInLabel = null;

    if(!this.state.logined)
    {
     githubLogInLabel = <button type="button" onClick={this.onGitHubLogin}>Github Login</button>;
    }
    else
    {
     githubLogInLabel = <h3>Logged In(github)</h3>;
    }


    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        { githubLogInLabel }
        <AceEditor
        mode="haxe"
        theme="monokai"
        onChange={this.onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{$blockScrolling: true}}
       />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
