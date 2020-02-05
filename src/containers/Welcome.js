import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as appActions from "actions/app";
import { connect } from "react-redux";
export class Welcome extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <img
              width="500"
              src="https://brentvale.github.io/ReactMinesweeper/images/minesweeper_text.png"
            />
          </div>
        </div>
        <div className="row text-center mb-2">
          <div className="col text-center">
            Welcome to game{" "}
            <a
              href="https://vi.wikipedia.org/wiki/D%C3%B2_m%C3%ACn_(tr%C3%B2_ch%C6%A1i)"
              target="_blank"
            >
              Minesweeper.
            </a>
            <br />
            Let choose the level, and play the game
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <button
              onClick={() =>
                this.props.appActions.setLevel({ level: "beginner" })
              }
              className="button"
            >
              Beginner
            </button>
            <button
              onClick={() =>
                this.props.appActions.setLevel({ level: "advantage" })
              }
              className="mx-2 button"
            >
              Advantage
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
};
export default connect(null, mapDispatchToProps)(Welcome);
