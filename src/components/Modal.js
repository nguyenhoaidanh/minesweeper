import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "actions/app";
export class Modal extends Component {
  render() {
    let { title, content, win, callbackReset } = this.props;
    return (
      <>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#modal"
          style={{ display: "none" }}
          id="openModal"
        >
          Launch
        </button>
        <div className="modal fade" id="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                You {win === true ? "win " : "lose "} the game in{" "}
                <span dangerouslySetInnerHTML={{ __html: content }}></span>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => {
                    callbackReset(); 
                    this.props.appActions.resetGame();
                  }}
                >
                  New game
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => this.props.appActions.clear()}
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return { app: state, gameover: state.gameover };
};
const mapDispatchToProps = dispatch => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
