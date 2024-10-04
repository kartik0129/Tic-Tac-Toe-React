import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./components/winning_combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function derivedActivePlayer(gameTurns) {
  let activePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player == "X") activePlayer = "O";
  return activePlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
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
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  const hasDrawn = gameTurns.length == 9 ? true : false;
  const activePlayer = derivedActivePlayer(gameTurns);
  function handleSelectSqaure(rowIndex, colIndex) {
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

  function handlePlayerNamechange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNamechange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNamechange}
          />
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
