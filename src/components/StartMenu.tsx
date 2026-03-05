import React from 'react';
import { aditya } from '../images';

interface StartMenuProps {
    onClose: () => void;
    onLogOff?: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose, onLogOff }) => {
    return (
        <div className="start-menu" onClick={(e) => e.stopPropagation()}>
            <div className="start-menu-header">
                <div className="start-menu-avatar">
                    <img src={aditya} alt="User Avatar" />
                </div>
                <span>Aditya Gupta</span>
            </div>

            <div className="start-menu-body">
                <div className="start-menu-left">
                    {/* Programs list */}
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
                </div>

                <div className="start-menu-right">
                    {/* System folders */}
                    <div className="start-menu-item" onClick={onClose}>
                        <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" alt="My Documents" />
                        <span className="primary-text">My Documents</span>
                    </div>
                    <div className="start-menu-item" onClick={onClose}>
                        <img src="https://win98icons.alexmeub.com/icons/png/directory_pictures-5.png" alt="My Pictures" />
                        <span className="primary-text">My Pictures</span>
                    </div>
                </div>
            </div>

            <div className="start-menu-footer">
                <div className="log-off-btn" onClick={() => {
                    if (onLogOff) onLogOff();
                    else alert('Shutting down... (Not really)');
                }}>
                    <img src="https://win98icons.alexmeub.com/icons/png/shut_down_cool-0.png" alt="Log Off" width={24} height={24} />
                    <span>Turn Off Computer</span>
                </div>
            </div>
        </div>
    );
};

export default StartMenu;
