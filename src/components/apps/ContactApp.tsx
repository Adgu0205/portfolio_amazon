import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactApp() {
    const formRef = useRef<HTMLFormElement>(null);
    const [fromEmail, setFromEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    const handleSend = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!fromEmail.trim() || !message.trim()) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 2000);
            return;
        }
        setStatus('sending');
        emailjs.send(
            'service_v4rzvqd',
            'template_96g3yxh',
            {
                from_email: fromEmail,
                subject: subject || '(No Subject)',
                message: message,
                to_name: 'Aditya Gupta',
            },
            'T-qWo1yrmArGKxxBr'
        ).then(() => {
            setStatus('sent');
            setFromEmail('');
            setSubject('');
            setMessage('');
            setTimeout(() => setStatus('idle'), 3000);
        }).catch(() => {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        });
    };

    const handleNewMessage = () => {
        setFromEmail('');
        setSubject('');
        setMessage('');
        setStatus('idle');
    };

    const statusText = () => {
        switch (status) {
            case 'sending': return 'Sending message...';
            case 'sent': return '✓ Message sent successfully!';
            case 'error': return '✗ Failed to send. Please fill all fields.';
            default: return 'Compose a message to Aditya';
        }
    };

    // Outlook Express-style toolbar button
    const ToolbarButton = ({ icon, label, onClick, disabled }: { icon: string; label: string; onClick?: () => void; disabled?: boolean }) => (
        <div
            onClick={disabled ? undefined : onClick}
            style={{
                display: 'flex', alignItems: 'center', gap: '4px', cursor: disabled ? 'default' : 'pointer',
                padding: '4px 8px', opacity: disabled ? 0.4 : 1,
            }}
            onMouseOver={(e) => { if (!disabled) e.currentTarget.style.backgroundColor = '#d6e8ff'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
            <img src={icon} alt={label} style={{ width: '22px', height: '22px' }} />
            <span style={{ fontSize: '12px', color: '#000' }}>{label}</span>
        </div>
    );

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f0f0f0', fontFamily: 'Tahoma, Geneva, sans-serif' }}>
            {/* Menu Bar */}
            <div style={{
                display: 'flex', alignItems: 'center', padding: '2px 6px',
                borderBottom: '1px solid #b0b0b0', backgroundColor: '#f0f0f0', fontSize: '12px', gap: '10px'
            }}>
                <span style={{ cursor: 'pointer' }}>File</span>
                <span style={{ color: '#888', cursor: 'default' }}>Edit</span>
                <span style={{ cursor: 'pointer' }}>View</span>
                <span style={{ color: '#888', cursor: 'default' }}>Tools</span>
                <span style={{ color: '#888', cursor: 'default' }}>Help</span>
                <div style={{ marginLeft: 'auto' }}>
                    <img src="https://win98icons.alexmeub.com/icons/png/outlook_express-4.png" alt="OE" style={{ height: '16px' }} />
                </div>
            </div>

            {/* Toolbar */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px',
                borderBottom: '1px solid #b0b0b0', backgroundColor: '#f5f5f5'
            }}>
                <ToolbarButton
                    icon="https://win98icons.alexmeub.com/icons/png/envelope_closed-0.png"
                    label="Send Message"
                    onClick={handleSend}
                />
                <div style={{ width: '1px', height: '24px', backgroundColor: '#c0c0c0', margin: '0 4px' }} />
                <ToolbarButton
                    icon="https://win98icons.alexmeub.com/icons/png/write_wordpad-0.png"
                    label="New Message"
                    onClick={handleNewMessage}
                />
                <div style={{ width: '1px', height: '24px', backgroundColor: '#c0c0c0', margin: '0 4px' }} />
                <ToolbarButton
                    icon="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    label="GitHub"
                    onClick={() => window.open('https://github.com/Adgu0205', '_blank')}
                />
                <ToolbarButton
                    icon="https://cdn-icons-png.flaticon.com/512/15/15895.png"
                    label="+91 7037710205"
                    onClick={() => window.location.href = 'tel:+917037710205'}
                />
                <div style={{ width: '1px', height: '24px', backgroundColor: '#c0c0c0', margin: '0 4px' }} />
                <ToolbarButton
                    icon="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                    label="LinkedIn"
                    onClick={() => window.open('https://www.linkedin.com/in/aditya-gupta-a6196129a/', '_blank')}
                />
            </div>

            {/* Form Fields */}
            <form ref={formRef} onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* To Field */}
                <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px', borderBottom: '1px solid #d0d0d0', backgroundColor: '#fff' }}>
                    <label style={{ width: '55px', fontSize: '12px', fontWeight: 'bold', color: '#000' }}>To:</label>
                    <input
                        type="text"
                        value="Aditya Gupta <girishguptaaditya@gmail.com>"
                        readOnly
                        style={{
                            flex: 1, border: 'none', outline: 'none', fontSize: '12px',
                            backgroundColor: '#f0f0f0', padding: '4px 6px', color: '#000', cursor: 'default'
                        }}
                    />
                </div>

                {/* From Field */}
                <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px', borderBottom: '1px solid #d0d0d0', backgroundColor: '#fff' }}>
                    <label style={{ width: '55px', fontSize: '12px', fontWeight: 'bold', color: '#000' }}>From:</label>
                    <input
                        type="email"
                        placeholder="Your email address"
                        value={fromEmail}
                        onChange={(e) => setFromEmail(e.target.value)}
                        style={{
                            flex: 1, border: 'none', outline: 'none', fontSize: '12px',
                            padding: '4px 6px', color: '#000', backgroundColor: '#fff'
                        }}
                    />
                </div>

                {/* Subject Field */}
                <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px', borderBottom: '1px solid #d0d0d0', backgroundColor: '#fff' }}>
                    <label style={{ width: '55px', fontSize: '12px', fontWeight: 'bold', color: '#000' }}>Subject:</label>
                    <input
                        type="text"
                        placeholder="Subject of your message"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        style={{
                            flex: 1, border: 'none', outline: 'none', fontSize: '12px',
                            padding: '4px 6px', color: '#000', backgroundColor: '#fff'
                        }}
                    />
                </div>

                {/* Message Area */}
                <textarea
                    placeholder="Write your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                        flex: 1, border: 'none', outline: 'none', resize: 'none',
                        padding: '10px 12px', fontSize: '12px', fontFamily: 'Tahoma, Geneva, sans-serif',
                        color: '#000', backgroundColor: '#fff', borderTop: '1px solid #d0d0d0'
                    }}
                />
            </form>

            {/* Status Bar */}
            <div style={{
                padding: '3px 8px', backgroundColor: '#ece9d8', borderTop: '1px solid #b0b0b0',
                fontSize: '11px', color: status === 'sent' ? '#006600' : status === 'error' ? '#cc0000' : '#333'
            }}>
                {statusText()}
            </div>
        </div>
    );
}
