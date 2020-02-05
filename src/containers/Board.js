import React, { Component } from "react";
import Cell from "components/Cell";
import config from "constants/config";
let cellSize = config.cellSize;
export default class Board extends Component {
  renderCells(x, row) {
    const cells = [];
    row.forEach((cell, i) => {
      cells.push(
        <Cell
          key={i}
          cell={cell}
          x={x}
          y={i}
          onClick={this.props.onClick}
          onRightClick={this.props.onRightClick}
        />
      );
    });
    return cells;
  }
  renderBoard() {
    const rows = [];
    this.props.board.forEach((row, i) => {
      rows.push(
        <div key={i} className="row">
          {this.renderCells(i, row)}
        </div>
      );
    });
    return rows;
  }
  render() {
    return (
      <div
        className="container text-center"
        style={{ width: `${this.props.size * cellSize}px` }}
      >
        {this.renderBoard()}
      </div>
    );
  }
}
