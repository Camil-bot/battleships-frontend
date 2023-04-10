import React from "react";
import GameBoard from "../components/GameBoard/GameBoard";

import { Container, Row, Col } from "reactstrap";
import CurrentGameProvider from "../context/CurrentGameContext/CurrentGameProvider";
const Game = () => {
  const usedFields = localStorage.getItem("usedFields");

  return (
    <CurrentGameProvider>
      <Container>
        <Row>
          <Col md={6}>
            <GameBoard />
          </Col>
          <Col md={6}>
            <GameBoard isPlayerBoard={true} usedFields={usedFields} />
          </Col>
        </Row>
      </Container>
    </CurrentGameProvider>
  );
};

export default Game;
