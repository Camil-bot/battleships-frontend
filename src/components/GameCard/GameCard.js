import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { postJoinGame } from "../../api/ApiAxios";
import { useNavigate } from "react-router-dom";

const GameCard = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        style={{
          width: "18rem"
        }}
        key={props.id}
      >
        <img alt="Sample" src="https://picsum.photos/300/200" />
        <CardBody key={props.id + "1"}>
          <CardTitle key={props.id + "2"} tag="h5">
            {props.title}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            key={props.id + "3"}
            tag="h6"
          ></CardSubtitle>
          <CardText key={props.id + "4"} className="text-center">
            <p>
            <b>Status: {" "}</b>{props.status}

            </p>
          </CardText>
          <Row className="text-center">
            <Button
              key={props.id + "5"}
              color="primary"
              disabled={props.status !== "CREATED"}
              onClick={async () => {
                await props.joinGameFn(props.id);
              }}
            >
              {props.status === "CREATED" ? "Join" : "Can't Join"}
            </Button>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default GameCard;
