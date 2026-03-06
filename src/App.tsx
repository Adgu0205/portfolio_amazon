import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import './styles/xp.css'; // Classic Windows XP styling
import './styles/boot-login.css';

import { BootScreen, LoginScreen } from './components/BootLogin';

import WindowFrame from './components/WindowFrame';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';

import AboutApp from './components/apps/AboutApp';
import ProjectsApp from './components/apps/ProjectsApp';
import SocialsApp from './components/apps/SocialsApp';
import ResumeApp from './components/apps/ResumeApp';
import CertificatesApp from './components/apps/CertificatesApp';
import MusicApp from './components/apps/MusicApp';
import ContactApp from './components/apps/ContactApp';

import DesktopBackground from './components/DesktopBackground';

// Define the structure of a generic App Window
export interface AppWindow {
	id: string;
	title: string;
	icon: string;
	isOpen: boolean;
	isFocused: boolean;
	isMaximized: boolean;
	isMinimized: boolean;
	component: React.ReactNode;
	defaultSize?: { width: number; height: number };
}

type SystemState = 'booting' | 'login' | 'desktop';

function App() {
	const [systemState, setSystemState] = useState<SystemState>('booting');
	const [windows, setWindows] = useState<AppWindow[]>([
		{
			id: 'about',
			title: 'About Me',
			icon: 'https://win98icons.alexmeub.com/icons/png/user_computer-0.png',
			isOpen: false,
			isFocused: false,
			isMaximized: false,
			isMinimized: false,
			component: <AboutApp />,
			defaultSize: { width: 1050, height: 650 }
		},
		{
			id: 'projects',
			title: 'My Projects',
			icon: 'https://win98icons.alexmeub.com/icons/png/msie1-3.png',
			isOpen: false,
			isFocused: false,
			isMaximized: false,
			isMinimized: false,
			component: <ProjectsApp />,
			defaultSize: { width: 900, height: 700 }
		},
		{
			id: 'socials',
			title: 'Socials',
			icon: 'https://win98icons.alexmeub.com/icons/png/network_internet_pcs_installer-2.png',
			isOpen: false,
			isFocused: false,
			isMaximized: false,
			isMinimized: false,
			component: <SocialsApp />,
			defaultSize: { width: 1150, height: 650 }
		},
		{
			id: 'resume',
			title: 'My Resume',
			icon: 'https://win98icons.alexmeub.com/icons/png/html-1.png',
			isOpen: false,
			isFocused: false,
			isMaximized: false,
			isMinimized: false,
			component: <ResumeApp />,
			defaultSize: { width: 680, height: 850 }
		},
		{
			id: 'certificates',
			title: 'Certificates',
			icon: 'https://win98icons.alexmeub.com/icons/png/certificate-0.png',
			isOpen: false,
			isFocused: false,
			isMaximized: false,
			isMinimized: false,
			component: <CertificatesApp />,
			defaultSize: { width: 900, height: 750 }
		},
		{
			id: 'musicplayer',
			title: 'Music Player',
			icon: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-3.png',
			isOpen: false,
			isFocused: false,
			isMaximized: false,
			isMinimized: false,
			component: <MusicApp />,
			defaultSize: { width: 440, height: 260 }
		},
		{
			id: 'contact',
			title: 'Contact Me',
			icon: 'https://win98icons.alexmeub.com/icons/png/outlook_express-4.png',
			isOpen: false,
			isFocused: false,
			isMaximized: false,
			isMinimized: false,
			component: <ContactApp />,
			defaultSize: { width: 520, height: 420 }
		}
	]);

	const [isStartMenuOpen, setStartMenuOpen] = useState(false);
	const [crtEnabled, setCrtEnabled] = useState(true);
	const zIndexCounter = useRef(100);

	// Close start menu when clicking outside
	useEffect(() => {
		const handleGlobalClick = () => {
			if (isStartMenuOpen) setStartMenuOpen(false);
		};
		window.addEventListener('click', handleGlobalClick);
		return () => window.removeEventListener('click', handleGlobalClick);
	}, [isStartMenuOpen]);

	// Window Management Functions
	const openWindow = (id: string) => {
		zIndexCounter.current += 1;
		setWindows(prev => prev.map(w => {
			if (w.id === id) {
				return { ...w, isOpen: true, isFocused: true, isMinimized: false };
			}
			return { ...w, isFocused: false };
		}));
	};

	const closeWindow = (id: string) => {
		setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false, isFocused: false, isMinimized: false } : w));
	};

	const toggleMinimize = (id: string) => {
		setWindows(prev => prev.map(w => {
			if (w.id === id) {
				// We set isMinimized to true and remove focus so it hides from view
				// but retains isOpen=true so the component logic isn't destroyed
				return { ...w, isMinimized: true, isFocused: false };
			}
			return w;
		}));
	};

	const toggleMaximize = (id: string) => {
		zIndexCounter.current += 1;
		setWindows(prev => prev.map(w => {
			if (w.id === id) {
				return { ...w, isMaximized: !w.isMaximized, isFocused: true, isMinimized: false };
			}
			return { ...w, isFocused: false };
		}));
	};

	const focusWindow = (id: string) => {
		zIndexCounter.current += 1;
		setWindows(prev => prev.map(w => {
			if (w.id === id) {
				// If we focus it, make sure it's un-minimized just in case
				return { ...w, isFocused: true, isMinimized: false };
			}
			return { ...w, isFocused: false };
		}));
	};

	const handleTaskbarClick = (id: string) => {
		const win = windows.find(w => w.id === id);
		if (!win) return;

		if (win.isOpen) {
			if (win.isFocused && !win.isMinimized) {
				// Already focused and visible: minimize it
				toggleMinimize(id);
			} else if (win.isMinimized) {
				// Minimized: restore and focus it
				focusWindow(id);
			} else {
				// Open but just not focused: focus it
				focusWindow(id);
			}
		} else {
			openWindow(id);
		}
	};

	return (
		<>
			<AnimatePresence mode="wait">
				{systemState === 'booting' && (
					<BootScreen key="boot" onComplete={() => setSystemState('login')} />
				)}
				{systemState === 'login' && (
					<LoginScreen key="login" onLogin={() => setSystemState('desktop')} />
				)}
				{systemState === 'desktop' && (
					<div key="desktop" className="os-container">
						{/* Desktop Background */}
						<div className="desktop-bg" onPointerDown={() => setWindows(prev => prev.map(w => ({ ...w, isFocused: false })))}>
							<DesktopBackground />

							{/* Selected Desktop Icons */}
							<div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', height: '100%', alignContent: 'flex-start', padding: 10, position: 'relative', zIndex: 1 }}>
								{windows
									.filter(app => ['about', 'projects', 'resume', 'socials', 'certificates', 'contact'].includes(app.id))
									.map(app => (
										<div
											key={`icon-${app.id}`}
											className="desktop-icon"
											onDoubleClick={(e) => { e.stopPropagation(); openWindow(app.id); }}
											onTouchEnd={(e) => { e.stopPropagation(); openWindow(app.id); }}
										>
											<img src={app.icon} alt={app.title} />
											<span>{app.title}</span>
										</div>
									))}
							</div>
						</div>

						{/* Render Open Windows */}
						{windows.map(app => (
							<WindowFrame
								key={`window-${app.id}`}
								id={app.id}
								title={app.title}
								icon={app.icon}
								isOpen={app.isOpen}
								isFocused={app.isFocused}
								isMaximized={app.isMaximized}
								isMinimized={app.isMinimized}
								onClose={closeWindow}
								onMinimize={toggleMinimize}
								onMaximize={toggleMaximize}
								onFocus={focusWindow}
								defaultSize={app.defaultSize}
								zIndex={app.isFocused ? zIndexCounter.current : zIndexCounter.current - 1} // basic z-index handling
							>
								{app.component}
							</WindowFrame>
						))}

						{/* Start Menu */}
						{isStartMenuOpen && (
							<StartMenu
								windows={windows}
								onOpenApp={(id) => {
									openWindow(id);
									setStartMenuOpen(false);
								}}
								onToggleCrt={() => {
									setCrtEnabled(!crtEnabled);
									setStartMenuOpen(false);
								}}
								onLogOff={() => {
									setStartMenuOpen(false);
									setSystemState('login');
								}}
							/>
						)}

						{/* Taskbar */}
						<Taskbar
							windows={windows}
							activeWindowId={windows.find(w => w.isOpen && w.isFocused)?.id || null}
							onWindowClick={handleTaskbarClick}
							onStartClick={(e) => {
								e.stopPropagation();
								setStartMenuOpen(!isStartMenuOpen);
							}}
						/>

					</div>
				)}
			</AnimatePresence>

			{/* Global CRT Overlay */}
			{crtEnabled && <div className="crt-overlay" />}
		</>
	);
}

export default App;
