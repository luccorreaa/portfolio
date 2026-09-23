import { useEffect, useRef, useState } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'
import { profile } from '../data/profile'

export function Contact() {
	const { lang } = useLang()
	const tr = translations[lang].contact
	const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
	useEffect(() => () => clearTimeout(timer.current), [])
	async function copyEmail() {
		clearTimeout(timer.current)
		try {
			await navigator.clipboard.writeText(profile.email)
			setCopyState('copied')
		} catch {
			setCopyState('error')
		}
		timer.current = setTimeout(() => setCopyState('idle'), 4000)
	}
	return (
		<section id="contact" className="contact-section" aria-labelledby="contact-title" tabIndex={-1}>
			<div className="container">
				<div className="contact-content" data-reveal>
					<div>
						<p className="eyebrow">{tr.eyebrow}</p>
						<h2 id="contact-title">
							{tr.title}
						</h2>
					</div>
					<div className="contact-details">
						<p>{tr.description}</p>
						<a className="button button-primary" href={`mailto:${profile.email}`}>
							<Mail size={17} aria-hidden="true" />
							{tr.cta}
							<ArrowUpRight size={17} aria-hidden="true" />
						</a>
						<div className="email-row">
							<a href={`mailto:${profile.email}`}>{profile.email}</a>
							<button
								type="button"
								className="icon-button"
								onClick={copyEmail}
								aria-label={copyState === 'copied' ? tr.copied : tr.copy}
								title={copyState === 'copied' ? tr.copied : tr.copy}
							>
								{copyState === 'copied' ? <Check size={16} /> : <Copy size={16} />}
							</button>
						</div>
						<span className={`copy-status${copyState === 'error' ? ' error' : ''}`} role="status">
							{copyState === 'copied' ? tr.copied : copyState === 'error' ? tr.copyError : ''}
						</span>
						<div className="social-links">
							<a href={profile.github} target="_blank" rel="noopener noreferrer">
								<Github size={16} aria-hidden="true" />
								GitHub
								<ArrowUpRight size={13} aria-hidden="true" />
							</a>
							<a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
								<Linkedin size={16} aria-hidden="true" />
								LinkedIn
								<ArrowUpRight size={13} aria-hidden="true" />
							</a>
						</div>
						<a className="phone-link" href={profile.phoneHref}>
							<span>{tr.phone}</span>
							{profile.phone}
						</a>
					</div>
				</div>
				<footer className="site-footer">
					<a className="wordmark" href="#about" aria-label={translations[lang].nav.home}>
						<span aria-hidden="true">&gt;</span> lc_
					</a>
					<p>
						© {new Date().getFullYear()} Luciano Correa<span>{tr.built}</span>
					</p>
					<a className="back-top" href="#about">
						{tr.back}
						<ArrowUp size={14} aria-hidden="true" />
					</a>
				</footer>
			</div>
		</section>
	)
}
