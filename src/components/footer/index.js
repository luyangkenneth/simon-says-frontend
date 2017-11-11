import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import './styles.css'

const Footer = () => (
  <footer className='cir__footer p-4'>
    <Container fluid>
      <Row className='h-100'>
        <Col className='my-auto' xs={12}>
          <p className='text-center'>
            Created with &hearts;.
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
)

export default Footer
