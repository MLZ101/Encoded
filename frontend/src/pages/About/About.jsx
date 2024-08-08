import React from "react";
import "./About.css";
import { Container, Row, Col, Image } from "react-bootstrap";

const About = () => {
  return (
    <div className="custom-bg d-flex flex-column min-vh-100 p-3">
      <Container>
        <Row className="align-items-center mb-5 sect">
          <Col className="d-flex justify-content-center">
            <Image
              src={require("../../assets/about-1.jpeg")}
              alt="About us"
              className="img-abt"
              style={{filter: "grayscale(50%)"}}
            />
          </Col>
          <Col className="brdr" style={{ borderRight: "3px solid #d56b50" }}>
            <h1 className="subtitle">Who We Are</h1>
            <p className="subtext">
              Encoded is an ed-tech company specializing in technology and
              programming. We are passionate about making learning fun and
              accessible for everyone. Our mission is to empower people to learn
              new skills and achieve their full potential.
            </p>
          </Col>
        </Row>

        <Row className="align-items-center mb-5 justify-content-center sect">
          <Col xs={12} className="video-container">
            <video
              className="bg-video"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
            >
              <source
                src={require("../../assets/bg-vid.mp4")}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Col>
        </Row>

        <Row className="align-items-center mb-5 sect">
          <Col  className="brdr" style={{ borderLeft: "3px solid #d56b50" }}>
            <h1 className="subtitle">Our Vision</h1>
            <p className="subtext">
              Our vision is to become a global leader in education technology,
              shaping the future of learning by fostering curiosity, creativity,
              and critical thinking in learners around the world. By 2030, we
              aim to reach <b>1 million learners worldwide</b>, transforming
              educational landscapes and opening new opportunities for those who
              wish to explore, learn, and excel.
            </p>
          </Col>
          <Col  className="d-flex justify-content-center">
            <Image
              src={require("../../assets/about-2.jpeg")}
              alt="Vision"
              style={{filter: "grayscale(50%)"}}
              className="img-abt"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
