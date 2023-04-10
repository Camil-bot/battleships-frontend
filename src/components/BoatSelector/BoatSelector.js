import React, { useContext, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Boat from "../Boat/Boat";
import { GameSetupContext } from "../../context/GameSetupContext/GameSetupContext";

const BoatSelector = () => {
  const { shipsUnavailable } = useContext(GameSetupContext);
  return (
    <Container>
      <Row>
        <Col>
          <Boat size={2} maxBoats={4} isavailable={shipsUnavailable[0]} />
          <Boat size={3} maxBoats={3} isavailable={shipsUnavailable[1]} />
          <Boat size={4} maxBoats={2} isavailable={shipsUnavailable[2]} />
          <Boat size={6} maxBoats={1} isavailable={shipsUnavailable[3]} />
        </Col>
      </Row>
    </Container>
  );
};

export default BoatSelector;
