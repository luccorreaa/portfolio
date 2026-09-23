import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Download, Menu, Pause, Play, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'
import { profile } from '../data/profile'
import { useMotion } from '../context/MotionContext'

const sections = ['about', 'projects', 'experience', 'skills', 'contact'] as const
type SectionId = (typeof sections)[number]

export function Nav() {
	const { lang, setLang } = useLang()
	const tr = translations[lang].nav
	const { enabled, toggle, systemReduced } = useMotion()
	const [open, setOpen] = useState(false)
	const [active, setActive] = useState<SectionId>('about')
	const header = useRef<HTMLElement>(null)
	const trigger = useRef<HTMLButtonElement>(null)
	const desktopNav = useRef<HTMLElement>(null)
	const indicator = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const nav = desktopNav.current
		if (!nav) return
		const update = () => {
			const link = nav.querySelector<HTMLElement>('[aria-current]')
			if (!link || !indicator.current) return
			indicator.current.style.width = `${link.offsetWidth}px`
			indicator.current.style.transform = `translateX(${link.offsetLeft}px)`
		}
		update()
		const observer = new ResizeObserver(update)
		observer.observe(nav)
		return () => observer.disconnect()
	}, [active, lang])

	useEffect(() => {
		const visible = new Set<string>()
		let footerVisible = false
		const updateActive = () => {
			const current = footerVisible
				? 'contact'
				: [...sections].reverse().find((id) => visible.has(id))
			if (current) setActive(current)
		}
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) =>
					entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id)
				)
				updateActive()
			},
			{ rootMargin: '-15% 0px -60% 0px' }
		)
		sections.forEach((id) => {
			const el = document.getElementById(id)
			if (el) observer.observe(el)
		})
		// The last section can be shorter than the viewport and never reach the upper marker.
		const footerObserver = new IntersectionObserver(([entry]) => {
			footerVisible = entry.isIntersecting
			updateActive()
		})
		const footer = document.querySelector('.site-footer')
		if (footer) footerObserver.observe(footer)
		return () => {
			observer.disconnect()
			footerObserver.disconnect()
		}
	}, [])

	useEffect(() => {
		if (!open) return
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpen(false)
				trigger.current?.focus()
			}
		}
		const onPointer = (event: PointerEvent) => {
			if (!header.current?.contains(event.target as Node)) setOpen(false)
		}
		const desktop = matchMedia('(min-width: 800px)')
		const onResize = () => {
			if (desktop.matches) setOpen(false)
		}
		document.addEventListener('keydown', onKey)
		document.addEventListener('pointerdown', onPointer)
		desktop.addEventListener('change', onResize)
		return () => {
			document.removeEventListener('keydown', onKey)
			document.removeEventListener('pointerdown', onPointer)
			desktop.removeEventListener('change', onResize)
		}
	}, [open])

	const links = sections.map((id, i) => (
		<a
			key={id}
			href={`#${id}`}
			aria-current={active === id ? 'location' : undefined}
			onClick={() => setOpen(false)}
		>
			<span className="nav-number" aria-hidden="true">
				0{i}
			</span>
			{tr[id]}
			{id === 'contact' && <ArrowUpRight size={14} aria-hidden="true" />}
		</a>
	))
	return (
		<header
			className="site-header"
			ref={header}
			onBlur={(event) => {
				if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget))
					setOpen(false)
			}}
		>
			<div className="container nav-inner">
				<a href="#about" className="wordmark" aria-label={tr.home} onClick={() => setOpen(false)}>
					<span aria-hidden="true">&gt;</span> lc
					<span className="logo-cursor" aria-hidden="true">
						_
					</span>
				</a>
				<nav className="desktop-nav" aria-label={tr.label} ref={desktopNav}>
					<span className="nav-indicator" ref={indicator} aria-hidden="true" />
					{links}
				</nav>
				<div className="nav-actions">
					<button type="button" className="motion-toggle icon-button" onClick={toggle} aria-pressed={!enabled} disabled={systemReduced} aria-label={tr.pauseMotion} title={systemReduced ? tr.reducedMotion : enabled ? tr.pauseMotion : tr.resumeMotion}>
						{enabled ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
					</button>
					<div className="language-control" data-language={lang} role="group" aria-label="Language / Idioma">
						<button
							type="button"
							lang="es"
							aria-label="Español"
							aria-pressed={lang === 'es'}
							onClick={() => setLang('es')}
						>
							ES
						</button>
						<button
							type="button"
							lang="en"
							aria-label="English"
							aria-pressed={lang === 'en'}
							onClick={() => setLang('en')}
						>
							EN
						</button>
					</div>
					<a className="nav-cv" href={profile.cv[lang]} download aria-label={translations[lang].hero.cvLabel}>CV <Download size={14} aria-hidden="true" /></a>
					<button
						type="button"
						className="menu-trigger icon-button"
						ref={trigger}
						aria-expanded={open}
						aria-controls="mobile-nav"
						aria-label={open ? tr.close : tr.open}
						onClick={() => setOpen(!open)}
					>
						{open ? <X size={21} /> : <Menu size={21} />}
					</button>
				</div>
			</div>
			<nav id="mobile-nav" className="mobile-nav" aria-label={tr.label} hidden={!open}>
				{links}
			</nav>
		</header>
	)
}
