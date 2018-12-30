import React from 'react';
import { render } from 'react-dom';

// class Square extends React.Component {
//     render() {
//       return (
//         <button className="square" onClick={()=>{
//           this.props.onClick()}}
//           >
//           { this.props.value }
//         </button>
//       );
//     }
//   }
// the code above does the same staff as below's. 
// So if your component just gets some data and renders
// some staff - using function will reduce developing effort
  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  class Board extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        squares: Array(9).fill(null),
        turn: 1
      }
    }
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
  
    handleClick (i) {
      const squares = [...this.state.squares];
      let turn = this.state.turn;
      squares[i] = turn % 2 ? 'X' : 'O';
      this.setState({turn: turn + 1, squares})
    }
    

    render() {
      // const status = 'Next player: ' + (this.state.turn % 2 && 'X') || 'O';
      const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  render(<Game />, document.getElementById('root'));
