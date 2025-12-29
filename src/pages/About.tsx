import React, { useState, useEffect } from 'react';
import { aditya, certificate } from '../images';
import DecryptText from '../components/DecryptText';

export default function About() {
  const [imgTransform, setImgTransform] = useState<string>('translate(0px, 0px) scale(1)');
  const [frameTransform, setFrameTransform] = useState<string>('rotateX(0deg) rotateY(0deg) translateZ(0px)');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showFooter, setShowFooter] = useState<boolean>(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget as HTMLDivElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width; // -0.5 .. 0.5
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    const maxX = 18; // px
    const maxY = 12; // px
    const tx = Math.round(x * maxX);
    const ty = Math.round(y * maxY);
    setImgTransform(`translate(${tx}px, ${ty}px) scale(1.03)`);

    // compute subtle 3D rotation for the outer card/frame
    const maxRotateX = 10; // degrees
    const maxRotateY = 10; // degrees
    // rotateX should react to vertical movement (invert so cursor down tilts top away)
    const rotateX = Math.round(-y * maxRotateX * 100) / 100;
    const rotateY = Math.round(x * maxRotateY * 100) / 100;
    // small translateZ to lift the card slightly when hovered
    const translateZ = 20;
    setFrameTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`);
  }

  function handleMouseLeave() {
    setImgTransform('translate(0px, 0px) scale(1)');
    setFrameTransform('rotateX(0deg) rotateY(0deg) translateZ(0px)');
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Show footer when near bottom of page
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight - 100) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="about-page" style={{ background: '#000', minHeight: '100vh', width: '100%' }}>
      <header className="about-top">
        <a href="/" className={`center-title-link ${isScrolled ? 'scrolled' : ''}`}>
          <div className="center-title">Portfolio</div>
          <div className="center-subtitle">Aditya Gupta</div>
        </a>
      </header>

      <section className="about-inner">
        <div className="about-heading-col">
          <h1 className="about-heading">About me</h1>

          {/* image placed directly below the heading per request; keeps same classes/size/parallax */}
          <div className="about-image-block">
            <div
              className="image-wrapper"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              aria-hidden
            >
              <div className="image-frame" style={{ transform: frameTransform }}>
                <img
                  id="about-image"
                  src={aditya}
                  alt="Aditya Gupta"
                  className="about-photo parallax-img"
                  style={{ transform: imgTransform }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="about-text-col">
          <div className="about-text-block">
            <p className="about-text thin">
              Hello world, I am <span className="highlight">Aditya Gupta</span> - A <span className="highlight">Computer Science Student</span> and a <span className="highlight">flourishing engineer</span>.
            </p>
            <p className="about-description">
              Consistently curious and committed to growth, I'm driven by a passion for building meaningful digital experiences and understanding the systems that power them. I enjoy exploring modern web technologies, solving real-world problems through code, and refining my craft one project at a time.
            </p>
            <DecryptText text="Learn. Build. Improve." delay={10} />
            <a href="/aditya resume.pdf" download="Aditya_Gupta_Resume.pdf" className="download-resume-btn">
              Download Resume
            </a>
          </div>
        </div>
      </section>

      <section className="certificates-expertise-container">
        <div className="certificates-section">
          <h2 className="section-heading">Certificates</h2>
          <div className="certificate-card-wrapper">
            <a href="/certificate.pdf" target="_blank" rel="noopener noreferrer" className="certificate-card">
              <img src={certificate} alt="Certificate" className="certificate-image" />
            </a>
            <a
              href="https://www.credly.com/badges/ba5c48c6-9502-4968-bf41-4e528d663995/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="credly-link"
            >
              credly
            </a>
          </div>
        </div>

        <div className="technical-expertise-section">
          <h2 className="section-heading">Technical Expertise</h2>
          <div className="expertise-grid">
            <div className="expertise-tile">
              <h3 className="tile-title">Front-end</h3>
              <ul className="tile-list">
                <li>React</li>
                <li>TypeScript</li>
                <li>JavaScript</li>
                <li>HTML/CSS</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className="expertise-tile">
              <h3 className="tile-title">Back-end</h3>
              <ul className="tile-list">
                <li>Node.js</li>
                <li>Python</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div className="expertise-tile">
              <h3 className="tile-title">Tools</h3>
              <ul className="tile-list">
                <li>Git</li>
                <li>VS Code</li>
                <li>Figma</li>
                <li>Affinity</li>
              </ul>
            </div>
            <div className="expertise-tile">
            </div>
          </div>
        </div>
      </section>

      <section className="hobbies-section">
        <h2 className="section-heading">Hobbies</h2>
        <div className="hobbies-grid">
          <div className="hobby-tile">
            <h3 className="tile-title">Sports</h3>
            <ul className="tile-list">
              <li>Badminton</li>
              <li>Squash</li>
              <li>Table Tennis</li>
              <li>Pickleball</li>
              <li>Running</li>
              <li>Football</li>
            </ul>
          </div>
          <div className="hobby-tile">
            <h3 className="tile-title">Photography</h3>
            <ul className="tile-list">
              <li>Die-cast</li>
              <li>Cars</li>
              <li>Nature</li>
              <li>Astrophotography</li>
            </ul>
          </div>
          <div className="hobby-tile">
            <h3 className="tile-title">Music</h3>
            <ul className="tile-list">
              <li>Retro</li>
              <li>Hip-Hop</li>
              <li>Instrumental</li>
            </ul>
          </div>
          <div className="hobby-tile">
            <h3 className="tile-title">Extras</h3>
            <ul className="tile-list">
              <li>Content creation</li>
              <li>Travel</li>
              <li>UI/UX Designing</li>
              <li>Video games</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className={`site-footer about-footer ${showFooter ? 'visible' : ''}`}>
        <div className="footer-inner">
          <div className="footer-left">Based in: Vadodara, India</div>
          <div className="footer-right">Open to Opportunities</div>
        </div>
      </footer>
    </main>
  );
}
