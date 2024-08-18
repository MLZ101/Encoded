import "./Courses.css";
import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import Card from "../../components/Card/Card.jsx";
import axios from "axios";
import { useEffect } from "react";
import  useAuth  from "../../context&hook/useAuth.jsx";


const Courses = () => {
    const { user } = useAuth(); 
    const [coursesData, setCoursesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5119/api/courses/with-instructors');
                setCoursesData(response.data);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            }
        };

        fetchCourses();
    }, []);

    const handleCardClick = async (course) => {
        setSelectedCourse(course);
        setShowModal(true);
    
        try {
            const response = await axios.get(`http://localhost:5119/api/enrollment/${course.id}/enrollment-count`);
            setSelectedCourse(prevState => ({
                ...prevState,
                enrolledCount: response.data
            }));
        } catch (error) {
            console.error("Failed to fetch enrollment count", error);
        }
    };
    

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCourse(null);
    };

    const handleEnroll = async () => {
        try {
            if (!user) {
                alert("Login to be able to enroll in the course");
                console.error("User not logged in");
                return;
            }
            console.log("user from inside enroll function", user);
            await axios.post('http://localhost:5119/api/enrollment', {
                courseId: selectedCourse.id,
                userId: user.userID, 
            });



            const response = await axios.get('http://localhost:5119/api/courses/with-instructors');
            setCoursesData(response.data);

            handleCloseModal();
        } catch (error) {
            console.error("Failed to enroll in the course", error);
        }
    };

    return (
        <div className="courses-main">
            <Row className="test">
                {coursesData.map((course, index) => (
                    <Col key={index} className="m-4">
                        <div onClick={() => handleCardClick(course)}>
                            <Card title={course.courseName} description={course.description} />
                        </div>
                    </Col>
                ))}
            </Row>

            {selectedCourse && (
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ color: "white" }}>{selectedCourse.courseName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{selectedCourse.description}</p>
                        <p>Given by the instructor {selectedCourse.instructorName}</p>
                        <p>Students Enrolled: {selectedCourse.enrolledCount}</p>
                    </Modal.Body>
                    <Modal.Footer>{
                    user.userRole === "student" ?
                        <Button variant="primary" onClick={handleEnroll}>
                            Enroll
                        </Button> : <></>
                        }
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Courses;
