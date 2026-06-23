import { Github, Linkedin, Mail } from 'lucide-react'
import { RevealOnScroll } from './ui/RevealOnScroll'
import { GlitchText } from './ui/GlitchText'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'

const EMAIL = 'lucianocorrea1112@gmail.com'

const SOCIALS = [
	{ label: 'github', href: 'https://github.com/luccorreaa', icon: Github },
	{ label: 'linkedin', href: 'https://www.linkedin.com/in/luccorreaa-dev/', icon: Linkedin },
]

export function Contact() {
	const { lang } = useLang()
	const tr = translations[lang]

	return (
		<section
			id="contact"
			className="relative py-28 md:py-36 px-6 md:px-10"
			style={{
				background: 'linear-gradient(180deg, rgba(6,6,6,0.88) 0%, rgba(5,5,5,0.88) 100%)',
			}}
		>
			<div className="section-divider absolute top-0 left-0 right-0" />

			<div
				className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
				style={{
					background:
						'radial-gradient(ellipse at center bottom, rgba(0,255,65,0.06) 0%, transparent 70%)',
				}}
			/>

			<div className="max-w-3xl mx-auto text-center relative z-10">
				<RevealOnScroll>
					<p className="font-mono text-[#00FF41] text-xs tracking-[0.3em] mb-3 opacity-60">
						{tr.contact.eyebrow}
					</p>
					<h2 className="font-mono text-3xl md:text-4xl text-white font-bold mb-5">
						{tr.contact.title}
					</h2>
					<p className="text-[#555555] text-base max-w-sm mx-auto leading-relaxed mb-12">
						{tr.contact.subtitle}
					</p>
				</RevealOnScroll>

				<RevealOnScroll delay={0.12}>
					<a
						href={`mailto:${EMAIL}`}
						className="group inline-flex items-center gap-3 font-mono text-sm md:text-base text-[#00FF41] mb-14 px-7 py-4"
						style={{
							border: '1px solid rgba(0,255,65,0.28)',
							background: 'rgba(0,255,65,0.02)',
							transition:
								'box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease',
						}}
						onMouseEnter={(e) => {
							const el = e.currentTarget as HTMLElement
							el.style.boxShadow =
								'0 0 30px rgba(0,255,65,0.12), inset 0 0 30px rgba(0,255,65,0.03)'
							el.style.borderColor = 'rgba(0,255,65,0.55)'
							el.style.background = 'rgba(0,255,65,0.04)'
						}}
						onMouseLeave={(e) => {
							const el = e.currentTarget as HTMLElement
							el.style.boxShadow = 'none'
							el.style.borderColor = 'rgba(0,255,65,0.28)'
							el.style.background = 'rgba(0,255,65,0.02)'
						}}
					>
						<Mail
							size={15}
							className="opacity-50 group-hover:opacity-100 transition-opacity duration-200"
						/>
						<GlitchText text={EMAIL} />
					</a>
				</RevealOnScroll>

				<RevealOnScroll delay={0.22}>
					<div className="flex items-center justify-center gap-10">
						{SOCIALS.map(({ label, href, icon: Icon }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 font-mono text-sm text-[#444444] hover:text-[#00FF41] transition-colors duration-200"
							>
								<Icon size={15} />
								<GlitchText text={label} />
							</a>
						))}
					</div>
				</RevealOnScroll>

				<RevealOnScroll delay={0.32}>
					<div
						className="mt-24 pt-8"
						style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
					>
						<p className="font-mono text-[10px] text-[#282828] tracking-[0.3em]">
							{tr.contact.built}
						</p>
						<p className="font-mono text-[10px] text-[#1e1e1e] mt-1.5 tracking-wider">
							© 2026 Luciano Correa
						</p>
					</div>
				</RevealOnScroll>
			</div>
		</section>
	)
}
