import React from 'react';
import { motion } from 'framer-motion';
import './Timeline.css';

const timelineData = [
  { year: "2020", title: "Graphisme" },
  { year: "2021", title: "Design UI/UX" },
  { year: "2023", title: "Développement Web APP" },
  { year: "2024", title: "Développement App" }
];

function Timeline() {
  return (
    <div className="timeline-container">
      <motion.div 
        className="timeline-line"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      {timelineData.map((item, index) => (
        <motion.div 
          key={index} 
          className="timeline-item" 
          initial={{ opacity: 0, x: -100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: index * 0.5 }}
        >
          <div className="timeline-year">{item.year}</div>
          <div className="timeline-title">{item.title}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default Timeline;
