import React, { useState } from 'react';
import { mental, dr, vitaState } from '../../images';

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
        <div style={{ perspective: '1200px' }}>
            <div
                className="image-wrapper"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ width: '100%', maxWidth: '100%', margin: 0 }}
            >
                <div className="image-frame" style={{ transform: frameTransform, width: '100%', borderRadius: '12px' }}>
                    <img
                        src={src}
                        alt={alt}
                        className="parallax-img"
                        style={{ transform: imgTransform, width: '100%', display: 'block', borderRadius: '12px' }}
                    />
                </div>
            </div>
        </div>
    );
};

interface Project {
    title: string;
    image: string;
    about: string;
    techStack: string[];
    link: string;
    linkName: string;
}

const projects: Project[] = [
    {
        title: "Mental Health Chat-bot",
        image: mental,
        about: "A compassionate AI-powered chatbot designed to provide mental health support and resources. The platform offers a safe space for users to express their feelings and receive thoughtful, empathetic responses while connecting them with professional mental health resources.",
        techStack: ["React", "TypeScript", "Node.js", "Express", "OpenAI API", "MongoDB"],
        link: "https://peacepluse-soaf.vercel.app/",
        linkName: "Peace-Pluse"
    },
    {
        title: "Vita-State",
        image: vitaState,
        about: "Comprehensive Health and Wellness Dashboard providing AI-powered insights\nHelps the user to get AI insights for their physical and nutritional health.",
        techStack: ["React", "Python/FastAPI"],
        link: "https://vita-state.netlify.app",
        linkName: "Vita-State"
    },
    {
        title: "Portfolio for my Father",
        image: dr,
        about: "This is a portfolio website created by me for my father to showcase his professional achievements, skills, and experiences. It's a very basic website but delivers all the essential information regarding my father's work.",
        techStack: ["React", "TypeScript", "Node.js"],
        link: "https://drgirishkumargupta.netlify.app/",
        linkName: "Dr. Girish Kumar Gupta"
    }
];

export default function ProjectsApp() {
    return (
        <div style={{ width: '100%', height: '100%', overflowX: 'hidden', overflowY: 'auto', backgroundColor: '#000', padding: '40px 50px', color: '#fff' }}>
            <div style={{ fontSize: '16px', color: '#e0e0e0', fontWeight: 300, marginBottom: '40px' }}>
                scroll down to view more
            </div>
            {projects.map((project, index) => (
                <div key={index} style={{ marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 400, margin: '0 0 30px 0', color: '#f0f0f0', letterSpacing: '-0.5px' }}>
                        {project.title}
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'start' }}>
                        {/* Image Column */}
                        <TiltImage src={project.image} alt={project.title} />

                        {/* Info Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingTop: '10px' }}>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: 400, color: '#909090', marginBottom: '15px', letterSpacing: '0.5px' }}>About the project:</h3>
                                <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#e0e0e0', fontWeight: 300, margin: 0, whiteSpace: 'pre-line' }}>
                                    {project.about}
                                </p>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: 400, color: '#909090', marginBottom: '15px', letterSpacing: '0.5px' }}>Tech Stack</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {project.techStack.map(tech => (
                                        <div key={tech} style={{ border: '1px solid #333', borderRadius: '6px', padding: '6px 16px', fontSize: '14px', color: '#e0e0e0' }}>
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: 400, color: '#909090', marginBottom: '15px', letterSpacing: '0.5px' }}>Deployed link:</h3>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#e0e0e0', textDecoration: 'none', fontSize: '16px' }}
                                    onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                                    onMouseOut={(e) => e.currentTarget.style.color = '#e0e0e0'}
                                >
                                    {project.linkName}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
