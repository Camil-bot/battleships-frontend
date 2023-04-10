import React, { useContext } from "react";
import PlacementSquareRow from "../PlacementSquareRow/PlacementSquareRow";
import { Container, Col, Row, Button } from "reactstrap";
import { GameSetupContext } from "../../context/GameSetupContext/GameSetupContext";
import BoatSelector from "../BoatSelector/BoatSelector";
import { useNavigate } from "react-router-dom";
import { useGameStatus } from "../../hooks/useGameStatus";

const PlayerBoard = () => {
  const { resetMap, handleSend, usedFields } = useContext(GameSetupContext);

  const { gameStatus } = useGameStatus();
  const navigate = useNavigate();

  return (
    <>
      <Container fluid="sm">
        <h1> My board </h1>
        <Row>
          <Col>
            <h3>Status: {gameStatus.status}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container>
              {Array.from(Array(10).keys()).map((index) => (
                <>
                  <Row>
                    <PlacementSquareRow yCoord={index + 1} />
                  </Row>
                </>
              ))}
            </Container>
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <BoatSelector />
          </Col>
        </Row>
        <Row className="text-center justify-content-center mb-3">
          <Col md={1}>
            <Button
              onClick={() => {
                resetMap();
              }}
            >
              Reset
            </Button>
          </Col>
          <Col md={1}>
            <Button
              onClick={async () => {
                let response = await handleSend();

                if (response.status === 200) {
                  localStorage.setItem("usedFields", usedFields);
                  navigate("/user/game");
                }
              }}
              disabled={gameStatus.status !== "CREATED" ? false : true}
            >
              Send
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlayerBoard;
