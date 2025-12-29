import { useState, useEffect } from 'react';
import { mental, dr } from '../images';

export default function Projects() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showFooter, setShowFooter] = useState<boolean>(false);

  useEffect(() => {
    function handleScroll() {
      // Header center title shift effect like About page
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Footer reveal when near bottom (same as About)
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      setShowFooter(scrollPosition >= pageHeight - 100);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="projects-page" style={{ background: '#000', minHeight: '100vh', width: '100%' }}>
      <header className="about-top">
        <a href="/" className={`center-title-link ${isScrolled ? 'scrolled' : ''}`}>
          <div className="center-title">Portfolio</div>
          <div className="center-subtitle">Aditya Gupta</div>
        </a>
      </header>
      <section className="projects-inner">
        <h1 className="projects-heading">Projects</h1>
        <div className="project-list">
          {/* First Project Tile */}
          <div className="project-tile">
            <h2 className="project-title">Mental Health Chat-bot</h2>
            
            <div className="project-content-row">
              <div className="project-image-col">
                <div className="project-image-wrapper">
                    <img 
                    src={mental} 
                    alt="Mental Health Chat-bot" 
                    className="project-image"
                  />
                </div>
              </div>

              <div className="project-info-col">
                <div className="project-info-section">
                  <h3 className="project-info-heading">About the project:</h3>
                  <p className="project-info-text">
                    A compassionate AI-powered chatbot designed to provide mental health support and resources. 
                    The platform offers a safe space for users to express their feelings and receive thoughtful, 
                    empathetic responses while connecting them with professional mental health resources.
                  </p>
                </div>

                <div className="project-info-section">
                  <h3 className="project-info-heading">Tech Stack</h3>
                  <ul className="project-tech-list">
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>OpenAI API</li>
                    <li>MongoDB</li>
                  </ul>
                </div>

                <div className="project-info-section">
                  <h3 className="project-info-heading">Deployed link:</h3>
                  <a 
                    href="https://peacepluse-soaf.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Peace-Pluse
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Second Project Tile */}
          <div className="project-tile">
            <h2 className="project-title">Portfolio for my Father</h2>
            
            <div className="project-content-row">
              <div className="project-image-col">
                <div className="project-image-wrapper">
                  <img 
                    src={dr} 
                    alt="Portfolio for my Father" 
                    className="project-image"
                  />
                </div>
              </div>

              <div className="project-info-col">
                <div className="project-info-section">
                  <h3 className="project-info-heading">About the project:</h3>
                  <p className="project-info-text">
                    This is a portfolio website created by me for my father to showcase his professional achievements, skills, and experiences.
                    It's a very basic website but delivers all the essential information regarding my father's work.
                  </p>
                </div>

                <div className="project-info-section">
                  <h3 className="project-info-heading">Tech Stack</h3>
                  <ul className="project-tech-list">
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>Node.js</li>
                  </ul>
                </div>

                <div className="project-info-section">
                  <h3 className="project-info-heading">Deployed link:</h3>
                  <a 
                    href="https://drgirishkumargupta.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Dr. Girish Kumar Gupta
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={`site-footer about-footer ${showFooter ? 'visible' : ''}`}>
        <div className="footer-inner">
          <div className="footer-left">Based in: Vadodara, India</div>
          <div className="footer-center">Open to Opportunities</div>
        </div>
      </footer>
    </main>
  );
}