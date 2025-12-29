// No hooks required; this page will be static grid of tiles
import { linkedin, github, leetcode, mainJpeg, reelJpeg } from '../images';
import MagnetLines from '../components/MagnetLines';

export default function Socials() {
  const tiles = [
    { id: 1, title: 'LinkedIn', link: 'https://www.linkedin.com/in/aditya-gupta-a6196129a/', image: linkedin },
    { id: 2, title: 'GitHub', link: 'https://github.com/Adgu0205', image: github },
    { id: 3, title: 'LeetCode', link: 'https://leetcode.com/u/axMujZfCdW/', image: leetcode },
    { id: 4, title: 'Instagram (Main)', link: 'https://www.instagram.com/adityaaguptaaaa/', image: mainJpeg },
    { id: 5, title: 'Instagram (Creator)', link: 'https://www.instagram.com/diecastsaregood/', image: reelJpeg },
  ];

  // Split into two rows: 3 tiles + 2 tiles
  const firstRow = tiles.slice(0, 3);
  const secondRow = tiles.slice(3);

  return (
    <main className="socials-page">
      <header className="socials-top">
        <a href="/" className="center-title-link-static">
          <div className="center-title">Portfolio</div>
          <div className="center-subtitle">Aditya Gupta</div>
        </a>
      </header>

      <section className="socials-inner">
        <div className="socials-header-center">
          <h1 className="socials-heading">Socials</h1>
          <p className="socials-subtitle">below are the links to all my socials</p>
        </div>

        <div className="socials-content-row">
          <div className="socials-left">
            <MagnetLines
              rows={9}
              columns={9}
              containerSize="60vmin"
              lineColor="#efefef"
              lineWidth="0.8vmin"
              lineHeight="5vmin"
              baseAngle={-10}
              style={{ margin: '0 auto' }}
            />
          </div>

          <div className="socials-right">
            <div className="socials-tiles-container">
              <div className="socials-tiles-track">
                <div className="socials-row first-row">
                  {firstRow.map((tile) => (
                    <a
                      key={tile.id}
                      href={tile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-tile"
                    >
                      <div className="social-tile-body">
                        <div className="social-tile-image-link">
                          <img src={tile.image} alt={tile.title} className="social-tile-image" />
                        </div>
                        <div className="social-tile-info">
                          <div className="social-tile-title">{tile.title}</div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="socials-row second-row">
                  {secondRow.map((tile) => (
                    <a
                      key={tile.id}
                      href={tile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-tile"
                    >
                      <div className="social-tile-body">
                        <div className="social-tile-image-link">
                          <img src={tile.image} alt={tile.title} className="social-tile-image" />
                        </div>
                        <div className="social-tile-info">
                          <div className="social-tile-title">{tile.title}</div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
