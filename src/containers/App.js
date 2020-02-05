import React, { Component } from "react";
import { connect } from "react-redux";
import Game from "containers/Game";
import Welcome from "containers/Welcome";
import "styles/Game.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { start: false };
  }
  componentWillReceiveProps(props) {
    if (this.props.app.level != props.app.level) {
      this.setState({ start: !this.state.start });
    }
  }
  render() {
    let { start } = this.state;
    let { level } = this.props.app;
    if (start) return <Game level={level} />;
    return <Welcome />;
  }
}
const mapStateToProps = state => {
  return {
    app: state
  };
};
export default connect(mapStateToProps)(App);
