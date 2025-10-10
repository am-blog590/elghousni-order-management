import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // crée ce fichier si tu ne l'as pas encore

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

