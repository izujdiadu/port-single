import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import './About.css';
import TechnologiesGraph from './TechnologiesGraph';
import Timeline from './Timeline';

const contentData = [
  {
    title: "Présentation",
    content: "Bonjour ! Je suis un développeur passionné par l'innovation et la technologie. J'aime créer des solutions élégantes et performantes pour répondre aux besoins du monde moderne."
  },
  {
    title: "Parcours Scolaire & Compétences",
    content: <Timeline />
  },
  {
    title: "Technologies",
    content: <TechnologiesGraph />
  }
];

function About() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState(0);

  const openEnvelope = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const closeEnvelope = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    setCurrentPart(0);
  };

  const nextPart = (e) => {
    e.stopPropagation();
    if (currentPart < contentData.length - 1) {
      setCurrentPart(currentPart + 1);
    }
  };

  const prevPart = (e) => {
    e.stopPropagation();
    if (currentPart > 0) {
      setCurrentPart(currentPart - 1);
    }
  };

  return (
    <div className="about-container">
      <div className="envelope-container">
        <motion.div
          className="envelope-flap"
          initial={{ y: 0 }}
          animate={isOpen ? { y: "-80%" } : { y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="about-title-on-envelope">
            <h1>ABOUT ME</h1>
          </div>
          {!isOpen && (
            <button className="open-btn" onClick={openEnvelope}></button>
          )}
        </motion.div>

        <div className="envelope-body">
          <AnimatePresence exitBeforeEnter>
            {isOpen && (
              <motion.div
                key={currentPart}
                className="envelope-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <button className="close-btn" onClick={closeEnvelope}>
                  <FaTimes />
                </button>
                <h2>{contentData[currentPart].title}</h2>
                <div>{contentData[currentPart].content}</div>
                <div className="navigation">
                  {currentPart > 0 && (
                    <button className="nav-btn" onClick={prevPart}>←</button>
                  )}
                  {currentPart < contentData.length - 1 && (
                    <button className="nav-btn" onClick={nextPart}>→</button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default About;
