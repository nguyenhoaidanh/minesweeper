import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "containers/Board";
import Modal from "components/Modal";
import config from "constants/config";
import { bindActionCreators } from "redux";
import * as appActions from "actions/app";
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      timer: false,
      win: null,
      content: "",
      timeSecond: 0
    };
  }
  componentDidMount() {
    this.fetchMines();
  }
  fetchMines = () => {
    let { level } = this.props;
    const { bombNum, boardWidth } = config[level];
    this.props.appActions.getBoardMinesData({
      size: boardWidth,
      mines: bombNum
    });
    this.setState({ timer: false });
    this.resetTimer();
  };
  resetTimer = () => {
    clearInterval(window.timer);
    this.setState({ timeSecond: 0 });
  };
  componentWillReceiveProps(props) {
    let data = this._initBoard(props.level, props.app.mines);
    if (!props.app.gameover) this.setState({ data });
  }
  _initBoard = (level, mines) => {
    const { boardWidth, boardHeight } = config[level];
    const data = Array.from(new Array(boardWidth), () =>
      new Array(boardHeight).fill({
        bomb: false,
        bombCount: 0,
        open: false,
        flagged: false
      })
    );
    for (let place of mines) {
      data[place.x][place.y] = Object.assign({}, data[place.x][place.y], {
        bomb: true
      });
    }
    return data;
  };

  handleClickCell = (x, y) => {
    if (!this.state.timer) {
      this.setState({ timer: true });
      this.startTime();
    }
    const { gameover } = this.props;
    if (gameover) {
      return;
    }
    this._open(x, y);
  };

  handleRightClickCell = (x, y) => {
    if (this.props.gameover) {
      return;
    }
    this._toggleFlag(x, y);
  };

  _open(x, y) {
    const data = [].concat(this.state.data);
    const { boardWidth, boardHeight } = config[this.props.level];
    if (!data[x][y].open) {
      let bombCount = 0;
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          if (
            i < 0 ||
            i >= boardWidth ||
            j < 0 ||
            j >= boardHeight ||
            (i === x && j === y)
          ) {
            continue;
          }
          if (data[i][j].bomb) {
            bombCount++;
          }
        }
      }
      data[x][y] = Object.assign({}, data[x][y], {
        open: true,
        bombCount: bombCount
      });
      this.setState({ data });
      if (data[x][y].flagged) {
        this._toggleFlag(x, y);
      }
      if (data[x][y].bomb) {
        this.props.appActions.gameover();
        this._openAllMines();
        this.setState({
          win: false,
          content: document.getElementById("timer").innerHTML
        });
        clearInterval(window.timer);
        setTimeout(() => {
          document.getElementById("openModal").click();
        }, 1000);
      }

      if (bombCount === 0 && !data[x][y].bomb) {
        for (let i = x - 1; i <= x + 1; i++) {
          for (let j = y - 1; j <= y + 1; j++) {
            if (
              i < 0 ||
              i >= boardWidth ||
              j < 0 ||
              j >= boardHeight ||
              (i === x && j === y) ||
              data[i][j].flagged
            ) {
              continue;
            }
            this._open(i, j);
          }
        }
      }
    }
  }

  _toggleFlag(x, y) {
    const data = [].concat(this.state.data);
    const { flagged } = data[x][y];
    data[x][y] = Object.assign({}, data[x][y], { flagged: !flagged });
    this.setState({ data });
    this.props.appActions.toggleFlag(!flagged);
  }

  startTime() {
    window.timer = setInterval(() => {
      this.setState({ timeSecond: this.state.timeSecond + 1 });
    }, 1000);
  }

  formatTime = timeSecond => {
    let sec = "00",
      min = "00",
      hour = "00";
    hour = pad(parseInt(timeSecond / 3600));
    min = pad(parseInt((timeSecond - hour * 3600) / 60));
    sec = pad(timeSecond % 60);
    function pad(val) {
      var valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    }
    return `${hour}:${min}:${sec}`;
  };
  _openAllMines = () => {
    let { mines } = this.props.app;
    mines.forEach(pos => {
      this._open(pos.x, pos.y);
    });
  };

  render() {
    const { data, content = "", win, timeSecond = 0 } = this.state;
    const { loading } = this.props;

    return (
      <div className="container text-center">
        <Modal
          title="Game over"
          content={content}
          win={win}
          callbackReset={this.fetchMines}
        />

        <div className="row">
          <div className="col-12 text-center">
            <img
              width="300"
              src="https://brentvale.github.io/ReactMinesweeper/images/minesweeper_text.png"
            />
          </div>
        </div>

        <div className="row">
          <div className="col text-center">
            <span id="timer">{this.formatTime(timeSecond)}</span>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            <button
              onClick={() => this.props.appActions.clear()}
              className="button"
            >
              To home
            </button>
            <button
              onClick={() => {
                this.props.appActions.resetGame();
                this.fetchMines();
              }}
              className="mx-2 button"
            >
              New game
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            {loading ? (
              <img src="/images/ripple.svg" />
            ) : (
              <Board
                board={data}
                onClick={this.handleClickCell}
                size={config[this.props.level].boardWidth}
                onRightClick={this.handleRightClickCell}
              />
            )}
          </div>
        </div>
        <div>
          <p>
            <b className="text-center text-danger">Guide</b>
            <br />
            <span style={{ fontSize: 14 }}>Click: Open a cell.</span>
            <br />
            <span style={{ fontSize: 14 }}>Right Click: Toggle a flag.</span>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { app: state, gameover: state.gameover, loading: state.loading };
};
const mapDispatchToProps = dispatch => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
