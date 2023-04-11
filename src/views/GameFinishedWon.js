import React from "react";

import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const GameFinishedWon = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col>
          <h1>Game Finished</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Game Won</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button color="primary" onClick={() => navigate("/user/games")}>
            Play a New Game
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
