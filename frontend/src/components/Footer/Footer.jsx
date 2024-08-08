import "./Footer.css";

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4}>
            <img src={require('../../assets/logoW.png')} alt="logo-white"
            id="logo"/>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Email: mhmdhsenmalli123@gmail.com</li>
              <li>Phone: +961 81457080</li>
              <li>Available 24/7</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex gap-3">
              <li className="mr-3">
                <a href="https://facebook.com" className="text-white">
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
              </li>
              <li className="mr-3">
                <a href="https://twitter.com" className="text-white">
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-white">
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="text-center mt-3">
        <p> <b>&copy; {new Date().getFullYear()} Encoded.</b> All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
