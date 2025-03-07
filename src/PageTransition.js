import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  const transitionVariants = {
    initial: {
      y: '100%', // La page commence en bas, hors de l'écran
    },
    animate: {
      y: 0,  // La page défile pour revenir à sa position d'origine
      transition: {
        duration: 0.5,  // Durée de la transition plus rapide
        ease: 'easeOut', // Effet de défilement fluide
      },
    },
    exit: {
      y: '-100%', // La page sort de l'écran par le haut
      transition: {
        duration: 0.5,  // Durée de la transition plus rapide
        ease: 'easeIn', // Effet de sortie fluide
      },
    },
  };

  return (
    <motion.div
      variants={transitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        width: '100%',
        height: '100vh',  // Prendre toute la hauteur de l'écran
        position: 'relative',  // Nécessaire pour la gestion des enfants positionnés
        overflow: 'hidden',  // Masquer le contenu sortant
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
