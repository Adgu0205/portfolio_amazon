import './App.css';

import { useEffect, useRef, useState } from 'react';
import About from './pages/About';
import Projects from './pages/Projects';
import Socials from './pages/Socials';
import TargetCursor from './components/TargetCursor';
import { textPng } from './images';

// import the sound from src so Vite will bundle it and we can play on click


function App() {
	const refA = useRef<HTMLSpanElement | null>(null);
	const refB = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		const texts = [
			'Aditya Gupta',
			'Student',
			'Web Developer',
			'SAP',
			'Diecast-Collector',
			'Aditya Gupta',
		];

		let mounted = true;

		const morphDuration = 4000; // ms - increased duration for smoother transition
		const pauseBetween = 1000; // ms - longer pause between transitions

		function morph(from: string, to: string) {
			return new Promise<void>((resolve) => {
				const aRef = refA.current;
				const bRef = refB.current;
				if (!aRef || !bRef || !mounted) return resolve();

				const a = aRef as HTMLSpanElement;
				const b = bRef as HTMLSpanElement;

				a.textContent = from;
				a.setAttribute('data-text', from);
				b.textContent = to;
				b.setAttribute('data-text', to);

				a.style.opacity = '1';
				a.style.filter = 'blur(0px) opacity(1)';
				a.style.transform = 'scale(1)';
				b.style.opacity = '0';
				b.style.filter = 'blur(8px) opacity(0)';
				b.style.transform = 'scale(0.99)';

				const start = performance.now();

				function frame(now: number) {
					if (!mounted) return resolve();
					const elapsed = now - start;
					const t = Math.min(elapsed / morphDuration, 1);

					// Use easeInOutCubic for smoother transition
					const ease = t < 0.5
						? 4 * t * t * t
						: 1 - Math.pow(-2 * t + 2, 3) / 2;

					// outgoing (a) fades out with dissolve effect
					a.style.opacity = String(1 - ease);
					a.style.filter = `blur(${ease * 8}px) opacity(${1 - ease})`;
					a.style.transform = `translateX(-50%) scale(${1 - ease * 0.01})`;

					// incoming (b) fades in with dissolve effect
					b.style.opacity = String(ease);
					b.style.filter = `blur(${(1 - ease) * 8}px) opacity(${ease})`;
					b.style.transform = `translateX(-50%) scale(${0.99 + ease * 0.01})`;

					if (t < 1) requestAnimationFrame(frame);
					else {
						// finalize
						a.style.opacity = '0';
						a.style.filter = 'blur(0px)';
						a.style.transform = 'translateX(-50%) scale(0.98)';
						b.style.opacity = '1';
						b.style.filter = 'blur(0px)';
						b.style.transform = 'translateX(-50%) scale(1)';
						resolve();
					}
				}

				requestAnimationFrame(frame);
			});
		}

		(async () => {
			for (let i = 0; i < texts.length - 1 && mounted; i++) {
				await morph(texts[i], texts[i + 1]);
				if (!mounted) break;
				await new Promise((r) => setTimeout(r, pauseBetween));
			}

			if (mounted && refA.current && refB.current) {
				refA.current.textContent = texts[texts.length - 1];
				refA.current.setAttribute('data-text', texts[texts.length - 1]);
				refA.current.style.opacity = '1';
				refA.current.style.filter = 'blur(0px)';
				refA.current.style.transform = 'translateX(-50%) scale(1)';
				refB.current.style.opacity = '0';
			}
		})();

		return () => {
			mounted = false;
		};
	}, []);

	// Contact modal state (open when hash is #contact)
	const [showContact, setShowContact] = useState<boolean>(typeof window !== 'undefined' && window.location.hash === '#contact');
	const [showToast, setShowToast] = useState<boolean>(false);
	// audio removed per user request

	useEffect(() => {
		function onHash() {
			setShowContact(window.location.hash === '#contact');
		}

		window.addEventListener('hashchange', onHash);
		onHash();
		return () => window.removeEventListener('hashchange', onHash);
	}, []);

	function closeContact() {
		if (typeof window !== 'undefined') {
			history.replaceState(null, '', window.location.pathname + window.location.search);
			setShowContact(false);
		}
	}


	async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const form = e.currentTarget;

		// If form is invalid, show browser validation and do not proceed
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}


		const data = new FormData(form);

		// Send to Netlify via AJAX: include form-name
		try {
			await fetch('/', { method: 'POST', body: data });
			// close modal after submit
			closeContact();
			// show success toast
			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		} catch {
			// close modal even if send fails
			closeContact();
		}
	}

	// route simple pages: render blank black pages for the three routes
	const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

	const getPageContent = () => {
		if (pathname === '/about') return <About />;
		if (pathname === '/projects') return <Projects />;
		if (pathname === '/socials') return <Socials />;
		return (
			<div id="root">
				<header className="top-nav" role="navigation" aria-label="Main navigation">
					<nav className="top-nav-inner">
						<div className="nav-left">
							<a href="/about" className="top-nav-link">About</a>
							<a href="/projects" className="top-nav-link">Projects</a>
						</div>
						<div className="nav-center">
							<div className="center-title">Portfolio</div>
							<div className="center-subtitle">Aditya Gupta</div>
						</div>
						<div className="nav-right">
							<a href="/socials" className="top-nav-link">Socials</a>
							<a href="#contact" className="top-nav-link">Contact</a>
						</div>
					</nav>
				</header>
				<div className="container">
					<span className="engineer-text">&lt;  Computer Science Engineer  &gt;</span>
					{textPng ? (
						<img src={textPng} alt="Centered Text" className="text-image" />
					) : null}
					<div className="overlay" aria-hidden>
						<span ref={refA} className="morph-text" />
						<span ref={refB} className="morph-text" />
					</div>
					<div className="social-links">
						<a href="https://www.linkedin.com/in/aditya-gupta-a6196129a/" target="_blank" rel="noopener noreferrer" className="social-link">Linkedin</a>
						<a href="https://github.com/Adgu0205" target="_blank" rel="noopener noreferrer" className="social-link">Github</a>
						<a href="https://www.instagram.com/adityaaguptaaaa/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
					</div>
					{/* footer: thin separator and three columns (left, center, right) */}
					<footer className="site-footer" aria-label="Site footer">
						<div className="footer-inner">
							<div className="footer-left">Based in: Vadodara, India</div>
							<div className="footer-right">Open to Opportunities</div>
						</div>
					</footer>
				</div>

				{/* Contact modal */}
				{showContact && (
					<div className="contact-overlay" role="dialog" aria-modal="true" aria-label="Contact form">
						<div className="contact-backdrop" onClick={closeContact} />
						<div className="contact-dialog" role="document">
							<form
								name="contact"
								method="post"
								data-netlify="true"
								onSubmit={handleContactSubmit}
							>
								<input type="hidden" name="form-name" value="contact" />
								<div className="contact-left">
									<h2 className="contact-title">Contact</h2>
									<label>
										<span>Name</span>
										<input name="name" type="text" required />
									</label>
									<label>
										<span>Gmail/Number</span>
										<input name="email_or_phone" type="text" required />
									</label>
									<label>
										<span>Message</span>
										<textarea name="message" rows={6} required />
									</label>
									<button type="submit" className="contact-submit">Submit</button>
								</div>
								{/* contact-right removed; show combined centered contact line below submit */}
								<div className="contact-footer">
									<span>
										Gmail :
										<a href="https://mail.google.com/mail/?view=cm&fs=1&to=girishguptaaditya@gmail.com" target="_blank" rel="noopener noreferrer"> girishguptaaditya@gmail.com</a>
										&nbsp;|&nbsp; Number : +91 7037710205
									</span>
								</div>
							</form>
							<button className="contact-close" onClick={closeContact} aria-label="Close contact dialog">×</button>
						</div>
					</div>
				)}

				{/* Success toast notification */}
				{showToast && (
					<div className="toast-notification">
						Submission successful
					</div>
				)}
			</div>
		);
	};

	return (
		<>
			<TargetCursor />
			{getPageContent()}
		</>
	);
}

export default App;
