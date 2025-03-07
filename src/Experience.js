import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Experience.css';
import project1 from './Images/project1.jpg'; // Image du projet 1
import project2 from './Images/project2.jpg'; // Image du projet 2
import project3 from './Images/project3.jpg'; // Image du projet 3
import project4 from './Images/project4.jpg'; // Image du projet 4

function Experience() {
  // Pour le hover (preview)
  const [paused, setPaused] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [projectTitle, setProjectTitle] = useState('EXPERIENCES');
  // Pour la vue projet
  const [selectedProject, setSelectedProject] = useState(null);

  const projectImages = {
    project1: project1,
    project2: project2,
    project3: project3,
    project4: project4,
  };

  const projectNames = {
    project1: 'UI/UX Designer',
    project2: 'Web Developer',
    project3: 'App Developer',
    project4: 'Fullstack Developer',
  };

  const projectDescriptions = {
    project1:
      "Dans ce projet UI/UX, l'accent est mis sur la création d'interfaces intuitives et esthétiques, avec un design centré sur l'utilisateur.",
    project2:
      "Ce projet de développement web présente des solutions interactives, un code moderne et une expérience utilisateur optimisée.",
    project3:
      "Le projet d'application mobile offre une expérience fluide et innovante, alliant design et fonctionnalités avancées.",
    project4:
      "Ce projet fullstack combine les meilleures pratiques du front-end et du back-end pour une solution complète et performante.",
  };

  // Gestion du hover (uniquement en mode initial)
  const handleMouseEnter = (project) => {
    if (!selectedProject) {
      setPaused(true);
      setActiveProject(projectImages[project]);
      setProjectTitle(projectNames[project]);
    }
  };

  const handleMouseLeave = () => {
    if (!selectedProject) {
      setPaused(false);
      setActiveProject(null);
      setProjectTitle('EXPERIENCES');
    }
  };

  // Lorsqu'on clique sur un "YEAR", on passe en mode projet
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  // Pour revenir à la vue initiale
  const handleBack = () => {
    setSelectedProject(null);
  };

  // Variantes d'animation pour le container du disque
  const diskContainerVariants = {
    initial: {
      width: 600,
      height: 600,
      top: "50%",
      left: "50%",
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.8 }
    },
    project: {
      width: 150,
      height: 150,
      top: "10px",    // Disque positionné en haut à gauche
      left: "10px",
      x: "0%",
      y: "0%",
      transition: { duration: 0.8 }
    }
  };

  // Variantes pour l'image du projet
  const imageVariants = {
    initial: {
      x: 0,
      y: 0,
      scale: 0.5,
      opacity: 0
    },
    animate: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: {
      x: 0,
      y: 0,
      scale: 0.5,
      opacity: 0,
      transition: { duration: 0.8, ease: "easeIn" }
    }
  };

  // Variantes pour le texte du projet
  const textVariants = {
    initial: {
      y: 100,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: { duration: 0.8, ease: "easeIn" }
    }
  };

  return (
    <div className="experience-container">
      {/* Container du disque qui s'anime */}
      <motion.div
        className="disk-container"
        variants={diskContainerVariants}
        animate={selectedProject ? "project" : "initial"}
        initial="initial"
      >
        <div className={`rotating-elements ${paused && !selectedProject ? 'paused' : ''}`}>
          <div className="disk"></div>
          <svg className="circular-text" viewBox="0 0 400 400">
            <defs>
              <path id="circlePath" d="M200,10 a190,190 0 1,1 0,380 a190,190 0 1,1 0,-380" />
            </defs>
            <text className="year-text">
              <textPath xlinkHref="#circlePath" startOffset="50%" textAnchor="middle">
                <tspan
                  className="year-item"
                  onMouseEnter={() => handleMouseEnter('project1')}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleProjectSelect('project1')}
                >
                  YEAR 1
                </tspan>
                <tspan> • </tspan>
                <tspan
                  className="year-item"
                  onMouseEnter={() => handleMouseEnter('project2')}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleProjectSelect('project2')}
                >
                  YEAR 2
                </tspan>
                <tspan> • </tspan>
                <tspan
                  className="year-item"
                  onMouseEnter={() => handleMouseEnter('project3')}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleProjectSelect('project3')}
                >
                  YEAR 3
                </tspan>
                <tspan> • </tspan>
                <tspan
                  className="year-item"
                  onMouseEnter={() => handleMouseEnter('project4')}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleProjectSelect('project4')}
                >
                  YEAR 4
                </tspan>
                <tspan> • </tspan>
              </textPath>
            </text>
          </svg>
        </div>
        {/* En mode initial, affiche l'image en hover dans le disque */}
        {activeProject && !selectedProject && (
          <div className="project-disk-container">
            <img className="project-disk" src={activeProject} alt="Project" />
          </div>
        )}
        {/* En mode initial, affiche le titre ; en mode projet, on n'affiche que la croix */}
        {!selectedProject && (
          <div className="center-text">
            <h1>{projectTitle}</h1>
          </div>
        )}
        {selectedProject && (
          <div className="cross-overlay" onClick={handleBack}>
            &#x2715;
          </div>
        )}
      </motion.div>

      {/* Vue Projet : L'image sort du disque et se place au centre, le texte arrive par le bas */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="project-view" initial="initial" animate="animate" exit="exit">
            <motion.img
              className="project-full-image"
              src={projectImages[selectedProject]}
              alt={projectNames[selectedProject]}
              variants={imageVariants}
            />
            <motion.div className="project-text" variants={textVariants}>
              <h1>{projectNames[selectedProject]}</h1>
              <p>{projectDescriptions[selectedProject]}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Experience;
