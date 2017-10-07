import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AceEditor from 'react-ace';
import 'brace/mode/haxe';
import 'brace/theme/monokai';

import GitHub from 'github-api';
import testUser from './settings/user.json';
import TreeExample from "./components/TreeExample"

const defaultFileTree = {
  name: 'root',
  toggled: true,
  children: [
      {
          name: 'parent',
          children: [
              { name: 'child1' },
              { name: 'child2' }
          ]
      },
      {
          name: 'loading parent',
          loading: true,
          children: []
      },
      {
          name: 'parent',
          children: [
              {
                  name: 'nested parent',
                  children: [
                      { name: 'nested child 1' },
                      { name: 'nested child 2' }
                  ]
              }
          ]
      }
  ]
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
     text: "123"    
    };

    this.gh = null;

    //  const parsed = queryString.parse(window.location.search);
    console.log(window.location.search);
    if(window.location.search.indexOf("code")!==-1)
    {
      this.state ={
      logined: true,
      code: window.location.search.substring(1).split("=")[1],
      data: defaultFileTree,
      text: "123"   
      };
//token: this.state.code
      this.gh = new GitHub({
        username:testUser.USERNAME,
        password:testUser.PASSWORD
      });
      this.onGitHubLogIn(testUser);
    }
  }

  createFileTree(contents)
  {
    var rootChildren = contents.map(
    function(item)
    {
      if(item.size===0)
      return {
        name: item.name,
        size: item.size,       
        children: []
      };

      return {
        name: item.name,
        size: item.size
      };
    }).sort(
      function(a,b)
    {
      return a.size > b.size;
    });

    console.log(rootChildren);

    this.setState({
      data : {
        name: 'root',
        toggled: true,
        children: rootChildren,
      }
    });
  }

  onGitHubLogIn(user)
  {
    this.remoteRepo = this.gh.getRepo(user.REPOUSER, user.REPO);
    alert("Repo:" + JSON.stringify(this.remoteRepo));
    var self = this;

    this.remoteRepo.getContents('master', '', false, function(err, contents) {
      alert("Contents:"+ JSON.stringify(contents));
      console.log(contents);
      self.createFileTree(contents);
    });
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

  onSelectedFileNode(node) {
    console.log("onSelectedFileNode:"+ node.name);

    var self = this;
    this.remoteRepo.getContents('master', node.name, 'raw', function(err, rawText) {
      self.setState({
        text: rawText
      })   
    });

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
       <div>
        <div style={{float: "left", width: 30 + "%" }} >
        <TreeExample 
        filetree={this.state.data} 
        onSelectedFileNode= {this.onSelectedFileNode}
        />
        </div>
        <div style={{float: "left", width: 70 + "%" }} >
        <AceEditor
        mode="haxe"
        theme="monokai"
        onChange={this.onChange}
        value = { this.state.text }
        name="UNIQUE_ID_OF_DIV"
        editorProps={{$blockScrolling: true}}
       />
       </div>
       </div>
      </div>
    );
  }
}

export default App;
