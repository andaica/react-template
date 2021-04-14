import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Session from 'stores/Session';
import './login.css';

interface IFormInput {
  username: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    await Session.login(data.username, data.password);
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
