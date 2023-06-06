import { useState, useRef} from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
// import {logo} from '../../public';
import './Header.css';

function Header() {
  const form = useRef();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("emailjs")

    emailjs.sendForm('service_pdgfa8g', 'template_yj5ioh9', form.current, 'cEhby2bneSLwToKdo')
      .then((result) => {
          console.log(result);
      }, (error) => {
          console.log(error.text);
      });
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear session data
    navigate('/');
  }


  return (
    <Navbar expand="md" className="header">
      <Navbar.Brand href="/user">
        {/* <img src="dolladdashboard-admin/public/DollarDashboard-logo.png" alt="Logo" className="logo" /> */}
        <span className="company-name">Dollar Dashboard Admin Panel</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="/dashboard" className="nav-link">Dashboard</Nav.Link> */}
          <Nav.Link href="/user" className="nav-link">Users</Nav.Link>
          <Nav.Link href="/saving" className="nav-link">Saving</Nav.Link>
          <Nav.Link href="/expenses" className="nav-link">Expense</Nav.Link>
          <Nav.Link href="#" className="nav-link">Contributions</Nav.Link>
        </Nav>
        <Button variant="primary" onClick={handleLogout} className="contact-button">
          Log Out
        </Button>
      </Navbar.Collapse>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" name="user_name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" name="user_email"/>
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" name="message"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={sendEmail}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
    
    
  );
}

export default Header;
