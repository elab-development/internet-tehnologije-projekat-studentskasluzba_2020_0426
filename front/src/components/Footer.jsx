import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <p className="highlighted-text">Sve je u dobroj organizaciji</p>
      </div>
      <div className="footer-col">
        <p>Jove Ilića 154, Voždovac</p>
        <a href="http://www.fon.bg.ac.rs" target="_blank" rel="noopener noreferrer">Posetite zvanični sajt</a>
      </div>
    </footer>
  );
}

export default Footer;
