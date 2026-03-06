import React from 'react';
import type { AppWindow } from '../App';

interface StartMenuProps {
    windows: AppWindow[];
    onOpenApp: (id: string) => void;
    onToggleCrt: () => void;
    onLogOff?: () => void;
}

const XPLogo = () => (
    <div className="xp-logo-container" style={{ transform: 'scale(0.5)', margin: 0 }}>
        <div className="xp-squares">
            <div className="sq sq-tl"></div>
            <div className="sq sq-tr"></div>
            <div className="sq sq-bl"></div>
            <div className="sq sq-br"></div>
        </div>
    </div>
);

const StartMenu: React.FC<StartMenuProps> = ({ windows, onOpenApp, onToggleCrt, onLogOff }) => {
    return (
        <div className="start-menu" onClick={(e) => e.stopPropagation()}>
            <div className="start-menu-header">
                <div className="start-menu-avatar" style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
                    <XPLogo />
                </div>
                <span>Aditya Gupta</span>
            </div>

            <div className="start-menu-body">
                <div className="start-menu-left">
                    {/* Programs list */}
                    {windows.map(app => (
                        <div key={`start-${app.id}`} className="start-menu-item" onClick={() => onOpenApp(app.id)}>
                            <img src={app.icon} alt={app.title} />
                            <div className="item-text">
                                <span className="primary-text">{app.title}</span>
                            </div>
                        </div>
                    ))}
                    <div className="start-menu-item" onClick={onToggleCrt}>
                        <img src="https://win98icons.alexmeub.com/icons/png/display_properties-2.png" alt="Toggle CRT" />
                        <div className="item-text">
                            <span className="primary-text">Toggle CRT</span>
                        </div>
                    </div>
                </div>

                <div className="start-menu-right">
                    {/* External links */}
                    <div className="start-menu-item" onClick={() => window.open('https://github.com/Adgu0205', '_blank')}>
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" />
                        <div className="item-text">
                            <span className="primary-text">GitHub</span>
                            <span className="secondary-text">View my repositories</span>
                        </div>
                    </div>
                    <div className="start-menu-item" onClick={() => window.open('https://www.linkedin.com/in/aditya-gupta-a6196129a/', '_blank')}>
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
                        <div className="item-text">
                            <span className="primary-text">LinkedIn</span>
                            <span className="secondary-text">Connect with me</span>
                        </div>
                    </div>
                    <div className="start-menu-item" onClick={() => window.open('https://instagram.com/', '_blank')}>
                        <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram" />
                        <div className="item-text">
                            <span className="primary-text">Instagram</span>
                            <span className="secondary-text">Follow my life</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="start-menu-footer">
                <div className="log-off-btn" onClick={() => {
                    if (onLogOff) onLogOff();
                    else alert('Logging off... (Not really)');
                }}>
                    <img src="https://win98icons.alexmeub.com/icons/png/key_win-0.png" alt="Log Out" width={24} height={24} />
                    <span>Log Out</span>
                </div>
            </div>
        </div>
    );
};

export default StartMenu;
