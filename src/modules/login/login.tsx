import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as HTTPClient from 'models/base/http_client';
import './login.css';

interface IFormInput {
  username: String;
  password: String;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    console.log(HTTPClient.post('api/users/login', data));
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col sm={6}>
          <Form onSubmit={handleSubmit(onSubmit)} className='login'>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                {...register('username', { required: true })}
                type='text'
              />
              <Form.Text className='text-danger'>{errors.username}</Form.Text>
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register('password', { required: true })}
                type='password'
              />
              <Form.Text className='text-danger'>{errors.password}</Form.Text>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
