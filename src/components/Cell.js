import React, { Component } from "react";
import config from "constants/config";
let cellSize = config.cellSize;
const styles = {
  baseStyle: {
    width: 32,
    height: 32,
    border: "outset 4px white",
    lineHeight: "32px",
    userSelect: "none"
  },
  openStyle: {
    width: 38,
    height: 38,
    lineHeight: "38px",
    border: "solid 1px darkgray"
  }
};
export default class Cell extends Component {
  _handleClick = e => {
    e.preventDefault();
    this.props.onClick(this.props.x, this.props.y);
  };
  _handleRightClick = e => {
    e.preventDefault();
    this.props.onRightClick(this.props.x, this.props.y);
  };
  setStyle = (style, content) => {
    switch (content) {
      case 1:
        style = { ...style, color: "blue" };
        break;
      case 2:
        style = { ...style, color: "green" };
        break;
      case 3:
        style = { ...style, color: "red" };
        break;
      case 4:
        style = { ...style, color: "navy" };
        break;
      case 5:
        style = { ...style, color: "darkred" };
        break;
      case 6:
        style = { ...style, color: "deepskyblue" };
        break;
      case 7:
        style = { ...style, color: "navy" };
        break;
      case 8:
        style = { ...style, color: "gray" };
        break;
      default:
        break;
    }
    return style;
  };
  render() {
    let { cell } = this.props;
    let content = cell.flagged ? <i className="fa fa-flag" /> : "";
    let style = {
      ...styles.baseStyle,
      width: cellSize - 2,
      height: cellSize - 2,
      lineHeight: `${cellSize - 8}px`
    };
    if (cell.open) {
      style = {
        ...style,
        ...styles.openStyle,
        width: cellSize - 2,
        height: cellSize - 2,
        lineHeight: `${cellSize - 2}px`
      };
      if (cell.bomb) {
        content = <i className="fa fa-bomb" style={{ marginTop: -3 }}></i>;
        style = { ...style, backgroundColor: "red" };
      } else {
        if (cell.bombCount > 0) {
          content = cell.bombCount;
          style = this.setStyle(style, content);
        } else {
          content = "";
        }
      }
    }
    return (
      <div
        className="cell"
        style={style}
        onClick={this._handleClick}
        onContextMenu={this._handleRightClick}
      >
        {content}
      </div>
    );
  }
}
