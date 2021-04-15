import React, { FormEvent } from "react";
import { observer } from "mobx-react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./login.css";
import userStore from "stores/user/userStore";
import sessionStore from "stores/session/sessionStore";
import { logger } from "core/logger";
import { Redirect } from "react-router-dom";

const Login = observer(() => {
  if (sessionStore.isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/home",
        }}
      />
    );
  }

  const user = userStore.newEmptyUser();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await userStore.login();
    logger.debug("res:", res);
    logger.debug("isLoggedIn:", sessionStore.isLoggedIn);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={6}>
          <Form onSubmit={handleSubmit} className="login">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                // value={user.email}
                onChange={(event) => (user.email = event.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                // value={user.password}
                onChange={(event) => (user.password = event.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
});

export default Login;
