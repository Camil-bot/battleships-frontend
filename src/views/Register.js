import React from "react";
import { useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import { checkEmail } from "../utils/utils";
import { postRegister } from "../api/ApiAxios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetyped, setPasswordRetyped] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setErrMsg(null);

    if (!checkEmail(email)) {
      setErrMsg("Invalid Email");
      return;
    }

    if (!password) {
      setErrMsg("Password not defined!");
      return;
    }

    if (password !== passwordRetyped) {
      setErrMsg("Passwords do not match!");
      return;
    }

    let response = await postRegister(email, password);

    // check if response status is 4xx or 5xx
    if (response.status >= 400) {
      setErrMsg(response.data.message);
      return;
    } else {
      navigate("/auth/login");
    }
  }

  return (
    <>
      <Container className="w-25 mt-5">
        <Form onSubmit={(e) => handleRegister(e)}>
          <h2 className="text-center">Register</h2>
          <Row>
            {errMsg ? <Alert color="danger">{errMsg}</Alert> : null}
            <FormGroup floating>
              <Input
                className="input-sm"
                id="email"
                name="email"
                value={email}
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label for="email">Email</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Label for="password">Password</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="passwordRetyped"
                name="passwordretyped"
                value={passwordRetyped}
                placeholder="Retype Password"
                type="password"
                onChange={(e) => setPasswordRetyped(e.target.value)}
              />
              <Label for="passwordRetyped">Retype Password</Label>
            </FormGroup>
          </Row>
          <Row>
            <Col md={12}>
              <Button onClick={(e) => handleRegister(e)} type="submit">
                Submit
              </Button>
            </Col>
            <Col md={12} className="text-left mt-3">
              <a href="/auth/login">Login</a>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default Register;
