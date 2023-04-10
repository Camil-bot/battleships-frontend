import React, { useContext, useEffect } from "react";
import { GameSetupContext } from "../../context/GameSetupContext/GameSetupContext";
import { Button } from "reactstrap";
import classNames from "classnames";

const PlacementSquare = props => {
  const {
    updateMap,
    typeOfShip,
    usedFields,
    setCounter,
    counter,
    elementHovered,
    setElementHovered
  } = useContext(GameSetupContext);

  const [isElementHovered, setIsElementHovered] = React.useState(false);

  useEffect(
    () => {
      setIsElementHovered(false);
      if (elementHovered === null) {
        return;
      }
      if (typeOfShip.direction === "HORIZONTAL") {
        if (
          elementHovered.xCoord.charCodeAt(0) + typeOfShip.size - 1 >=
            props.xCoord.charCodeAt(0) &&
          elementHovered.yCoord === props.yCoord &&
          elementHovered.xCoord.charCodeAt(0) <= props.xCoord.charCodeAt(0)
        ) {
          setIsElementHovered(true);
        }
      } else if (typeOfShip.direction === "VERTICAL") {
        if (
          elementHovered.yCoord + typeOfShip.size - 1 >= props.yCoord &&
          elementHovered.xCoord === props.xCoord &&
          elementHovered.yCoord <= props.yCoord
        ) {
          setIsElementHovered(true);
        }
      }
    },
    [elementHovered]
  );

  function checkMove(xCoord, yCoord, direction, size) {
    let asciiCharCode = xCoord.charCodeAt(0);
    if (direction === "HORIZONTAL") {
      if (String.fromCharCode(asciiCharCode + size - 1) > "J") {
        console.log("Invalid Move");
        return false;
      }
      for (let i = 0; i < size; i++) {
        if (
          usedFields.includes(String.fromCharCode(asciiCharCode + i) + yCoord)
        ) {
          console.log("Not a valid move");
          return false;
        }
      }
    }
    if (direction === "VERTICAL") {
      if (yCoord + size > 11) {
        console.log("Not A valid Move!");
        return false;
      }
      for (let i = 0; i < size; i++) {
        console.log(String.fromCharCode(asciiCharCode) + (yCoord - i));
        if (
          usedFields.includes(String.fromCharCode(asciiCharCode) + (yCoord + i))
        ) {
          console.log("Not a valid move");
          return false;
        }
      }
    }

    return true;
  }

  const marked = (xCoord, yCoord) => {
    if (!checkMove(xCoord, yCoord, typeOfShip.direction, typeOfShip.size)) {
      return;
    }
    updateMap({ x: xCoord, y: yCoord, ...typeOfShip });

    setCounter(counter + 1);
    setIsElementHovered(false);
    setElementHovered(null);
  };

  const checkElementHoveredCondition = () => {
    // check if the ship is valid to be placed
    if (typeOfShip.direction === "HORIZONTAL") {
      console.log(props.xCoord.charCodeAt(0) + typeOfShip.size);
      console.log("J".charCodeAt(0));
      if (
        props.xCoord.charCodeAt(0) + typeOfShip.size - 1 >
        "J".charCodeAt(0)
      ) {
        console.log("Invalid Move");
        return;
      }
    } else if (typeOfShip.direction === "VERTICAL") {
      if (props.yCoord + typeOfShip.size - 1 > 10) {
        console.log("Invalid Move");
        return;
      }
    }

    setElementHovered({
      xCoord: props.xCoord,
      yCoord: props.yCoord,
      ...typeOfShip
    });
  };

  return (
    <Button
      disabled={
        Object.keys(typeOfShip).length === 0 ||
        usedFields.includes(props.xCoord + props.yCoord)
      }
      onMouseOver={() => {
        checkElementHoveredCondition();
      }}
      onMouseLeave={() => setElementHovered(null)}
      style={{ width: "-webkit-fill-available", margin: "5px" }}
      color={
        usedFields.includes(props.xCoord + props.yCoord) ? "danger" : "success"
      }
      className={classNames({
        "p-5": true,
        "setup-element-hover": isElementHovered
      })}
      onClick={() => {
        marked(props.xCoord, props.yCoord);
      }}
    >
      {}
    </Button>
  );
};

export default PlacementSquare;
