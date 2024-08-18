import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx"
import './global.css';
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx";
import About from "./pages/About/About.jsx"
import Contact from "./pages/Contact/Contact.jsx";
import { AuthProvider } from "./context&hook/AuthContext.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import Profile from "./pages/Profile/profile.jsx";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>}></Route> 
      <Route path ="/about" element={<About/>}></Route>
      <Route path ="/contact" element={<Contact/>}></Route>
      <Route path ="/courses" element={<Courses/>}></Route>
      <Route path ="/profile" element={<Profile/>}></Route>
    </Routes>
    <Footer />
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
