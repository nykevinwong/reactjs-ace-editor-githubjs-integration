import React from 'react';
import { Treebeard } from 'react-treebeard';
import PropTypes from 'prop-types';

export default class TreeExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle(node, toggled) {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node });

    this.props.onSelectedFileNode(node);
  }
  render() {
    return <Treebeard data={this.props.filetree} onToggle={this.onToggle} />;
  }
}

TreeExample.propTypes = {
  filetree: PropTypes.shape({
    name: PropTypes.number.isRequired,
    toggled: PropTypes.bool.isRequired,
    sdfa: PropTypes.array.isRequired,
  }).isRequired,
  onSelectedFileNode: PropTypes.func.isRequired,
};
