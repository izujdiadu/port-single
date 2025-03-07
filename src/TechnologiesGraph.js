import React from 'react';
import { motion } from 'framer-motion';
import './TechnologiesGraph.css';

const techData = [
  { name: "HTML/CSS", percent: 95 },
  { name: "React", percent: 90 },
  { name: "Python", percent: 80 },
  { name: "Java", percent: 70 },
  { name: "JavaScript", percent: 85 }
];

const TechnologyCircle = ({ name, percent }) => {
  const degree = (percent / 100) * 360;

  return (
    <div className="tech-item">
      <motion.div
        className="tech-circle"
        initial={{ background: 'conic-gradient(#ddd 0deg, #ddd 0deg)' }}
        animate={{ background: `conic-gradient(#A78BFA ${degree}deg, #ddd ${degree}deg)` }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <div className="tech-percent">{percent}%</div>
      </motion.div>
      <div className="tech-name">{name}</div>
    </div>
  );
};

function TechnologiesGraph() {
  return (
    <div className="tech-container">
      {techData.map((tech, index) => (
        <TechnologyCircle key={index} name={tech.name} percent={tech.percent} />
      ))}
    </div>
  );
}

export default TechnologiesGraph;
