import React, { Component} from 'react';
import { Container, Row, Col } from 'reactstrap'
import HoverPaper from '../../components/hover-paper'

/**
 * Renders a single view that shows a single author's publications and
 * statistics.
 */
class Author extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs={12}>
              <h1 className='text-center text-primary mb-4'>AUTHOR NAME</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <HoverPaper className='p-4 mb-4'>
                <h3 className='text-center'>Top Publications</h3>
              </HoverPaper>
            </Col>
            <Col xs={12}>
              <HoverPaper className='p-4 mb-4'>
                <h3 className='text-center'>Number of Publications over the years</h3>
              </HoverPaper>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <HoverPaper className='p-4'>
                <h3 className='text-center'>Word Cloud</h3>
              </HoverPaper>
            </Col>
            <Col xs={6}>
              <HoverPaper className='p-4'>
                <h3 className='text-center'>Social Network</h3>
              </HoverPaper>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Author;
