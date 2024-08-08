// import React from "react";
import React, { useState } from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Header() {
  const [showLogin, setShowLogin] = useState(false); 
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="shadow-lg"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" id="main">
            Encoded
            <img
              className="logo"
              src={require("../../assets/logo.jpg")}
              alt="logo"
              style={{ opacity: "0.9", marginLeft: "10px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="navv">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="navv">About</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="navv">Contact</Nav.Link>
            </Nav>
            <Nav>
              {!isLoggedIn ? (
                
                <Button variant="outline-light" onClick={handleLoginShow} className="navv">
                  Login
                </Button>
              ) : (
                
                <Nav.Link as={Link} to="/profile" className="navv">Profile</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={handleLoginClose} centered className='mdl'>
        <Modal.Header closeButton style={{color:"#d56b50"}}>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p className="register-link text-white">
            Don't have an account?{' '}
            <span className="link" onClick={() => { handleLoginClose(); handleRegisterShow(); }}>
              Register here
            </span>
          </p>
        </Modal.Footer>
      </Modal>

      {/* Register Modal */}
      <Modal show={showRegister} onHide={handleRegisterClose} centered className='text-white'>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
