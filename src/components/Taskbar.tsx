import React from 'react';

const XPLogo = () => (
    <div className="xp-logo-container" style={{ transform: 'scale(0.35)', margin: 0, height: '20px', display: 'flex', alignItems: 'center' }}>
        <div className="xp-squares" style={{ width: '40px', height: '40px' }}>
            <div className="sq sq-tl"></div>
            <div className="sq sq-tr"></div>
            <div className="sq sq-bl"></div>
            <div className="sq sq-br"></div>
        </div>
    </div>
);

export interface TaskbarProps {
    windows: Array<{
        id: string;
        title: string;
        icon?: string;
        isOpen: boolean;
        isFocused: boolean;
        isMinimized?: boolean;
    }>;
    activeWindowId: string | null;
    onWindowClick: (id: string) => void;
    onStartClick: (e: React.MouseEvent) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onWindowClick, onStartClick }) => {
    const [time, setTime] = React.useState<string>('');
    const [showTooltip, setShowTooltip] = React.useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="taskbar">
                <div
                    className="start-button"
                    onClick={onStartClick}
                >
                    <XPLogo />
                    <span style={{ marginLeft: 5 }}>start</span>
                </div>

                <div className="taskbar-items">
                    {windows.filter(w => w.isOpen).map((w) => (
                        <div
                            key={w.id}
                            className={`taskbar-item ${w.isFocused && !w.isMinimized ? 'active' : ''}`}
                            onClick={() => onWindowClick(w.id)}
                        >
                            {w.icon && <img src={w.icon} alt="icon" style={{ width: 16, height: 16 }} />}
                            {w.title}
                        </div>
                    ))}
                </div>

                <div className="system-tray" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '12px' }}>
                    <div
                        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <img
                            src="https://win98icons.alexmeub.com/icons/png/msg_information-0.png"
                            alt="Information"
                            style={{ width: 14, height: 14, cursor: 'help' }}
                        />
                        {showTooltip && (
                            <div style={{
                                position: 'absolute',
                                bottom: '30px',
                                right: '-10px',
                                backgroundColor: '#ffffe1',
                                border: '1px solid #000',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontFamily: 'Tahoma, Geneva, sans-serif',
                                color: '#000',
                                whiteSpace: 'nowrap',
                                boxShadow: '2px 2px 3px rgba(0,0,0,0.3)',
                                zIndex: 10000,
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-6px',
                                    right: '12px',
                                    width: '10px',
                                    height: '10px',
                                    backgroundColor: '#ffffe1',
                                    borderRight: '1px solid #000',
                                    borderBottom: '1px solid #000',
                                    transform: 'rotate(45deg)'
                                }} />
                                This is Aditya Gupta's Portfolio
                            </div>
                        )}
                    </div>

                    <img
                        src="https://win98icons.alexmeub.com/icons/png/display_properties-0.png"
                        alt="Toggle Fullscreen"
                        onClick={toggleFullScreen}
                        style={{ width: 14, height: 14, cursor: 'pointer' }}
                        title="Toggle Fullscreen"
                    />

                    <span>{time}</span>
                </div>
            </div>
        </>
    );
};

export default Taskbar;
