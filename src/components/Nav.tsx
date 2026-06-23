import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'

const SECTION_IDS = ['about', 'skills', 'projects', 'experience', 'contact'] as const
type SectionId = (typeof SECTION_IDS)[number]

export function Nav() {
	const [scrolled, setScrolled] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)
	const [activeSection, setActiveSection] = useState<SectionId>('about')
	const { lang, setLang } = useLang()
	const tr = translations[lang]

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 60)
			const scrollY = window.scrollY + 100
			let current: SectionId = 'about'
			for (const id of SECTION_IDS) {
				const el = document.getElementById(id)
				if (el && el.offsetTop <= scrollY) current = id
			}
			setActiveSection(current)
		}
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	const navLinks = SECTION_IDS.map((id) => ({
		id,
		label: tr.nav[id],
		href: `#${id}`,
	}))

	return (
		<motion.header
			className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between"
			style={{
				background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
				backdropFilter: scrolled ? 'blur(12px)' : 'none',
				borderBottom: scrolled ? '1px solid rgba(0,255,65,0.08)' : '1px solid transparent',
				transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
			}}
			initial={{ y: -60, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.7, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
		>
			{/* Logo */}
			<a
				href="#about"
				className="font-mono text-[#00FF41] text-base font-bold tracking-widest select-none"
			>
				&gt; lc<span className="animate-blink">_</span>
			</a>

			{/* Desktop nav */}
			<nav className="hidden md:flex items-center gap-7">
				{navLinks.map((link) => {
					const isActive = activeSection === link.id
					return (
						<a
							key={link.id}
							href={link.href}
							className={`relative flex items-center gap-1.5 font-mono text-xs tracking-wider transition-colors duration-200 ${
								isActive ? 'text-[#00FF41]' : 'text-[#606060] hover:text-[#00FF41]'
							}`}
						>
							{isActive && (
								<span className="w-[3px] h-[3px] bg-[#00FF41] shrink-0 rotate-45" />
							)}
							<span className="relative">
								{link.label}
								{isActive && (
									<span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#00FF41]/35" />
								)}
							</span>
						</a>
					)
				})}

				{/* Language switcher */}
				<div className="flex items-center gap-2 font-mono text-xs ml-2 pl-4 border-l border-white/[0.07]">
					<button
						onClick={() => setLang('en')}
						className="transition-colors duration-200 tracking-wider"
						style={{
							color: lang === 'en' ? '#00FF41' : '#383838',
							textDecoration: lang === 'en' ? 'underline' : 'none',
							textUnderlineOffset: '3px',
						}}
					>
						EN
					</button>
					<span className="text-[#252525]">|</span>
					<button
						onClick={() => setLang('es')}
						className="transition-colors duration-200 tracking-wider"
						style={{
							color: lang === 'es' ? '#00FF41' : '#383838',
							textDecoration: lang === 'es' ? 'underline' : 'none',
							textUnderlineOffset: '3px',
						}}
					>
						ES
					</button>
				</div>
			</nav>

			{/* Mobile hamburger */}
			<button
				className="md:hidden font-mono text-xs text-[#606060] hover:text-[#00FF41] transition-colors"
				onClick={() => setMenuOpen((v) => !v)}
				aria-label="Toggle menu"
			>
				{menuOpen ? '[close]' : '[menu]'}
			</button>

			{/* Mobile menu */}
			{menuOpen && (
				<motion.div
					className="absolute top-full left-0 right-0 bg-[#080808]/95 backdrop-blur-md border-b border-[#00FF41]/10 p-6 flex flex-col gap-4 md:hidden"
					initial={{ opacity: 0, y: -8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.2 }}
				>
					{navLinks.map((link) => (
						<a
							key={link.id}
							href={link.href}
							onClick={() => setMenuOpen(false)}
							className="flex items-center gap-2 font-mono text-sm transition-colors"
							style={{ color: activeSection === link.id ? '#00FF41' : '#808080' }}
						>
							{activeSection === link.id && (
								<span className="w-[3px] h-[3px] bg-[#00FF41] rotate-45 shrink-0" />
							)}
							{link.label}
						</a>
					))}
					<div className="flex items-center gap-3 pt-3 mt-1 border-t border-white/[0.05] font-mono text-sm">
						<button
							onClick={() => setLang('en')}
							style={{ color: lang === 'en' ? '#00FF41' : '#484848' }}
						>
							EN
						</button>
						<span className="text-[#252525]">|</span>
						<button
							onClick={() => setLang('es')}
							style={{ color: lang === 'es' ? '#00FF41' : '#484848' }}
						>
							ES
						</button>
					</div>
				</motion.div>
			)}
		</motion.header>
	)
}
