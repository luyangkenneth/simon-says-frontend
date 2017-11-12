import React, { Component } from 'react';
import Paper from 'material-ui/Paper'

class HoverPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zDepth: 1
    }
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <Paper
          transitionEnabled
          zDepth={this.state.zDepth}
          onMouseOver={() => { this.setState({ zDepth: 2 }) }}
          onMouseOut={() => { this.setState({ zDepth: 1 }) }}
        >
          {children}
        </Paper>
      </div>
    );
  }
}

export default HoverPaper
