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
