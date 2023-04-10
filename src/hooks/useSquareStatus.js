import { useEffect, useState } from "react";
import { useContext } from "react";
import { CurrentGameContext } from "../context/CurrentGameContext/CurrentGameContext";

export const useGameStatus = ({ xCoord, yCoord }) => {
  const { moveArray } = useContext(CurrentGameContext);
  const [colorBtn, setColorBtn] = useState("primary");
  const [targetHit, setTargetHit] = useState(false);

  useEffect(
    () => {
      moveArray.forEach(move => {
        if (move.playerId === localStorage.getItem("playerId")) {
          if (xCoord === move.x && yCoord === move.y) {
            if (move.result === true) {
              setColorBtn("success");
            }
            if (move.result === false) {
              setColorBtn("danger");
            }
          }
        } else {
          if (xCoord === move.x && yCoord === move.y) {
            setTargetHit(true);
          }
        }
      });
    },
    [moveArray]
  );

  return { colorBtn, targetHit };
};
