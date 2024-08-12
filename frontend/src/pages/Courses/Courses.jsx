import "./Courses.css";
import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "../../components/Card/Card.jsx"; 

const coursesData = [
    {
        title: "Course 1",
        description: "This is a brief description of Course 1.",
    },
    {
        title: "Course 2",
        description: "This is a brief description of Course 2.",
    },
    {
        title: "Course 3",
        description: "This is a brief description of Course 3.",
    },

];

const Courses = () => {
    return (
        <div className="courses-main d-flex justify-content-center align-items-center">
            <Row>
                {coursesData.map((course, index) => (
                    <Col key={index} xs={12} sm={6} md={4} className="mb-4">
                        <Card title={course.title} description={course.description} imgSrc={course.imgSrc} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Courses;
