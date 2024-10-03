import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./components/winning_combinations";
import GameOver from "./components/GameOver";

function derivedActivePlayer(gameTurns) {
  let activePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player == "X") activePlayer = "O";
  return activePlayer;
}
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSqaureSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSqaureSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol == secondSqaureSymbol &&
      firstSquareSymbol == thirdSqaureSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  const hasDrawn = gameTurns.length == 9 ? true : false;

  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = derivedActivePlayer(gameTurns);
  function handleSelectSqaure(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) => {
    //   return currActivePlayer == "X" ? "O" : "X";
    // });
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player == "X")
        currentPlayer = "O";
      const updatedturns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedturns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(winner || hasDrawn) && (
          <GameOver winner={winner} onRematch={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSqaure}
          turns={gameTurns}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
