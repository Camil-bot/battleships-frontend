import React, { useState, useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { GameSetupContext } from "../../context/GameSetupContext/GameSetupContext";

const Boat = props => {
  const [orientation, setOrietation] = useState(true);
  const [boatAvailable, setBoatAvailable] = useState(false);
  const { updateShip, typeOfShip, map } = useContext(GameSetupContext);

  useEffect(
    () => {
      resetBoat();
    },
    [props.isavailable]
  );

  function handleBoatTypeAndOrientation() {
    setOrietation(!orientation);
    updateShip({
      size: props.size,
      direction: orientation ? "HORIZONTAL" : "VERTICAL"
    });
    console.log("tip barca mbaaa", typeOfShip);
  }

  function resetBoat() {
    if (props.isavailable) {
      updateShip({});
    }
  }

  return (
    <Button
      className="me-4 mt-3 mb-3"
      disabled={props.isavailable}
      onClick={() => {
        handleBoatTypeAndOrientation();
      }}
      color={"primary"}
      outline={typeOfShip.size === props.size ? true : false}
    >
      BOAT of size {props.size} {orientation ? "Vertical" : "Horizontal"}
    </Button>
  );
};

export default Boat;
