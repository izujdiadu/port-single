import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';
import logo from './Images/nkvl.png';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // La position du logo est stockée dans localStorage : 'center' ou 'top'
  const [logoPosition, setLogoPosition] = useState(() => {
    return localStorage.getItem('logoPosition') || 'center';
  });

  const [bgColor, setBgColor] = useState('#A78BFA'); // Couleur de fond initiale

  // Variants pour l'animation du background (défilement horizontal)
  const bgVariants = {
    initial: { x: '100%' },
    animate: { 
      x: 0,
      backgroundColor: bgColor,
      transition: { duration: 0.5, ease: 'linear' }
    },
    exit: { 
      x: '-100%',
      backgroundColor: bgColor,
      transition: { duration: 0.5, ease: 'linear' }
    },
  };

  useEffect(() => {
    if (location.pathname !== '/') {
      // Sur une page non-home, le logo monte
      if (logoPosition !== 'top') {
        setLogoPosition('top');
        localStorage.setItem('logoPosition', 'top');
      }
      setBgColor('white'); // Fond blanc sur les pages non-home
    } else {
      // Sur la page d'accueil, le logo reste centré
      if (logoPosition !== 'center') {
        setLogoPosition('center');
        localStorage.setItem('logoPosition', 'center');
      }
      setBgColor('transparent');
    }
  }, [location.pathname, logoPosition]);

  // Gestion du clic sur le logo
  const handleLogoClick = (e) => {
    if (location.pathname !== '/' && logoPosition === 'top') {
      e.preventDefault();
      setLogoPosition('center');
      localStorage.setItem('logoPosition', 'center');
      setTimeout(() => {
        navigate('/');
      }, 70);
    }
  };

  return (
    <div className={`home-container ${bgColor === 'white' ? 'white-bg' : ''}`}>
      {/* Animation du background */}
      <motion.div
        className="home-bg"
        variants={bgVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        key={bgColor}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '18.5%', // Ta largeur ajustée
          height: '100%',
          zIndex: -1,   // Fond derrière le contenu
        }}
      />

      {/* Logo et texte */}
      <div className={`logo-container ${logoPosition === 'top' ? 'logo-top' : ''}`}>
        <Link to="/" onClick={handleLogoClick}>
          <img src={logo} alt="NKVL Logo" className="logo" />
        </Link>
        <h1>Made by NKVL.</h1>
      </div>

      {/* Boutons de navigation */}
      <div className="button-container">
        <Link to="/about">
          <button className={location.pathname === "/about" ? "active" : ""} aria-label="About Section">
            About
          </button>
        </Link>
        <Link to="/projects">
          <button className={location.pathname === "/projects" ? "active" : ""} aria-label="Projects Section">
            Projects
          </button>
        </Link>
        <Link to="/experience">
          <button className={location.pathname === "/experience" ? "active" : ""} aria-label="Experience Section">
            Experience
          </button>
        </Link>
        <Link to="/contact">
          <button className={location.pathname === "/contact" ? "active" : ""} aria-label="Contact Section">
            Contact
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
