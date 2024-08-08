import React from "react";
import Card from "./../../components/Card/Card.jsx";
import "./Home.css";
const Home = () => {
    return (
      <div className="d-flex flex-column min-vh-100">
       
       <main className="flex-grow-1">
        <section className="section1 d-flex justify-content-center align-items-center">
        <p style={{fontWeight: "lighter"}}>Your Future Unlocked</p></section>
        <section className="section2 d-flex justify-content-evenly p-5"><Card title={"Temp"} description={"this is a placeholder for backend retrieval"}/>
        <Card title={"Temp"} description={"this is a placeholder for backend retrieval"}/></section>
        
       </main>
     </div> 
    );
};

export default Home;