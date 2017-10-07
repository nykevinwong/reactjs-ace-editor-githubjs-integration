import React from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';



export default class TreeExample extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });

        this.props.onSelectedFileNode(node);

    }
    render(){
        return (
            <Treebeard
                data={this.props.filetree}
                onToggle={this.onToggle}
            />
        );
    }
}