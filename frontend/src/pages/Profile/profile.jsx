
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./profile.css";
import Card from "../../components/Card/Card";
import useAuth from "../../context&hook/useAuth.jsx";
import axios from "axios";
import { useEffect } from "react";

const Profile = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [profileCourses, setCourses] = useState([]);


  const cardData = (
    <>
      {user.userEmail}
      <br />
      {user.userRole}
      <br />
      <br />
      <i>{"Click to see more details"}</i>
    </>
  );

  const handleOpenModal = async () => {
    setShowModal(true);
  };


  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5119/api/profile/${user.userID}/instr-courses`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };
  
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5119/api/profile/${user.userID}/st-courses`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };
    if (user.userRole.toLowerCase() === "instructor") {
      fetchInstructorCourses();
    } else {
      fetchStudentCourses();
    }
  }, [user.userID, user.userRole, profileCourses]);
  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="profile-main">
      <img
        src={require("../../assets/user-logo.png")}
        alt="user-logo"
        id="user"
      />
      <div onClick={handleOpenModal}>
        <Card title={user.userName} description={cardData} />
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "white" }}>{user.userName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Email:</strong> {user.userEmail}
          </p>
          <p>
            <strong>Role:</strong> {user.userRole}
          </p>
          <p>
            {user.userRole === "instructor" ? (
              <strong>Courses Given:</strong>
            ) : (
              <strong>Courses Enrolled in:</strong>
            )}
          </p>

          {profileCourses.map((course, i) => ( 
            <li key={i}>{course}</li>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;

