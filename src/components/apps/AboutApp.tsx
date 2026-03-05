import React, { useState } from 'react';
import { aditya } from '../../images';
import DecryptText from '../DecryptText';

export default function AboutApp() {
    const [imgTransform, setImgTransform] = useState<string>('translate(0px, 0px) scale(1)');
    const [frameTransform, setFrameTransform] = useState<string>('rotateX(0deg) rotateY(0deg) translateZ(0px)');

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
        <div style={{ width: '100%', height: '100%', backgroundColor: '#000', color: '#fff', padding: '40px 50px', overflowX: 'hidden', overflowY: 'auto' }}>
            <h1 style={{ fontSize: '46px', fontWeight: 700, margin: '0 0 30px 0', letterSpacing: '-0.5px' }}>About me</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'start' }}>

                {/* Image side */}
                <div style={{ perspective: '1200px' }}>
                    <div
                        className="image-wrapper"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ width: '100%', maxWidth: '100%', margin: 0 }}
                    >
                        <div className="image-frame" style={{ transform: frameTransform, width: '100%', borderRadius: '12px' }}>
                            <img
                                src={aditya}
                                alt="Aditya Gupta"
                                className="about-photo parallax-img"
                                style={{ transform: imgTransform, width: '100%', display: 'block', borderRadius: '12px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Text side */}
                <div style={{ paddingTop: '10px' }}>
                    <p style={{ fontSize: '24px', lineHeight: 1.4, margin: '0 0 25px 0', color: '#B0B0B0', fontWeight: 300 }}>
                        Hello world, I am <span style={{ color: '#fff' }}>Aditya Gupta</span> - A <span style={{ color: '#fff' }}>Computer Science Student</span> and a flourishing engineer.
                    </p>
                    <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#888', marginBottom: '30px', fontWeight: 300 }}>
                        Consistently curious and committed to growth, I'm driven by a passion for building meaningful digital experiences and understanding the systems that power them. I enjoy exploring modern web technologies, solving real-world problems through code, and refining my craft one project at a time.
                    </p>
                    <DecryptText text="Learn. Build. Improve." delay={10} />
                </div>
            </div>
        </div>
    );
}
