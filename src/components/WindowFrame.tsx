import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Cross2Icon, SquareIcon, DividerHorizontalIcon } from '@radix-ui/react-icons';

export interface WindowFrameProps {
    id: string;
    title: string;
    icon?: string;
    isOpen: boolean;
    isFocused: boolean;
    isMaximized: boolean;
    onClose: (id: string) => void;
    onMinimize: (id: string) => void;
    onMaximize: (id: string) => void;
    onFocus: (id: string) => void;
    children: React.ReactNode;
    defaultPosition?: { x: number; y: number };
    defaultSize?: { width: number; height: number };
    zIndex: number;
}

const WindowFrame: React.FC<WindowFrameProps> = ({
    id,
    title,
    icon,
    isOpen,
    isFocused,
    isMaximized,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    children,
    defaultPosition,
    defaultSize = { width: 800, height: 600 },
    zIndex,
}) => {
    const windowRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();

    if (!isOpen) return null;

    const initialPos = defaultPosition || {
        x: Math.max(0, (window.innerWidth - defaultSize.width) / 2),
        y: Math.max(0, (window.innerHeight - defaultSize.height) / 2) - 20,
    };

    // If maximized, take up full screen minus taskbar
    const style: React.CSSProperties = isMaximized
        ? {
            top: 0,
            left: 0,
            width: '100vw',
            height: 'calc(100vh - 40px)',
            zIndex,
        }
        : {
            top: 0,
            left: 0,
            width: defaultSize.width,
            height: defaultSize.height,
            zIndex,
        };

    return (
        <motion.div
            ref={windowRef}
            className={`window-frame ${isFocused ? 'focused' : ''}`}
            drag={!isMaximized}
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            initial={initialPos}
            animate={isMaximized ? { x: 0, y: 0, width: '100vw', height: 'calc(100vh - 40px)' } : { width: defaultSize.width, height: defaultSize.height }}
            style={{ position: 'absolute', ...style }}
            onPointerDown={() => onFocus(id)}
        >
            <div
                className="window-titlebar"
                onDoubleClick={() => onMaximize(id)}
                onPointerDown={(e) => {
                    onFocus(id);
                    dragControls.start(e);
                }}
                style={{ cursor: isMaximized ? 'default' : 'grab' }}
            >
                <div className="window-title">
                    {icon && <img src={icon} alt="icon" style={{ width: 16, height: 16 }} />}
                    {title}
                </div>
                <div className="window-controls" onPointerDown={(e) => e.stopPropagation()}>
                    <div className="window-btn" onClick={() => onMinimize(id)}>
                        <DividerHorizontalIcon width={12} height={12} />
                    </div>
                    <div className="window-btn" onClick={() => onMaximize(id)}>
                        <SquareIcon width={10} height={10} />
                    </div>
                    <div className="window-btn close" onClick={() => onClose(id)}>
                        <Cross2Icon width={14} height={14} />
                    </div>
                </div>
            </div>
            <div className="window-content" onPointerDown={() => onFocus(id)}>
                {children}
            </div>
        </motion.div>
    );
};

export default WindowFrame;
