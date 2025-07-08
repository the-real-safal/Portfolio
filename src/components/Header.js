import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute('href');
    const location = document.querySelector(target).offsetTop;

    window.scrollTo({
      left: 0,
      top: location - 60,
    });
    setMenuOpen(false); // Close menu on link click
  };

  return (
    <header className={`${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="nav-brand">
            Mr.<b>Safal</b><span className="purple-dot">.</span>
        </div>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className="nav-links">
        <ul>
          <li><a href="#home" onClick={handleClick}><FaHome /> <span>Home</span></a></li>
          <li><a href="#about" onClick={handleClick}><FaUser /> <span>About</span></a></li>
          <li><a href="#projects" onClick={handleClick}><FaProjectDiagram /> <span>Projects</span></a></li>
          <li><a href="#contact" onClick={handleClick}><FaEnvelope /> <span>Contact</span></a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;