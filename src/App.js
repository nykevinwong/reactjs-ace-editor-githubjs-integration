import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/haxe';
import 'brace/theme/monokai';

import GitHub from 'github-api';

class App extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    console.log('change',newValue);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
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
