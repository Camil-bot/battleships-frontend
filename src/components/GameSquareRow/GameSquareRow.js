import React from "react";
import PlacementSquare from "../PlacementSquare/PlacementSquare";
import GameAtackSquare from "../GameAtackSquare/GameAtackSquare";
import { Row, Col } from "reactstrap";

const GameSquareRow = (props) => {
  const xCoordList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  return (
    <>
      {xCoordList.map((xCoord) => (
        <Col
          className="m-0 p-0 btn-wrapper-col-elem"
          // style={{ padding: "0px 0px", backgroundColor: "red", margin: "0px" }}
        >
          <GameAtackSquare
            xCoord={xCoord}
            yCoord={props.yCoord}
            disable={!props.isEnabled}
            refreshTriggerFn={props.refreshTriggerFn}
            isPlayerBoard={props.isPlayerBoard}
            usedFields={props.usedFields}
          />
        </Col>
      ))}
    </>
  );
};

export default GameSquareRow;
