import React, { useState } from "react";
import { Button } from "reactstrap";
import { postGameStrike } from "../../api/ApiAxios";
import { useGameStatus } from "../../hooks/useSquareStatus";
import classNames from "classnames";

const GameAtackSquare = props => {
  const [pressed, setPressed] = useState(false);
  const { colorBtn, targetHit } = useGameStatus({
    xCoord: props.xCoord,
    yCoord: props.yCoord
  });

  async function handleStrike(coordinates) {
    let response = await postGameStrike(
      localStorage.getItem("currentGame"),
      coordinates
    );
    return response;
  }

  if (props.isPlayerBoard) {
    return (
      <Button
        style={{
          width: "50px"
        }}
        className={classNames({
          "p-2": true,
          "btn-custom-elem-square": true,
          "enemy-square-hit": targetHit
        })}
        disabled={true}
        color={
          props.usedFields
            .split(",")
            .find(field => field === props.xCoord + props.yCoord)
            ? "danger"
            : "success"
        }
      />
    );
  }

  return (
    <Button
      style={{ width: "-webkit-fill-available" }}
      className="p-2 btn-custom-elem-square btn-atttack-elem"
      color={colorBtn}
      disabled={
        colorBtn === "success" || colorBtn === "danger" ? true : props.disable
      }
      onClick={async () => {
        let response = await handleStrike({
          x: props.xCoord,
          y: props.yCoord
        });
        setPressed(!pressed);
        props.refreshTriggerFn();
        console.log(response);
      }}
    />
  );
};

export default GameAtackSquare;
