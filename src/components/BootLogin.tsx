import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { aditya } from '../images';

const XPLogo = () => (
    <div className="xp-logo-container">
        <div className="xp-squares">
            <div className="sq sq-tl"></div>
            <div className="sq sq-tr"></div>
            <div className="sq sq-bl"></div>
            <div className="sq sq-br"></div>
        </div>
    </div>
);

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 3500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="boot-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="boot-center">
                <XPLogo />
                <div className="boot-title">
                    <span className="boot-brand">AdityaGupta</span>
                    <span className="boot-xp">xp</span>
                </div>
                <div className="boot-subtitle">Software Engineer</div>
                <div className="boot-loader-container">
                    <div className="boot-loader-bar" />
                </div>
            </div>
            <div className="boot-footer">
                <div className="boot-f-left">
                    For the best experience<br />
                    Enter Full Screen (F11)
                </div>
                <div className="boot-f-right">
                    Portfolio<span className="reg">®</span>
                </div>
            </div>
        </motion.div>
    );
};

export const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
    const handleLoginClick = () => {
        const audio = new Audio('/windows-xp-startup.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
        onLogin();
    };

    return (
        <motion.div
            className="login-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="login-top-band" />
            <div className="login-bottom-band" />

            <div className="login-center">
                <div className="login-left">
                    <XPLogo />
                    <div className="boot-title">
                        <span className="boot-brand">AdityaGupta</span>
                        <span className="boot-xp">xp</span>
                    </div>
                    <div className="login-text">To begin, click on Aditya Gupta</div>
                </div>

                <div className="login-divider" />

                <div className="login-right">
                    <div className="login-user-card" onClick={handleLoginClick}>
                        <img src={aditya} alt="Aditya" className="login-avatar" />
                        <div className="login-user-info">
                            <div className="login-name">Aditya Gupta</div>
                            <div className="login-role">Software Engineer</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="login-footer-bar">
                <div className="login-instructions">
                    After you log on, the system's yours to explore.<br />
                    Every detail has been designed with a purpose.
                </div>
            </div>
        </motion.div>
    );
};
