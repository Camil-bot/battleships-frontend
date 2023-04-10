import React from "react";
import { useState } from "react";
import { useGameStatus } from "../../hooks/useSquareStatus";
import { Button, Col } from "reactstrap";
import { useContext } from "react";
import { CurrentGameContext } from "../../context/CurrentGameContext/CurrentGameContext";
import { GameSetupContext } from "../../context/GameSetupContext/GameSetupContext";

const PlayerStrikeSquare = (props) => {
  const colorBtn = useGameStatus({
    xCoord: props.xCoord,
    yCoord: props.yCoord
  });
  const { usedFields } = useContext(GameSetupContext);

  return (
    <>
      <Button
        style={{ width: "-webkit-fill-available", margin: "5px" }}
        className="p-5"
        color={
          colorBtn
            ? colorBtn
            : usedFields.includes(props.xCoord + props.yCoord)
            ? "danger"
            : "success"
        }
      />
    </>
  );
};

export default PlayerStrikeSquare;
