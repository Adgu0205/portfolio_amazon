import React, { useEffect, useRef } from 'react';
import { textPng, backJpg } from '../images';
import '../App.css';

const DesktopBackground: React.FC = () => {
    const refA = useRef<HTMLSpanElement | null>(null);
    const refB = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const texts = [
            'Aditya Gupta',
            'Student',
            'Web Developer',
            'SAP',
            'Diecast-Collector',
            'Aditya Gupta',
        ];

        let mounted = true;

        const morphDuration = 4000;
        const pauseBetween = 1000;

        function morph(from: string, to: string) {
            return new Promise<void>((resolve) => {
                const aRef = refA.current;
                const bRef = refB.current;
                if (!aRef || !bRef || !mounted) return resolve();

                const a = aRef as HTMLSpanElement;
                const b = bRef as HTMLSpanElement;

                a.textContent = from;
                a.setAttribute('data-text', from);
                b.textContent = to;
                b.setAttribute('data-text', to);

                a.style.opacity = '1';
                a.style.filter = 'blur(0px) opacity(1)';
                a.style.transform = 'scale(1)';
                b.style.opacity = '0';
                b.style.filter = 'blur(8px) opacity(0)';
                b.style.transform = 'scale(0.99)';

                const start = performance.now();

                function frame(now: number) {
                    if (!mounted) return resolve();
                    const elapsed = now - start;
                    const t = Math.min(elapsed / morphDuration, 1);

                    const ease = t < 0.5
                        ? 4 * t * t * t
                        : 1 - Math.pow(-2 * t + 2, 3) / 2;

                    a.style.opacity = String(1 - ease);
                    a.style.filter = `blur(${ease * 8}px) opacity(${1 - ease})`;
                    a.style.transform = `translateX(-50%) scale(${1 - ease * 0.01})`;

                    b.style.opacity = String(ease);
                    b.style.filter = `blur(${(1 - ease) * 8}px) opacity(${ease})`;
                    b.style.transform = `translateX(-50%) scale(${0.99 + ease * 0.01})`;

                    if (t < 1) requestAnimationFrame(frame);
                    else {
                        a.style.opacity = '0';
                        a.style.filter = 'blur(0px)';
                        a.style.transform = 'translateX(-50%) scale(0.98)';
                        b.style.opacity = '1';
                        b.style.filter = 'blur(0px)';
                        b.style.transform = 'translateX(-50%) scale(1)';
                        resolve();
                    }
                }

                requestAnimationFrame(frame);
            });
        }

        (async () => {
            for (let i = 0; i < texts.length - 1 && mounted; i++) {
                await morph(texts[i], texts[i + 1]);
                if (!mounted) break;
                await new Promise((r) => setTimeout(r, pauseBetween));
            }

            if (mounted && refA.current && refB.current) {
                refA.current.textContent = texts[texts.length - 1];
                refA.current.setAttribute('data-text', texts[texts.length - 1]);
                refA.current.style.opacity = '1';
                refA.current.style.filter = 'blur(0px)';
                refA.current.style.transform = 'translateX(-50%) scale(1)';
                refB.current.style.opacity = '0';
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {/* Background image - lowest layer, sits behind everything */}
            <img
                src={backJpg}
                alt=""
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />
            {/* Text content layer - above background */}
            <div
                className="container"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            >
                <span className="engineer-text">{'<  Computer Science Engineer  >'}</span>
                {textPng ? (
                    <img
                        src={textPng}
                        alt="Centered Text"
                        className="text-image"
                        style={{ position: 'relative', zIndex: 2 }}
                    />
                ) : null}
                <div className="overlay" aria-hidden style={{ position: 'relative', zIndex: 3 }}>
                    <span ref={refA} className="morph-text" />
                    <span ref={refB} className="morph-text" />
                </div>
            </div>
        </div>
    );
};

export default DesktopBackground;
