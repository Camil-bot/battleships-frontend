import React from "react";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import { postLogin } from "../api/ApiAxios";
import { checkEmail } from "../utils/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigate();

  async function handleLogin(e) {
    setErrMsg(null);
    e.preventDefault();
    if (!checkEmail(email)) {
      setErrMsg("Invalid Email");
      return;
    }
    if (!email || !password) {
      setErrMsg("Email or Password not defined!");
      return;
    }

    let response = await postLogin(email, password);

    // check if response status is 4xx or 5xx
    if (response.status >= 400) {
      setErrMsg(response.data.message);
      return;
    }
    console.log(response);
    window.localStorage.setItem("authToken", response.data.accessToken);
    navigate("/user/dashboard");
  }

  return (
    <Container className="w-25 pt-5">
      <Form onSubmit={(e) => handleLogin(e)}>
        <h2 className="text-center">Login</h2>
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
        </Row>
        <Row>
          <Col md={12}>
            <Button
              onClick={(e) => {
                handleLogin(e);
              }}
              type="submit"
            >
              Submit
            </Button>
          </Col>
          <Col className="text-left mt-3" md={12}>
            <a href="/auth/register">Register</a>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
