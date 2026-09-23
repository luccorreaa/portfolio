import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, MapPin } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'
import { profile } from '../data/profile'
import { EngineeringVisual } from './EngineeringVisual'
import { useMotion } from '../context/MotionContext'

export function Hero() {
	const { lang } = useLang()
	const tr = translations[lang].hero
	const { enabled } = useMotion()
	const [entering, setEntering] = useState(enabled)
	useEffect(() => {
		if (!enabled) { setEntering(false); return }
		const timer = setTimeout(() => setEntering(false), 1300)
		return () => clearTimeout(timer)
	}, [enabled])
	return (
		<section id="about" className="hero" data-entering={entering} aria-labelledby="hero-title" tabIndex={-1}>
			<div className="hero-grid" aria-hidden="true" />
			<div className="container hero-content">
				<div className="hero-topline hero-enter">
					<span className="availability"><span className="status-dot" />{tr.available}</span>
					<span className="location"><MapPin size={13} aria-hidden="true" />{tr.location}</span>
				</div>
				<div className="hero-main">
					<div className="hero-copy">
						<p className="eyebrow hero-enter"><span className="eyebrow-line" />{tr.eyebrow}</p>
						<h1 id="hero-title"><span className="name-line"><span>Luciano</span></span>{' '}<span className="name-line surname"><span>Correa<span className="name-dot">.</span></span></span></h1>
						<p className="hero-intro hero-enter">{tr.intro}<br /><span>{tr.introAccent}</span></p>
						<p className="hero-description hero-enter">{tr.description}</p>
						<div className="hero-actions hero-enter">
							<a href={profile.cv[lang]} className="button button-primary" download aria-label={tr.cvLabel}><Download size={16} aria-hidden="true" />{tr.cv}<span className="file-type">PDF</span></a>
							<a href="#projects" className="button button-secondary">{tr.projects}<ArrowDown size={16} aria-hidden="true" /></a>
						</div>
						<div className="hero-socials hero-enter">
							<a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={15} aria-hidden="true" />GitHub<ArrowUpRight size={12} aria-hidden="true" /></a>
							<a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={15} aria-hidden="true" />LinkedIn<ArrowUpRight size={12} aria-hidden="true" /></a>
							<span className="hero-social-note">{lang === 'es' ? 'Calidad + desarrollo' : 'Quality + development'}</span>
						</div>
					</div>
					<EngineeringVisual />
				</div>
				<div className="hero-facts" data-reveal>
					{[
						{ href: '#experience', label: tr.workLabel, value: tr.work, number: '01' },
						{ href: '#projects', label: tr.projectsLabel, value: tr.projectsValue, number: '02' },
						{ href: '#experience', label: tr.studyLabel, value: tr.study, number: '03' }
					].map((fact) => <a key={fact.number} href={fact.href}><span className="fact-index" aria-hidden="true">{fact.number}</span><span><small>{fact.label}</small><strong>{fact.value}</strong></span><ArrowUpRight size={18} aria-hidden="true" /></a>)}
				</div>
			</div>
		</section>
	)
}
