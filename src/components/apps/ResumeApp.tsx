import { useState, useRef } from 'react';
import type { MouseEvent } from 'react';
import { resumeImg } from '../../images';

export default function ResumeApp() {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

    // Download the actual PDF file
    const handleSave = () => {
        const link = document.createElement('a');
        link.href = '/Resume_Aditya_Gupta.pdf';
        link.download = 'Resume_Aditya_Gupta.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        // Open PDF in new tab and trigger print
        const printWindow = window.open('/Resume_Aditya_Gupta.pdf');
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.print();
            };
        }
    };

    const handleContact = () => {
        window.location.href = 'mailto:adityaaguptaaaa@gmail.com'; // assuming this from earlier
    };

    const onMouseDown = (e: MouseEvent) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
        });
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f0f0f0', userSelect: 'none' }}>
            {/* Menu Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 8px', borderBottom: '1px solid #dfdfdf', backgroundColor: '#fff', fontSize: '13px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <span style={{ cursor: 'pointer' }}>File</span>
                    <span style={{ cursor: 'pointer' }}>View</span>
                    <span style={{ cursor: 'pointer', color: '#888' }}>Help</span>
                </div>
                <div>
                    <img src="https://win98icons.alexmeub.com/icons/png/windows_slanted-1.png" alt="Windows" style={{ height: '16px' }} />
                </div>
            </div>

            {/* Tool Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '6px 12px', borderBottom: '1px solid #ccc', backgroundColor: '#fff' }}>
                <div
                    onClick={handleZoomIn}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '4px 8px' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eef3fa'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <img src="https://win98icons.alexmeub.com/icons/png/search_computer-0.png" alt="Zoom In" style={{ width: '22px' }} />
                    <span style={{ fontSize: '13px', color: '#333' }}>Zoom In</span>
                </div>

                <div
                    onClick={handleZoomOut}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '4px 8px' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eef3fa'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <img src="https://win98icons.alexmeub.com/icons/png/search_web-0.png" alt="Zoom Out" style={{ width: '22px' }} />
                    <span style={{ fontSize: '13px', color: '#333' }}>Zoom Out</span>
                </div>

                <div
                    onClick={handleSave}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '4px 8px' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eef3fa'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <img src="https://win98icons.alexmeub.com/icons/png/floppy_drive_5_25-0.png" alt="Save" style={{ width: '22px' }} />
                    <span style={{ fontSize: '13px', color: '#333' }}>Save</span>
                </div>

                <div
                    onClick={handlePrint}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '4px 8px' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eef3fa'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <img src="https://win98icons.alexmeub.com/icons/png/printer-1.png" alt="Print" style={{ width: '22px', opacity: 0.5 }} />
                    <span style={{ fontSize: '13px', color: '#888' }}>Print</span>
                </div>

                <div
                    onClick={handleContact}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '4px 8px' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eef3fa'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <img src="https://win98icons.alexmeub.com/icons/png/outlook_express-4.png" alt="Contact Me" style={{ width: '22px' }} />
                    <span style={{ fontSize: '13px', color: '#333' }}>Contact Me</span>
                </div>
            </div>

            {/* Viewer Area */}
            <div
                ref={imageContainerRef}
                style={{
                    flex: 1,
                    backgroundColor: '#808080',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${zoom})`,
                    transformOrigin: 'center',
                    transition: isDragging ? 'none' : 'transform 0.2s',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    backgroundColor: '#fff',
                    // Default image bounds slightly smaller than screen width
                    width: '600px',
                    height: '848px', // standard paper ratio
                    display: 'flex'
                }}>
                    <img
                        src={resumeImg}
                        alt="Resume"
                        style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}
                        draggable={false}
                    />
                </div>
            </div>

            {/* Status Bar */}
            <div style={{ padding: '4px 10px', backgroundColor: '#f0f0f0', borderTop: '1px solid #ccc', fontSize: '12px', color: '#333' }}>
                Click to zoom, then drag to view other areas
            </div>
        </div>
    );
}
