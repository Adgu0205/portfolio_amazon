import { useState, useEffect } from 'react';

interface DecryptTextProps {
  text: string;
  delay?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

export default function DecryptText({ text, delay = 0 }: DecryptTextProps) {
  const [displayText, setDisplayText] = useState<string>('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length * 4;

      const interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ' || char === '.') return char;
              
              const charsRevealed = Math.floor(iteration / 4);
              
              if (index < charsRevealed) {
                return text[index];
              }
              
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('');
        });

        iteration++;

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 40);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [text, delay]);

  return (
    <span
      className="decrypt-text"
      style={{
        fontSize: '46px',
        color: '#3b82f6',
        fontWeight: 500,
        marginTop: '1rem',
        fontFamily: 'inherit',
        letterSpacing: '0.5px',
        display: 'inline-block',
      }}
    >
      {displayText || text.split('').map(() => ' ').join('')}
    </span>
  );
}
