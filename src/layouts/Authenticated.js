import React from "react";
import Dashboard from "../views/Dashboard";
import Games from "../views/Games";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header/Header";
import VerticalNavbar from "../components/VerticalNavbar/VerticalNavbar";
import GameSetup from "../views/GameSetup";
import { Container, Row, Col } from "reactstrap";
import Game from "../views/Game";
import Loby from "../views/Loby";
import { GameFinishedWon } from "../views/GameFinishedWon";
import { GameFinishedLost } from "../views/GameFinishedLost";

const Authenticated = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/auth/login");
    }
  });
  return (
    <>
      <Container fluid className="no-scrollbar">
        <Row className="p-4">
          <Header />
        </Row>
        <Row className="pt-2">
          <Col className="col-2 bg-dark text-center fixed-top navbar-wrapper-custom">
            <VerticalNavbar />
          </Col>
          <Col className="text-center content-wrapper-custom">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/games" element={<Games />} />
              <Route path="/gameSetup" element={<GameSetup />} />
              <Route path="/game" element={<Game />} />
              <Route path="/loby" element={<Loby />} />
              <Route path="/finished-game-L" element={<GameFinishedLost />} />
              <Route path="/finished-game-W" element={<GameFinishedWon />} />
              <Route path="/*" element={<Navigate to="/user/dashboard" />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Authenticated;
