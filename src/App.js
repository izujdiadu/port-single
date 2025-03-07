import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Contact from './Contact';
import Experience from './Experience';
import Projects from './Projects';
import About from './About';
import CustomCursor from './CustomCursor';

function App() {
  return (
    <div className="project-section">
      <CustomCursor /> {/* Notre curseur personnalisé */}
      <Home />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/" element={null} />
      </Routes>
    </div>
  );
}

export default App;
