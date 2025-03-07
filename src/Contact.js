import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

function Contact() {
  // Nombre de bulles du plateau
  const numBubbles = 40;
  // Taille d'une bulle (doit correspondre au CSS)
  const bubbleSize = 60;
  const squaredBubbleSize = bubbleSize * bubbleSize; // pour l'optimisation de collision

  // Définition des types de bulles (couleur, icône)
  const bubbleTypes = [
    { className: 'linkedin', icon: <FaLinkedin title="LinkedIn" />, bgColor: '#0077b5' },
    { className: 'github', icon: <FaGithub title="GitHub" />, bgColor: '#000000' },
    { className: 'gmail', icon: <FaEnvelope title="Gmail" />, bgColor: '#D44638' },
  ];

  // Génération des bulles du plateau (zone du haut)
  const generateTopBubbles = () => {
    const bubbles = [];
    for (let i = 0; i < numBubbles; i++) {
      const x = Math.random() * (window.innerWidth - bubbleSize);
      const y = Math.random() * ((window.innerHeight * 0.4) - bubbleSize);
      const randomType = bubbleTypes[Math.floor(Math.random() * bubbleTypes.length)];
      bubbles.push({ id: i, x, y, type: randomType });
    }
    return bubbles;
  };

  const [topBubbles, setTopBubbles] = useState(generateTopBubbles());
  // Pour générer des id uniques pour les bulles ajoutées lors d'une collision ratée
  const nextId = useRef(numBubbles);

  // Génération de la bulle tireuse (en bas, centrée)
  const generateShooterBubble = () => {
    const randomType = bubbleTypes[Math.floor(Math.random() * bubbleTypes.length)];
    return {
      x: window.innerWidth / 2.5 - bubbleSize / 2,
      y: window.innerHeight - bubbleSize - 20, // marge en bas
      type: randomType,
      isShot: false,
      angle: 0,
    };
  };

  const [shooterBubble, setShooterBubble] = useState(generateShooterBubble());
  // Pour dessiner la ligne de visée, on suit la position de la souris
  const [aim, setAim] = useState(null);
  const animationRef = useRef();

  // État pour gérer l'animation de reset
  const [resetAnim, setResetAnim] = useState(false);

  // Variantes pour l'animation d'apparition des bulles du plateau
  const topBubblesContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05, // 40 bulles * 0.05 = 2 secondes au total
      },
    },
  };

  const topBubbleVariants = {
    hidden: { opacity: 0, y: -100, scale: 0 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  };

  const shooterBubbleVariants = {
    hidden: { opacity: 0, y: 100, scale: 0 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { delay: 1, duration: 0.5, ease: 'easeInOut' } },
  };


  // En cliquant sur la zone de jeu, on calcule l'angle de tir
  const handleClick = (e) => {
    if (shooterBubble.isShot) return;
    // On vérifie que le clic ne vient pas d'un élément cliquable (liens ou bouton)
    if (e.target.closest('a') || e.target.closest('button')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const shooterCenterX = shooterBubble.x + bubbleSize / 2;
    const shooterCenterY = shooterBubble.y + bubbleSize / 2;
    const dx = clickX - shooterCenterX;
    const dy = clickY - shooterCenterY;
    const angle = Math.atan2(dy, dx);
    setShooterBubble((prev) => ({ ...prev, isShot: true, angle }));
    // Efface la visée dès le tir
    setAim(null);
  };

  // Met à jour la ligne de visée avec le mouvement de la souris (si la bulle n'est pas tirée)
  const handleMouseMove = (e) => {
    if (shooterBubble.isShot) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setAim({ x: mouseX, y: mouseY });
  };

  // Réinitialise la bulle tireuse
  const resetShooter = () => {
    setShooterBubble(generateShooterBubble());
  };

  // Réinitialise l'ensemble du jeu (plateau et tireuse) avec une animation
  const resetGame = () => {
    setResetAnim(true);
    setTimeout(() => {
      setTopBubbles(generateTopBubbles());
      resetShooter();  // Utilisation de la fonction resetShooter mémorisée
      setAim(null);
      setResetAnim(false);
    }, 700);
  };

  // Boucle d'animation pour déplacer la bulle tireuse
  useEffect(() => {
    const speed = 10; // Vitesse en pixels par frame
    const update = () => {
      setShooterBubble((prev) => {
        if (!prev.isShot) return prev;
        const newX = prev.x + speed * Math.cos(prev.angle);
        const newY = prev.y + speed * Math.sin(prev.angle);

        // Détection de collision avec une bulle du plateau
        let collidedBubble = null;
        for (let bubble of topBubbles) {
          const shooterCenterX = newX + bubbleSize / 2;
          const shooterCenterY = newY + bubbleSize / 2;
          const bubbleCenterX = bubble.x + bubbleSize / 2;
          const bubbleCenterY = bubble.y + bubbleSize / 2;
          const dx = shooterCenterX - bubbleCenterX;
          const dy = shooterCenterY - bubbleCenterY;
          if (dx * dx + dy * dy < squaredBubbleSize) {
            collidedBubble = bubble;
            break;
          }
        }

        if (collidedBubble) {
          if (collidedBubble.type.bgColor === prev.type.bgColor) {
            setTopBubbles((oldBubbles) =>
              oldBubbles.filter((b) => b.id !== collidedBubble.id)
            );
          } else {
            setTopBubbles((oldBubbles) => [
              ...oldBubbles,
              { id: nextId.current++, x: newX, y: newY, type: prev.type },
            ]);
          }
          resetShooter();
          cancelAnimationFrame(animationRef.current);
          return prev;
        }

        // Réinitialisation si la bulle tireuse sort de la zone de jeu
        if (
          newX < 0 ||
          newX > window.innerWidth - bubbleSize ||
          newY < 0 ||
          newY > window.innerHeight - bubbleSize
        ) {
          resetShooter();
          cancelAnimationFrame(animationRef.current);
          return prev;
        }

        return { ...prev, x: newX, y: newY };
      });
      animationRef.current = requestAnimationFrame(update);
    };

    animationRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationRef.current);
  }, [shooterBubble.isShot, topBubbles, squaredBubbleSize, resetShooter]);

  // Calcul de la ligne de visée (affichée tant que la bulle n'est pas tirée)
  let aimLine = null;
  if (!shooterBubble.isShot && aim) {
    const centerX = shooterBubble.x + bubbleSize / 2;
    const centerY = shooterBubble.y + bubbleSize / 2;
    const dx = aim.x - centerX;
    const dy = aim.y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const normX = dx / dist;
    const normY = dy / dist;
    aimLine = {
      x1: centerX,
      y1: centerY,
      x2: centerX + normX * 100,
      y2: centerY + normY * 100,
    };
  }

  return (
    <div
      className={`contact-container ${resetAnim ? 'reset-animation' : ''}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      {/* Plateau de bulles (zone du haut) */}
      <div className="contact-bubblesTab">
        <motion.div
          className="contact-bubbles"
          variants={topBubblesContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {topBubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              className={`contact-bubble ${bubble.type.className}`}
              variants={topBubbleVariants}
              style={{
                backgroundColor: bubble.type.bgColor,
                left: bubble.x,
                top: bubble.y,
                position: 'absolute',
              }}
            >
              <span className="bubble-icon">{bubble.type.icon}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bulle tireuse (affichée en bas) */}
      <motion.div
        className="contact-bottom-bubble"
        style={{
          left: shooterBubble.x,
          top: shooterBubble.y,
          position: 'absolute',
        }}
        variants={shooterBubbleVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className={`contact-bubble ${shooterBubble.type.className}`}
          style={{ backgroundColor: shooterBubble.type.bgColor }}
        >
          <span className="bubble-icon">{shooterBubble.type.icon}</span>
        </div>
      </motion.div>

      {/* Ligne de visée */}
      {!shooterBubble.isShot && aimLine && (
        <svg
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <line
            x1={aimLine.x1}
            y1={aimLine.y1}
            x2={aimLine.x2}
            y2={aimLine.y2}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Bouton Reset avec aria-label */}
      <button
        className="reset-button"
        aria-label="Réinitialiser le jeu"
        onClick={(e) => {
          e.stopPropagation();
          resetGame();
        }}
      >
        Reset
      </button>

      {/* Partie "Contact" (titre et liens) */}
      <div className="contact-part">
        <div className="contact-name">
          <h1>CONTACTEZ MOI</h1>
        </div>
        <div className="contact-links">
          <a href="https://github.com/izujdiadu" aria-label="Voir mon GitHub" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/noa-kivuila-190135220/" aria-label="Voir mon LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="mailto:nngkvl@gmail.com" aria-label="Envoyer un e-mail">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
