import React, { FormEvent } from 'react'
import { observer } from 'mobx-react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './login.css'
import userStore from 'stores/user/userStore'
import sessionStore from 'stores/session/sessionStore'
import { logger } from 'core/logger'
import { Redirect } from 'react-router-dom'

const Login = observer(() => {
  const { t, i18n } = useTranslation('translation')
  if (sessionStore.isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/home',
        }}
      />
    )
  }

  const user = userStore.newEmptyUser()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const res = await userStore.login()
    logger.debug('res:', res)
    logger.debug('isLoggedIn:', sessionStore.isLoggedIn)
  }

  return (
    <Container>
      <Button onClick={() => i18n.changeLanguage('vi')}> VI </Button>
      <Button onClick={() => i18n.changeLanguage('en')}> EN </Button>
      <Row className="justify-content-md-center">
        <Col sm={6}>
          <Form onSubmit={handleSubmit} className="login">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>{t('login.email.label')}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder={t('login.email.placeholder')}
                // value={user.email}
                onChange={(event) => (user.email = event.target.value)}
              />
              <Form.Text className="text-muted">{t('login.notice')}</Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>{t('login.password.label')}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder={t('login.password.placeholder')}
                // value={user.password}
                onChange={(event) => (user.password = event.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {t('common.button.submit')}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
})

export default Login
