import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Square({ value, OnSquareClick }) {
  return <button className="square" onClick={OnSquareClick}>{value}</button>;
}

function Board({ xIsNext, squares, onPlay }) {
  function calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(index) {
    if (squares[index] != null || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();

    if (xIsNext == true) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares)
  }

  const winner = calculateWinner();
  
  if (winner) {
    return <div className='status'>{"Winner: " + winner}</div>
  }
  return (
    <>
    <div className="status">{"Next player: " + (xIsNext ? "X" : "O")} </div>
    <div className="board-row">
      <Square value={squares[0]} OnSquareClick={()=> handleClick(0)} />
      <Square value={squares[1]} OnSquareClick={()=> handleClick(1)} />
      <Square value={squares[2]} OnSquareClick={()=> handleClick(2)}/>
    </div>
    <div className="board-row">
      <Square value={squares[3]} OnSquareClick={()=> handleClick(3)} />
      <Square value={squares[4]} OnSquareClick={()=> handleClick(4)} />
      <Square value={squares[5]} OnSquareClick={()=> handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} OnSquareClick={()=> handleClick(6)} />
      <Square value={squares[7]} OnSquareClick={()=> handleClick(7)} />
      <Square value={squares[8]} OnSquareClick={()=> handleClick(8)} />
    </div>
  </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0 ? true : false;
  const currentSquare = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(currentMove + 1);
  }

  function jumpTo(historyIndex) {
    //setHistory( [...(history.slice(0, historyIndex + 1))] )
    setCurrentMove(historyIndex)
  }
  
  const moves = history.map((squares, move) => {
      let description;

      if (move > 0) {
        description = "Go to move #" + move;
      } else {
        description = "Go to game start";
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  )

  return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay} />
        </div>
        <div className="history-buttons">
          <ol>{moves}</ol>
        </div>
      </div>
  );
}