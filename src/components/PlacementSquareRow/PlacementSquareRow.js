import React, { useContext, useEffect, useState } from "react";
import { Button, Col } from "reactstrap";
import "./SquareRow.css";
import PlacementSquare from "../PlacementSquare/PlacementSquare";
import { GameSetupContext } from "../../context/GameSetupContext/GameSetupContext";

const PlacementSquareRow = (props) => {
  const xCoordList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const { resetMap } = useContext(GameSetupContext);

  useEffect(() => {}, [resetMap]);
  return (
    <>
      {xCoordList.map((xCoord) => (
        <Col className="m-0 p-0">
          <PlacementSquare xCoord={xCoord} yCoord={props.yCoord} />
        </Col>
      ))}
    </>
  );
};

export default PlacementSquareRow;
