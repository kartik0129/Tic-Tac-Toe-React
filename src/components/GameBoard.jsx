import { useState } from "react";


export default function GameBoard({ onSelectSquare, turns,board }) {

  // const [gameBoard, setGameBoard] = useState([
  //   [null, null, null],
  //   [null, null, null],
  //   [null, null, null],
  // ]);
  // function handleClick(rowIndex, cellIndex) {
  //   setGameBoard(() => {
  //     const newGameBoard = [...gameBoard.map((innerArray) => [...innerArray])];
  //     newGameBoard[rowIndex][cellIndex] = activePlayerSymbol;
  //     return newGameBoard;
  //   });
  //   onSelectSquare();
  // }
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((cell, cellIndex) => {
                return (
                  <li key={cellIndex}>
                    <button
                      onClick={() => onSelectSquare(rowIndex, cellIndex)}
                      disabled={cell != null}
                    >
                      {cell}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
