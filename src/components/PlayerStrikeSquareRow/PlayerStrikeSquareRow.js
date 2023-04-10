import React from "react";
import PlayerStrikeSquare from "../PlayerStrikeSquare/PlayerStrikeSquare";
import { Col } from "reactstrap";
const PlayerStrikeSquareRow = (props) => {
  const xCoordList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  return (
    <>
      {xCoordList.map((xCoord) => (
        <Col
          className="m-0 p-0"
          // style={{ padding: "0px 0px", backgroundColor: "red", margin: "0px" }}
        >
          <PlayerStrikeSquare xCoord={xCoord} yCoord={props.yCoord} />
        </Col>
      ))}
    </>
  );
};

export default PlayerStrikeSquareRow;
