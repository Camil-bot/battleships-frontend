import React, { useEffect } from "react";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import { Container, Row, Col, Spinner, Button } from "reactstrap";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStatus } from "../hooks/useGameStatus";
import { getPlayer } from "../utils/utils";

const Loby = () => {
  const navigate = useNavigate();
  const { gameStatus } = useGameStatus();
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [gameComencing, setGameComencing] = useState(false);

  useEffect(() => {
    if (!gameStatus || gameStatus.code > 400) {
      return;
    }
    if (gameStatus.player1) {
      setPlayer1(getPlayer(gameStatus.player1.email));
    }
    if (gameStatus.player2) {
      setPlayer2(getPlayer(gameStatus.player2.email));
      setGameComencing(true);
      setTimeout(() => {
        navigate("/user/GameSetup");
      }, 3000);
    }
  }, [gameStatus]);

  function copyToClipboardGameId() {
    navigator.clipboard.writeText(gameStatus.id);
  }
  return (
    <Container>
      <Row>
        <Col md={6} className="mt-4">
          <h1>Waiting for players</h1>
          <p><>Game id: {gameStatus ? gameStatus.id : null}</></p>
        </Col>
        <Col md={6} className="mt-4">
        <Button color="primary" onClick={() => copyToClipboardGameId()}>
            Copy game id
          </Button>
        </Col>
        <Col>
          <PlayerCard user={player1 ? player1 : <Spinner />} />
        </Col>
        <Col>
          <h1>VS</h1>
        </Col>
        <Col>
          <PlayerCard user={player2 ? player2 : <Spinner />} />
        </Col>
      </Row>
      <Row>
        <Col>
          {gameComencing ? (
            <>
              <Spinner />
              <h2>Starting</h2>
            </>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Loby;
