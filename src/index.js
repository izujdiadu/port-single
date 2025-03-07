import React from 'react';
import ReactDOM from 'react-dom/client'; // Importation de 'react-dom/client' pour React 18
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

// Utilisation de createRoot avec le nouvel API de React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
