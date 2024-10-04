import { useState } from "react";
export default function Player({ name, symbol, isActive, onChangeName }) {
  const [isEdit, setIsEdit] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  function handleEdit() {
    setIsEdit((editing) => !editing);
    if (isEdit) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {isEdit ? (
            <span>
              <input
                type="text"
                required
                onChange={handleChange}
                value={playerName}
              ></input>
            </span>
          ) : (
            <span className="player-name">{playerName}</span>
          )}

          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEdit}>{isEdit ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
