import React, { useState } from 'react';
import { certificate } from '../../images';

const TiltImage = ({ src, alt }: { src: string; alt: string }) => {
    const [imgTransform, setImgTransform] = useState('translate(0px, 0px) scale(1)');
    const [frameTransform, setFrameTransform] = useState('rotateX(0deg) rotateY(0deg) translateZ(0px)');

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const el = e.currentTarget as HTMLDivElement;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        const maxX = 18;
        const maxY = 12;
        const tx = Math.round(x * maxX);
        const ty = Math.round(y * maxY);
        setImgTransform(`translate(${tx}px, ${ty}px) scale(1.03)`);

        const maxRotateX = 10;
        const maxRotateY = 10;
        const rotateX = Math.round(-y * maxRotateX * 100) / 100;
        const rotateY = Math.round(x * maxRotateY * 100) / 100;
        const translateZ = 20;
        setFrameTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`);
    }

    function handleMouseLeave() {
        setImgTransform('translate(0px, 0px) scale(1)');
        setFrameTransform('rotateX(0deg) rotateY(0deg) translateZ(0px)');
    }

    return (
        <div style={{ perspective: '1200px', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <div
                className="image-wrapper"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ width: '100%', margin: 0, cursor: 'pointer' }}
            >
                <div className="image-frame" style={{ transform: frameTransform, width: '100%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', backgroundColor: '#111' }}>
                    <img
                        src={src}
                        alt={alt}
                        className="parallax-img"
                        style={{ transform: imgTransform, width: '100%', display: 'block', borderRadius: '12px', objectFit: 'cover' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default function CertificatesApp() {
    return (
        <div style={{ width: '100%', height: '100%', overflowX: 'hidden', overflowY: 'auto', backgroundColor: '#000', padding: '60px 40px', color: '#fff' }}>

            <h2 style={{ fontSize: '26px', lineHeight: 1.4, fontWeight: 400, margin: '0 auto 50px auto', color: '#f0f0f0', letterSpacing: '-0.5px', textAlign: 'center', maxWidth: '80%' }}>
                SAP Certified Associate – Back-End Developer – ABAP Cloud
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', width: '100%' }}>
                {/* Image Tile with Hover Effect */}
                <TiltImage src={certificate} alt="SAP Certified Associate Certificate" />

                {/* Credly Verification Link */}
                <a
                    href="https://www.credly.com/badges/ba5c48c6-9502-4968-bf41-4e528d663995/public_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: '#a0a0a0',
                        textDecoration: 'none',
                        fontSize: '18px',
                        padding: '12px 30px',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        letterSpacing: '1px'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = '#666';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.color = '#a0a0a0';
                        e.currentTarget.style.borderColor = '#333';
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    View on Credly
                </a>
            </div>

        </div>
    );
}
