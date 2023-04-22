
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <Container>
        <Row>
          <Col md={3}>
            <img src="/logo.png" alt="logo" className="mb-3" />
            <p>&copy; 2023 Your Company. All Rights Reserved.</p>
          </Col>
          <Col md={3}>
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Stay Connected</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
              </li>
              <li className="list-inline-item">
                <a href="https://twitter.com/"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.linkedin.com/"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.youtube.com/"><FontAwesomeIcon icon={faYoutube} size="2x" /></a>
              </li>
            </ul>
            <Form className="mt-3">
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Button variant="primary" type="submit">Sign Up</Button>
            </Form>
          </Col>
          <Col md={3}>
            <h5>Contact Us</h5>
            <p>123 Main St, Anytown USA 12345</p>
            <p>Phone: 555-555-5555</p>
            <p>Email: info@yourcompany.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
