import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importer useNavigate et useLocation pour la navigation
import MbappeTitle from './MbappeTitle'; // Import du composant

function RealMadrid() {
  const navigate = useNavigate();
  const location = useLocation(); // Pour récupérer la route actuelle
  const [currentPage, setCurrentPage] = useState('real-madrid');

  // Fonction pour naviguer entre les pages
  const handleSwitch = (direction) => {
    if (direction === 'right' && currentPage !== 'real-madrid') {
      setCurrentPage('real-madrid');
      navigate('/real-madrid');
    } else if (direction === 'left') {
      navigate(-1); // Revenir à la page précédente dans l'historique (ici "Buts.js")
    }
  };

  useEffect(() => {
    setCurrentPage(location.pathname.substring(1)); // Met à jour la page actuelle en fonction de l'URL
  }, [location]);

  return (
    <div className="RealMadridTab">
      <MbappeTitle />
      <h1>Bienvenue sur la page Real Madrid!</h1>
      <p>Contenu spécifique à la page Real Madrid de Mbappé.</p>

      <div className="SwitchTab">
        <div className="SwitchButton">
          <button 
            className="ArrowButton" 
            onClick={() => handleSwitch('left')}
          >
            &lt;
          </button>
          <button 
            className="ArrowButton" 
            onClick={() => handleSwitch('right')}
            disabled={currentPage === 'real-madrid'} // Désactive la flèche droite si on est sur "Real Madrid"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default RealMadrid;
