import React from "react";
import { useEffect, useContext, useState } from "react";
import PlayerBoard from "../components/PlayerBoard/PlayerBoard";
import { Container, Row, Col, Button } from "reactstrap";
import GameSetupProvider from "../context/GameSetupContext/GameSetupProvider";
import { getGameDetails } from "../api/ApiAxios";
import { GameSetupContext } from "../context/GameSetupContext/GameSetupContext";
import { useNavigate } from "react-router-dom";

const GameSetup = () => {
  return (
    <>
      <GameSetupProvider>
        <Container>
          <Row>
            <Col>
              <PlayerBoard />
            </Col>
          </Row>
        </Container>
      </GameSetupProvider>
    </>
  );
};

export default GameSetup;
