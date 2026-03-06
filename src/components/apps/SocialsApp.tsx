import { linkedin, github, leetcode, mainJpeg, reelJpeg } from '../../images';
import MagnetLines from '../MagnetLines';

const tiles = [
    { id: 1, title: 'LinkedIn', link: 'https://www.linkedin.com/in/aditya-gupta-a6196129a/', image: linkedin },
    { id: 2, title: 'GitHub', link: 'https://github.com/Adgu0205', image: github },
    { id: 3, title: 'LeetCode', link: 'https://leetcode.com/u/adityagupta0205/', image: leetcode },
    { id: 4, title: 'Instagram\n(Main)', link: 'https://www.instagram.com/adityaaguptaaaa/', image: mainJpeg },
    { id: 5, title: 'Instagram\n(Creator)', link: 'https://www.instagram.com/diecastsaregood/', image: reelJpeg },
];

export default function SocialsApp() {
    const firstRow = tiles.slice(0, 3);
    const secondRow = tiles.slice(3);

    return (
        <div style={{ width: '100%', height: '100%', overflowX: 'hidden', overflowY: 'auto', backgroundColor: '#000', padding: '40px 50px', color: '#fff' }}>
            <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', gap: '50px' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
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
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        {firstRow.map(tile => (
                            <a
                                key={tile.id}
                                href={tile.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    border: '1px solid #333',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    width: '180px',
                                    height: '90px',
                                    transition: 'transform 0.2s, backgroundColor 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.backgroundColor = '#111';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                <img src={tile.image} alt={tile.title} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'contain' }} />
                                <span style={{ fontSize: '15px', fontWeight: 500 }}>{tile.title}</span>
                            </a>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        {secondRow.map(tile => (
                            <a
                                key={tile.id}
                                href={tile.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    border: '1px solid #333',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    width: '180px',
                                    height: '90px',
                                    transition: 'transform 0.2s, backgroundColor 0.2s',
                                    boxSizing: 'border-box'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.backgroundColor = '#111';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                <img src={tile.image} alt={tile.title} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'contain' }} />
                                <span style={{ fontSize: '15px', fontWeight: 500, whiteSpace: 'pre-line' }}>{tile.title}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
