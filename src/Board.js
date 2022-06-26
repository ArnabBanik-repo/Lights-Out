import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    // chanceLightStartsOn: 0.25,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };
  }

  createBoard() {
    let board = [];
    // for (let i = 0; i < this.props.nrows; i++) {
    //   let row = [];
    //   for (let j = 0; j < this.props.ncols; j++)
    //     row.push(Math.random() < this.props.chanceLightStartsOn);
    //   board.push(row);
    // }

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    let { nrows, ncols } = this.props;
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) row.push(false);
      board.push(row);
    }

    for (let i = 0; i < nrows; i++) {
      const x = Math.floor(Math.random() * nrows);
      const y = Math.floor(Math.random() * ncols);
      flipCell(y, x);
      if (y - 1 >= 0) flipCell(y - 1, x);
      if (x - 1 >= 0) flipCell(y, x - 1);
      if (y + 1 < ncols) flipCell(y + 1, x);
      if (x + 1 < nrows) flipCell(y, x + 1);
    }

    // board = [
    //   [false, false, false, false],
    //   [false, false, true, false],
    //   [false, true, true, true],
    //   [false, false, true, false],
    // ];
    return board;
  }

  flipCellsAround = (coord) => {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x);

    if (y - 1 >= 0) flipCell(y - 1, x);
    if (x - 1 >= 0) flipCell(y, x - 1);
    if (y + 1 < ncols) flipCell(y + 1, x);
    if (x + 1 < nrows) flipCell(y, x + 1);

    let hasWon = true;

    this.state.board.forEach((row) => {
      row.forEach((cell) => {
        if (cell) return (hasWon = false);
      });
      if (!hasWon) return;
    });

    this.setState({ board, hasWon });
  };

  render() {
    return (
      <div>
        {!this.state.hasWon ? (
          <div>
            <div className="titles">
              <span className="neon">Lights</span>
              <span className="flux">Out</span>
            </div>
            <table className="Board">
              <tbody>
                {this.state.board.map((row, r) => {
                  return (
                    <tr>
                      {row.map((item, c) => {
                        return (
                          <Cell
                            coord={`${r}-${c}`}
                            isLit={item}
                            flipCellsAroundMe={this.flipCellsAround}
                          />
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="titles">
            <article className="neon win">Congratulations! </article>
            <article className="flux win2">You won</article>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
