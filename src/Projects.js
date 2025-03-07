import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';


// Génère un tableau de "count" valeurs aléatoires entre min et max
const generateRandomArray = (min, max, count = 4) =>
  Array.from({ length: count }, () => Math.random() * (max - min) + min);

function Projects() {
  const customParams = useMemo(() => ({
    piece1: { 
      oscillation: { 
        x: generateRandomArray(-300, 300, 4), 
        y: generateRandomArray(-300, 300, 4)
      }, 
      mergedOffset: { x: 0, y: 0 },
      delay: 0
    },
    piece2: { 
      oscillation: { 
        x: generateRandomArray(-300, 300, 4), 
        y: generateRandomArray(-300, 300, 4)
      }, 
      mergedOffset: { x: 0, y: 0 },
      delay: 0.1
    },
    piece3: { 
      oscillation: { 
        x: generateRandomArray(-300, 300, 4), 
        y: generateRandomArray(-300, 300, 4)
      }, 
      mergedOffset: { x: 0, y: 0 },
      delay: 0.2
    },
    piece4: { 
      oscillation: { 
        x: generateRandomArray(-300, 300, 4), 
        y: generateRandomArray(-300, 300, 4)
      }, 
      mergedOffset: { x: 0, y: 0 },
      delay: 0.3
    }
  }), []);

  const pieceVariants = {
    explode: (custom) => ({
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    }),
    split: (custom) => ({
      x: custom.oscillation.x,
      y: custom.oscillation.y,
      scale: 1,
      transition: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
    }),
    merged: (custom) => ({
      x: custom.mergedOffset.x,
      y: custom.mergedOffset.y,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut", delay: custom.delay }
    }),
    scatter: (custom) => ({
      x: 1000,
      y: -1000,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut", delay: custom.delay }
    })
  };

  const PuzzlePiece = ({ className, customKey, animateVariant, initialVariant }) => (
    <motion.div
      className={className}
      custom={customParams[customKey]}
      variants={pieceVariants}
      initial={initialVariant}
      animate={animateVariant}
    />
  );

  const Puzzle = ({ projectId, selectedProject, isResetting }) => {
    const isSelected = selectedProject === projectId;
    const animateVariant = selectedProject === null 
      ? "split" 
      : (isSelected ? "merged" : "scatter");

    const containerVariants = selectedProject === null 
      ? { width: "calc(50% - 10px)", height: "calc(50% - 10px)", scale: 1.2 }
      : (isSelected ? { width: "100%", height: "100%", scale: 1 } : { width: "calc(50% - 10px)", height: "calc(50% - 10px)", scale: 1.2 });
    
    return (
      <motion.div
        className={`puzzle ${projectId} ${selectedProject && isSelected ? "merged" : ""}`}
        initial={selectedProject === null ? "explode" : (isSelected ? "merged" : "scatter")}
        animate={isResetting ? "scatter" : animateVariant}
        variants={containerVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <PuzzlePiece className="piece piece1" customKey="piece1" animateVariant={animateVariant} initialVariant="explode" />
        <PuzzlePiece className="piece piece2" customKey="piece2" animateVariant={animateVariant} initialVariant="explode" />
        <PuzzlePiece className="piece piece3" customKey="piece3" animateVariant={animateVariant} initialVariant="explode" />
        <PuzzlePiece className="piece piece4" customKey="piece4" animateVariant={animateVariant} initialVariant="explode" />
      </motion.div>
    );
  };

  const [selectedProject, setSelectedProject] = useState(null);
  const [isResetting, setIsResetting] = useState(false);

  const handleSelect = (proj) => {
    if (selectedProject === proj) {
      setIsResetting(true);
      setTimeout(() => {
        setSelectedProject(null);
        setIsResetting(false);
      }, 800);
    } else {
      setSelectedProject(proj);
    }
  };

  return (
    <div className="projects-container">
      <div className="projects-name">
        <h1>MY PROJECTS</h1>
      </div>

      <div className="project-buttons">
        <button 
          className={selectedProject === "project1" ? "selected" : ""} 
          onClick={() => handleSelect("project1")}
        >
          Proj 1
        </button>
        <button 
          className={selectedProject === "project2" ? "selected" : ""} 
          onClick={() => handleSelect("project2")}
        >
          Proj 2
        </button>
        <button 
          className={selectedProject === "project3" ? "selected" : ""} 
          onClick={() => handleSelect("project3")}
        >
          Proj 3
        </button>
        <button 
          className={selectedProject === "project4" ? "selected" : ""} 
          onClick={() => handleSelect("project4")}
        >
          Proj 4
        </button>
      </div>

      <div className="projects-puzzle">
        <div className="puzzle-grid">
          <Puzzle projectId="project1" selectedProject={selectedProject} isResetting={isResetting} />
          <Puzzle projectId="project2" selectedProject={selectedProject} isResetting={isResetting} />
          <Puzzle projectId="project3" selectedProject={selectedProject} isResetting={isResetting} />
          <Puzzle projectId="project4" selectedProject={selectedProject} isResetting={isResetting} />
        </div>
      </div>
    </div>
  );
}

export default Projects;
