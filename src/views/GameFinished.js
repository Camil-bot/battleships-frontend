import React from "react";
// import reactstrap
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export const GameFinished = () => {
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
          <Button color="primary" onClick={() => navigate("/user/games")}>
            Play a New Game
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
