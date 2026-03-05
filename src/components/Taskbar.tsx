import React from 'react';

export interface TaskbarProps {
    windows: Array<{
        id: string;
        title: string;
        icon?: string;
        isOpen: boolean;
        isFocused: boolean;
    }>;
    activeWindowId: string | null;
    onWindowClick: (id: string) => void;
    onStartClick: (e: React.MouseEvent) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onWindowClick, onStartClick }) => {
    const [time, setTime] = React.useState<string>('');

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
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Windows_logo_-_2001.svg/100px-Windows_logo_-_2001.svg.png"
                        alt="Windows Logo"
                        style={{ width: 18, height: 18, marginRight: 5, filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))' }}
                    />
                    start
                </div>

                <div className="taskbar-items">
                    {windows.filter(w => w.isOpen).map((w) => (
                        <div
                            key={w.id}
                            className={`taskbar-item ${w.isFocused ? 'active' : ''}`}
                            onClick={() => onWindowClick(w.id)}
                        >
                            {w.icon && <img src={w.icon} alt="icon" style={{ width: 16, height: 16 }} />}
                            {w.title}
                        </div>
                    ))}
                </div>

                <div className="system-tray">
                    <span>{time}</span>
                </div>
            </div>
        </>
    );
};

export default Taskbar;
