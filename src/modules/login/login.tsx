import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    const state = {email, password}
    alert("A state was submitted: " + JSON.stringify(state));
    event.preventDefault();
  }

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
                value={email}
                onChange={event => setEmail(event.target.value)}
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
                value={password}
                onChange={event => setPassword(event.target.value)}
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
}

export default Login;
