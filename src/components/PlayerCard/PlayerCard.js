import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const PlayerCard = (props) => {
  return (
    <Card
      style={{
        width: "18rem"
      }}
    >
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5">{props.user}</CardTitle>

        <CardText>
          Some quick example text to build on the card title and make up the
          bulk of the card‘s content.
        </CardText>
      </CardBody>
    </Card>
  );
};

export default PlayerCard;
