import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="d-flex flex-column min-vh-100 overflow-hidden">
            <main className="flex-grow-1">
                <section className="section1 d-flex justify-content-center align-items-center">
                    <p style={{ fontWeight: "lighter" }}>Your Future Unlocked</p>
                </section>
                <section className="section2 d-flex justify-content-center align-items-center">
                    <div className="overlay-container">
                        <Link to="/courses">
                            <img 
                                src={require("../../assets/bg-3.jpg")} 
                                alt="bg" 
                                className="bg-image" 
                                style={{ cursor: "pointer" }} 
                            />
                            <p className="discover-button" variant="light">Discover Courses</p>
                        </Link>
                        
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
