import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx"
import './global.css';
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx";
import About from "./pages/About/About.jsx"
import Contact from "./pages/Contact/Contact.jsx";

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>}></Route> 
      <Route path ="/about" element={<About/>}></Route>
      <Route path ="/contact" element={<Contact/>}></Route>
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
