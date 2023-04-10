import React, { useEffect, useState, useContext } from "react";

import { Container, Row, Col } from "reactstrap";
import GameSquareRow from "../GameSquareRow/GameSquareRow";
import { useNavigate } from "react-router-dom";
import { getGameDetails } from "../../api/ApiAxios";
import { CurrentGameContext } from "../../context/CurrentGameContext/CurrentGameContext";

const GameBoard = (props) => {
  const navigate = useNavigate();
  const [enableMove, setEnableMove] = useState();
  const { gameStatus, setMoves } = useContext(CurrentGameContext);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [finishedGame, setFinishedGame] = useState(false);

  async function refreshGameDetails() {
    try {
      const response = await getGameDetails(
        localStorage.getItem("currentGame")
      );

      setMoves(response.data, response.data.moves);

      // check if the game is over
      if (response.data.status === "FINISHED") {
        localStorage.removeItem("currentGame");
        localStorage.removeItem("playerId");
        localStorage.removeItem("usedFields");
        setFinishedGame(true);
        navigate("/user/finished-game");
      }

      // check if the is active and playerToMoveId from localStorage ID is the same as the current player
      if (
        response.data.status === "ACTIVE" &&
        response.data.playerToMoveId === localStorage.getItem("playerId")
      ) {
        setEnableMove(true);
      } else {
        setEnableMove(false);
      }
    } catch (err) {
      return err;
    }
  }

  useEffect(() => {
    if (localStorage.getItem("currentGame")) {
      const intervalID = setInterval(async () => {
        await refreshGameDetails();
      }, parseInt(process.env.REACT_APP_REFRESH_TIME));

      return () => {
        clearInterval(intervalID);
      };
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("currentGame")) {
      refreshGameDetails();
    }
  }, [refreshTrigger]);

  function refreshTriggerFn() {
    setRefreshTrigger(!refreshTrigger);
  }

  return (
    <>
      <Container fluid="sm">
        <h1> </h1>
        <Row>
          <Col>
            <h3>
              {props.isPlayerBoard ? "My board" : "Opponent's board"}{!props.isPlayerBoard ? (<>
                {enableMove ? " -- Your turn" : " -- His turn"}
              </>) : null}
            </h3>
            <h4>
              

            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container>
              {Array.from(Array(10).keys()).map((index) => (
                <>
                  <Row className="m-1">
                    <GameSquareRow
                      yCoord={index + 1}
                      isEnabled={enableMove}
                      refreshTriggerFn={refreshTriggerFn}
                      isPlayerBoard={props.isPlayerBoard}
                      usedFields={props.usedFields}

                    />
                  </Row>
                </>
              ))}
              <Row></Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GameBoard;
