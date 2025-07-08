import React, { useState, useEffect } from 'react';

const Home = () => {
  const words = ["Developer", "Designer", "Creator", "Innovator"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delayBeforeDeleting = 1500;
  const delayBeforeTyping = 500;

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const fullWord = words[currentWordIndex];

      if (isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        timer = setTimeout(handleTyping, deletingSpeed);
      } else {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        timer = setTimeout(handleTyping, typingSpeed);
      }

      if (!isDeleting && currentText === fullWord) {
        clearTimeout(timer);
        timer = setTimeout(() => setIsDeleting(true), delayBeforeDeleting);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        clearTimeout(timer);
        timer = setTimeout(handleTyping, delayBeforeTyping);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentWordIndex, currentText, isDeleting]);

  return (
    <section id="home">
      <h1 className="hero-title">
        Hello from <span className="animated-text-wrapper"><span className="animated-text">{currentText}</span>
        <span className="cursor">|</span></span>
      </h1>
      <p>Crafting beautiful and functional experiences from pixel to code.</p>
    </section>
  );
};

export default Home;