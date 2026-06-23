import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MatrixRain } from './MatrixRain'
import { TerminalText } from './ui/TerminalText'
import { Download, ArrowDown } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'

const ROLES = ['Data Scientist', 'Data Engineer', 'Rust enthusiast']

const BOOT_LINES = [
	{ text: 'Initializing secure shell...', delay: 0 },
	{ text: 'Loading neural interface...', delay: 380 },
	{ text: 'Establishing connection...', delay: 760 },
	{ text: 'Access granted.', delay: 1100 },
]

const LINE_NUMBERS = Array.from({ length: 18 }, (_, i) => i + 1)

function renderTagline(tagline: string, keywords: readonly string[]) {
	const escaped = [...keywords].map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
	const regex = new RegExp(`(${escaped.join('|')})`, 'i')
	const parts = tagline.split(regex)
	return parts.map((part, i) =>
		keywords.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
			<span key={i} className="text-[#00FF41]">
				{part}
			</span>
		) : (
			part
		)
	)
}

export function Hero() {
	const [showContent, setShowContent] = useState(false)
	const [roleIndex, setRoleIndex] = useState(0)
	const [roleText, setRoleText] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)
	const [roleStarted, setRoleStarted] = useState(false)
	const { lang } = useLang()
	const tr = translations[lang]

	useEffect(() => {
		const t = setTimeout(() => setShowContent(true), 1700)
		return () => clearTimeout(t)
	}, [])

	useEffect(() => {
		if (!showContent) return
		const t = setTimeout(() => setRoleStarted(true), 900)
		return () => clearTimeout(t)
	}, [showContent])

	useEffect(() => {
		if (!roleStarted) return
		const current = ROLES[roleIndex]
		let timeout: ReturnType<typeof setTimeout>
		if (!isDeleting && roleText === current) {
			timeout = setTimeout(() => setIsDeleting(true), 1800)
		} else if (isDeleting && roleText === '') {
			timeout = setTimeout(() => {
				setIsDeleting(false)
				setRoleIndex((prev) => (prev + 1) % ROLES.length)
			}, 300)
		} else {
			timeout = setTimeout(
				() =>
					setRoleText((prev) =>
						isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1),
					),
				isDeleting ? 28 : 42,
			)
		}
		return () => clearTimeout(timeout)
	}, [roleText, isDeleting, roleIndex, roleStarted])

	const cvHref =
		lang === 'es' ? '/CV_Luciano_Correa_ES.pdf' : '/CV_Luciano_Correa_EN.pdf'

	return (
		<section
			id="about"
			className="relative min-h-screen flex items-center justify-center overflow-hidden"
			style={{
				backgroundColor: 'rgba(8,8,8,0.82)',
				backgroundImage: `
					radial-gradient(ellipse 100% 55% at 50% -5%, rgba(0,255,65,0.07) 0%, transparent 65%),
					radial-gradient(rgba(0,255,65,0.09) 1px, transparent 1px)
				`,
				backgroundSize: '100% 100%, 28px 28px',
			}}
		>
			<MatrixRain />

			{/* Vignette */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						'radial-gradient(ellipse 65% 65% at 50% 50%, transparent 0%, #080808 100%)',
				}}
			/>

			{/* Bottom fade */}
			<div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />

			{/* Left line-number decoration */}
			<div className="absolute left-5 top-0 bottom-0 flex flex-col justify-center pointer-events-none select-none hidden lg:flex">
				<div className="space-y-[1.18rem]">
					{LINE_NUMBERS.map((n) => (
						<div key={n} className="font-mono text-[10px] text-white/[0.04] text-right w-6">
							{String(n).padStart(2, '0')}
						</div>
					))}
				</div>
			</div>

			{/* Right decorative dashes */}
			<div className="absolute right-8 top-1/4 bottom-1/4 pointer-events-none hidden lg:flex flex-col justify-between items-end">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="w-4 h-px bg-[#00FF41]/10" />
				))}
			</div>

			<div className="relative z-10 max-w-4xl mx-auto px-8 py-32">
				{/* Boot sequence */}
				<motion.div
					className="font-mono text-xs text-[#00FF41]/40 space-y-1 mb-10"
					animate={{ opacity: showContent ? 0 : 1 }}
					transition={{ duration: 0.4 }}
					style={{ position: showContent ? 'absolute' : 'relative', pointerEvents: 'none' }}
				>
					{BOOT_LINES.map((line, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, x: -8 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: line.delay / 1000, duration: 0.3 }}
							className="tracking-wider"
						>
							<span className="text-[#00FF41]/60">{'> '}</span>
							{line.text}
						</motion.div>
					))}
				</motion.div>

				{/* Main content */}
				{showContent && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						{/* Prompt line */}
						<div className="font-mono text-[#00FF41]/35 text-xs mb-5 tracking-[0.2em] flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]/40 inline-block" />
							root@portfolio:~$ ./identify.sh
						</div>

						{/* Name */}
						<h1
							className="font-mono text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-3 leading-none tracking-tight"
							style={{
								textShadow:
									'0 0 40px rgba(0,255,65,0.2), 0 0 80px rgba(0,255,65,0.08)',
							}}
						>
							<TerminalText text="Luciano Correa" delay={80} speed={48} />
						</h1>

						{/* Role */}
						<div className="font-mono text-xl md:text-2xl text-[#00FF41] mb-8 tracking-wide">
							<span className="text-[#303030]">{'> '}</span>
							<span>
								{roleText}
								<span
									className="inline-block w-[2px] bg-[#00FF41] ml-0.5 align-middle"
									style={{ height: '0.85em' }}
								/>
							</span>
						</div>

						{/* Tagline */}
						<motion.p
							className="text-[#666666] text-base md:text-lg max-w-lg leading-relaxed mb-4"
							initial={{ opacity: 0, y: 14 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
						>
							{renderTagline(tr.hero.tagline, tr.hero.keywords)}
						</motion.p>

						{/* Separator */}
						<motion.div
							className="w-24 h-px mb-8"
							style={{
								background:
									'linear-gradient(90deg, rgba(0,255,65,0.4) 0%, rgba(0,255,65,0.1) 70%, transparent 100%)',
								transformOrigin: 'left',
							}}
							initial={{ opacity: 0, scaleX: 0 }}
							animate={{ opacity: 1, scaleX: 1 }}
							transition={{ delay: 2.0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
						/>

						{/* CTAs */}
						<motion.div
							className="flex flex-wrap gap-4"
							initial={{ opacity: 0, y: 14 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 2.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
						>
							<a
								href="#projects"
								className="group relative px-6 py-3 font-mono text-sm border border-[#00FF41] text-[#00FF41] overflow-hidden"
								style={{ transition: 'box-shadow 0.25s ease' }}
								onMouseEnter={(e) => {
									;(e.currentTarget as HTMLElement).style.boxShadow =
										'0 0 20px rgba(0,255,65,0.2), inset 0 0 20px rgba(0,255,65,0.05)'
								}}
								onMouseLeave={(e) => {
									;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
								}}
							>
								<span className="relative z-10">{tr.hero.cta_view}</span>
								<div className="absolute inset-0 bg-[#00FF41]/7 scale-x-0 group-hover:scale-x-100 transition-transform duration-[250ms] ease-out origin-left" />
							</a>

							<a
								href={cvHref}
								download
								className="flex items-center gap-2 px-6 py-3 font-mono text-sm border border-white/10 text-[#555555] hover:border-white/20 hover:text-[#909090] transition-all duration-200"
							>
								<Download size={13} />
								{tr.hero.cta_cv}
							</a>
						</motion.div>

						{/* Status row */}
						<motion.div
							className="flex items-center gap-5 mt-10"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 2.7, duration: 0.8 }}
						>
							<div className="flex items-center gap-1.5">
								<span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
								<span className="font-mono text-[10px] text-[#383838] tracking-widest">
									{tr.hero.available}
								</span>
							</div>
							<div className="w-px h-3 bg-white/10" />
							<span className="font-mono text-[10px] text-[#383838] tracking-widest">
								Buenos Aires, AR
							</span>
						</motion.div>
					</motion.div>
				)}
			</div>

			{/* Scroll hint */}
			<motion.div
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 4.0, duration: 1 }}
			>
				<span className="font-mono text-[10px] text-[#2a2a2a] tracking-[0.4em]">SCROLL</span>
				<motion.div
					animate={{ y: [0, 6, 0] }}
					transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
					className="text-[#00FF41]/25"
				>
					<ArrowDown size={16} />
				</motion.div>
			</motion.div>
		</section>
	)
}
