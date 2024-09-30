import { useState } from "react";
export default function Player({ name, symbol }) {
    const [isEdit, setIsEdit] = useState(false);
    function handleEdit() {
        setIsEdit(!isEdit);
    }
  return (
    <>
      <li>
        <span className="player">
          {isEdit ? (
            <span>
              <input></input>
            </span>
          ) : (
            <span className="player-name">{name}</span>
          )}

          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEdit}>{isEdit ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
