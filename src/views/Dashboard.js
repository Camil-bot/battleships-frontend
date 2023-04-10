import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1>Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <p>
            Here in the near future you will be able to see your stats and
            achievements.
          </p>
        </Col>
        <Col md={12}>
          <Button color="primary" onClick={() => navigate("/user/games")}>
            Play a Game
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
