import React from "react";
import { useState, useEffect, useRef } from "react";
import GameCard from "../components/GameCard/GameCard";
import { Row, Col, Button, Input, InputGroup, Alert } from "reactstrap";
import { getPlayer } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { postCreateGame, getAllGames, postJoinGame } from "../api/ApiAxios";

const Games = () => {
  const [gameList, setGameList] = useState([]);
  const [joinGameError, setJoinGameError] = React.useState(false);
  const navigate = useNavigate();
  const gameIDRef = useRef("");

  useEffect(() => {
    const getGameList = async () => {
      let response = await getAllGames();
      setGameList(response.data.games);
      console.log(response.data.games);
    };
    getGameList();
    console.log(gameIDRef.current);
  }, [gameIDRef]);
  console.log(gameIDRef);

  const createGame = async () => {
    let response = await postCreateGame(localStorage.getItem("currentGame"));
    localStorage.setItem("currentGame", response.data.id);
    localStorage.setItem("playerId", response.data.player1Id);

    navigate("/user/loby");
    return;
  };

  async function handleJoinByID(gameID) {
    let response = await postJoinGame(gameID);
    if (!response) {
      return;
    }

    // check response for error 4xx or 5xx
    if (response.status >= 400) {
      setJoinGameError(response.data.message);
      return;
    }

    localStorage.setItem("currentGame", gameID);
    localStorage.setItem("playerId", response.data.player2Id); // same to join by card!!!!
    console.log(response);
    navigate("/user/loby");
  }

  return (
    <React.Fragment>
      <Col className="col-md-12 ml-sm-auto ">
        <Row className="justify-content-center mt-3 mb-3">
          <Col md={8}>
            {joinGameError ? (
              <Alert color="danger">
                <trong>{joinGameError}</trong>
              </Alert>
            ) : null}
          </Col>
        </Row>
        <Row className="justify-content-center mt-3 mb-3">
          <Col md={5}>
            <InputGroup>
              <Input
                type="text"
                placeholder="Game ID"
                ref={gameIDRef}
                onChange={(e) => {
                  gameIDRef.current.value = e.target.value;
                }}
              />
            </InputGroup>
          </Col>

          <Col md={3}>
            <Button
              color="primary"
              onClick={() => {
                handleJoinByID(gameIDRef.current.value);
              }}
              className="me-3"
            >
              Join Game
            </Button>
            <Button
              onClick={createGame}
              color="primary"
              className="ms-2"
              outline
            >
              Create Game
            </Button>
          </Col>
        </Row>
        <h4>
          <b>Active Games</b>
          <br />
          The first games are the most recent ones
        </h4>
        <Row className="row gy-5 p-3">
          {gameList.reverse().map((game) => {
            return (
              <>
                <Col className="col-md-3 content-card-wrapper-custom">
                  <GameCard
                    key={game.id}
                    id={game.id}
                    status={game.status}
                    title={getPlayer(game.player1.email) + "'s game"}
                    joinGameFn={handleJoinByID}
                  />
                </Col>
              </>
            );
          })}
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default Games;
