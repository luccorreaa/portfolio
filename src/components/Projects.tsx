import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { RevealOnScroll } from './ui/RevealOnScroll'
import { projects, type Project } from '../data/projects'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'

function NotesPlaceholder() {
	return (
		<div className="w-full h-full flex flex-col justify-center px-5 py-4">
			<div
				className="flex items-center gap-2.5 mb-3 pb-2"
				style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
			>
				<div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
				<div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
				<div className="w-2 h-2 rounded-full bg-[#27c93f]" />
				<span className="font-mono text-[10px] text-[#404040] ml-1.5">
					notes/notes.controller.ts
				</span>
			</div>

			<div className="font-mono text-[11px] leading-[1.65] space-y-0">
				{[
					{ n: 1, tokens: [{ t: '// REST API — NestJS + Prisma + PostgreSQL', c: 'text-[#5a8a5a]' }] },
					{ n: 2, tokens: [] },
					{
						n: 3,
						tokens: [
							{ t: '@Controller', c: 'text-[#dcdcaa]' },
							{ t: "('notes')", c: 'text-[#ce9178]' },
						],
					},
					{
						n: 4,
						tokens: [
							{ t: 'export class ', c: 'text-[#569cd6]' },
							{ t: 'NotesController', c: 'text-[#4ec9b0]' },
							{ t: ' {', c: 'text-[#d4d4d4]' },
						],
					},
					{ n: 5, tokens: [] },
					{
						n: 6,
						tokens: [
							{ t: '  @Get', c: 'text-[#dcdcaa]' },
							{ t: '()', c: 'text-[#d4d4d4]' },
						],
					},
					{
						n: 7,
						tokens: [
							{ t: '  findAll', c: 'text-[#dcdcaa]' },
							{ t: '() {', c: 'text-[#d4d4d4]' },
						],
					},
					{
						n: 8,
						tokens: [
							{ t: '    return ', c: 'text-[#569cd6]' },
							{ t: 'this', c: 'text-[#569cd6]' },
							{ t: '.notes.', c: 'text-[#d4d4d4]' },
							{ t: 'findAll', c: 'text-[#dcdcaa]' },
							{ t: '()', c: 'text-[#d4d4d4]' },
						],
					},
					{ n: 9, tokens: [{ t: '  }', c: 'text-[#d4d4d4]' }] },
				].map(({ n, tokens }) => (
					<div key={n} className="flex">
						<span className="text-[#3a3a3a] w-4 mr-4 shrink-0 text-right select-none">{n}</span>
						<span>
							{tokens.map((tok, ti) => (
								<span key={ti} className={tok.c}>
									{tok.t}
								</span>
							))}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

function RustPlaceholder() {
	return (
		<div className="w-full h-full flex flex-col justify-center px-5 py-4">
			<div
				className="flex items-center gap-2.5 mb-3 pb-2"
				style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
			>
				<div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
				<div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
				<div className="w-2 h-2 rounded-full bg-[#27c93f]" />
				<span className="font-mono text-[10px] text-[#404040] ml-1.5">
					blockchain/src/node.rs
				</span>
			</div>

			<div className="font-mono text-[11px] leading-[1.65] space-y-0">
				{[
					{ n: 1, tokens: [{ t: '// blockchain node — P2P mesh, PoW mining', c: 'text-[#5a8a5a]' }] },
					{ n: 2, tokens: [] },
					{
						n: 3,
						tokens: [
							{ t: 'use ', c: 'text-[#569cd6]' },
							{ t: 'sha2', c: 'text-[#4ec9b0]' },
							{ t: '::{Sha256, Digest};', c: 'text-[#d4d4d4]' },
						],
					},
					{
						n: 4,
						tokens: [
							{ t: 'use ', c: 'text-[#569cd6]' },
							{ t: 'libp2p', c: 'text-[#4ec9b0]' },
							{ t: '::', c: 'text-[#d4d4d4]' },
							{ t: 'gossipsub', c: 'text-[#dcdcaa]' },
							{ t: ';', c: 'text-[#d4d4d4]' },
						],
					},
					{ n: 5, tokens: [] },
					{
						n: 6,
						tokens: [
							{ t: 'pub struct ', c: 'text-[#569cd6]' },
							{ t: 'Block', c: 'text-[#4ec9b0]' },
							{ t: ' {', c: 'text-[#d4d4d4]' },
						],
					},
					{
						n: 7,
						tokens: [
							{ t: '    pub ', c: 'text-[#569cd6]' },
							{ t: 'hash', c: 'text-[#9cdcfe]' },
							{ t: ':  ', c: 'text-[#d4d4d4]' },
							{ t: 'String', c: 'text-[#4ec9b0]' },
							{ t: ',', c: 'text-[#d4d4d4]' },
						],
					},
					{
						n: 8,
						tokens: [
							{ t: '    pub ', c: 'text-[#569cd6]' },
							{ t: 'nonce', c: 'text-[#9cdcfe]' },
							{ t: ': ', c: 'text-[#d4d4d4]' },
							{ t: 'u64', c: 'text-[#4ec9b0]' },
							{ t: ',', c: 'text-[#d4d4d4]' },
						],
					},
					{ n: 9, tokens: [{ t: '}', c: 'text-[#d4d4d4]' }] },
				].map(({ n, tokens }) => (
					<div key={n} className="flex">
						<span className="text-[#3a3a3a] w-4 mr-4 shrink-0 text-right select-none">{n}</span>
						<span>
							{tokens.map((tok, ti) => (
								<span key={ti} className={tok.c}>
									{tok.t}
								</span>
							))}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

function ProjectCard({
	project,
	index,
	wide,
	lang,
}: {
	project: Project
	index: number
	wide?: boolean
	lang: 'en' | 'es'
}) {
	const ref = useRef<HTMLDivElement>(null)
	const [hovered, setHovered] = useState(false)

	const rawX = useMotionValue(0)
	const rawY = useMotionValue(0)
	const x = useSpring(rawX, { stiffness: 280, damping: 28 })
	const y = useSpring(rawY, { stiffness: 280, damping: 28 })
	const rotateX = useTransform(y, [-100, 100], [5, -5])
	const rotateY = useTransform(x, [-100, 100], [-5, 5])

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = ref.current?.getBoundingClientRect()
		if (!rect) return
		rawX.set(e.clientX - rect.left - rect.width / 2)
		rawY.set(e.clientY - rect.top - rect.height / 2)
	}

	const handleMouseLeave = () => {
		setHovered(false)
		rawX.set(0)
		rawY.set(0)
	}

	const description = lang === 'es' ? project.description_es : project.description

	return (
		<RevealOnScroll delay={index * 0.1} className="h-full">
			<motion.div
				ref={ref}
				className="relative overflow-hidden group flex flex-col h-full"
				style={{
					rotateX: hovered ? rotateX : 0,
					rotateY: hovered ? rotateY : 0,
					transformStyle: 'preserve-3d',
					transformPerspective: 900,
					background: 'linear-gradient(145deg, #0e0e0e 0%, #0a0a0a 100%)',
					border: hovered
						? '1px solid rgba(0,255,65,0.22)'
						: '1px solid rgba(255,255,255,0.07)',
					transition: 'border-color 0.3s ease',
					boxShadow: hovered
						? '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,255,65,0.06)'
						: '0 4px 20px rgba(0,0,0,0.4)',
				}}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={handleMouseLeave}
				whileHover={{ y: -6 }}
				transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
			>
				{/* Preview */}
				<div
					className={`relative overflow-hidden ${wide ? 'h-56' : 'h-44'}`}
					style={{
						background: 'linear-gradient(180deg, #0c0c0c 0%, #090909 100%)',
						borderBottom: '1px solid rgba(255,255,255,0.05)',
					}}
				>
					{project.image ? (
						<img
							src={project.image}
							alt={project.title}
							className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>
					) : project.id === 2 ? (
						<NotesPlaceholder />
					) : (
						<RustPlaceholder />
					)}

					<motion.div
						className="absolute inset-0 flex items-center justify-center"
						style={{ background: 'rgba(0,255,65,0.03)' }}
						animate={{ opacity: hovered ? 1 : 0 }}
						transition={{ duration: 0.18 }}
					>
						<motion.span
							className="font-mono text-[10px] text-[#00FF41] tracking-[0.4em]"
							style={{
								border: '1px solid rgba(0,255,65,0.25)',
								padding: '6px 14px',
								background: 'rgba(0,0,0,0.7)',
							}}
							animate={{ opacity: hovered ? [0, 1] : 0 }}
							transition={{ duration: 0.25 }}
						>
							[ ACCESSING ]
						</motion.span>
					</motion.div>

					<motion.div
						className="absolute left-0 right-0 h-px"
						style={{
							background:
								'linear-gradient(90deg, transparent, rgba(0,255,65,0.5), transparent)',
						}}
						animate={{ y: hovered ? [0, wide ? 224 : 176] : 0, opacity: hovered ? 1 : 0 }}
						transition={{ duration: 0.9, ease: 'linear', repeat: hovered ? Infinity : 0 }}
					/>
				</div>

				{/* Content */}
				<div className="p-5 flex flex-col flex-1">
					<div className="flex items-start justify-between mb-2">
						<h3 className="font-mono text-white font-bold text-sm">{project.title}</h3>
						<div className="flex gap-3 ml-3 shrink-0">
							{project.github && (
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="text-[#383838] hover:text-[#00FF41] transition-colors duration-200"
									aria-label="GitHub"
								>
									<Github size={14} />
								</a>
							)}
							{project.demo && (
								<a
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									className="text-[#383838] hover:text-[#00FF41] transition-colors duration-200"
									aria-label="Live demo"
								>
									<ExternalLink size={14} />
								</a>
							)}
						</div>
					</div>

					<p className="text-[#555555] text-xs leading-relaxed mb-4">{description}</p>

					{project.tech.length > 0 && (
						<div className="flex flex-wrap gap-1.5">
							{project.tech.map((t) => (
								<span
									key={t}
									className="font-mono text-[10px] text-[#00FF41]/45 px-2 py-0.5"
									style={{
										border: '1px solid rgba(0,255,65,0.12)',
										background: 'rgba(0,255,65,0.02)',
									}}
								>
									{t}
								</span>
							))}
						</div>
					)}
				</div>

				{/* Corner accents */}
				<div
					className="absolute top-0 right-0 w-5 h-5 transition-colors duration-300"
					style={{
						borderTop: hovered
							? '1px solid rgba(0,255,65,0.5)'
							: '1px solid rgba(255,255,255,0.08)',
						borderRight: hovered
							? '1px solid rgba(0,255,65,0.5)'
							: '1px solid rgba(255,255,255,0.08)',
					}}
				/>
				<div
					className="absolute bottom-0 left-0 w-5 h-5 transition-colors duration-300"
					style={{
						borderBottom: hovered
							? '1px solid rgba(0,255,65,0.5)'
							: '1px solid rgba(255,255,255,0.08)',
						borderLeft: hovered
							? '1px solid rgba(0,255,65,0.5)'
							: '1px solid rgba(255,255,255,0.08)',
					}}
				/>
			</motion.div>
		</RevealOnScroll>
	)
}

export function Projects() {
	const { lang } = useLang()
	const tr = translations[lang]
	const isSingle = projects.length === 1

	return (
		<section
			id="projects"
			className="relative py-28 md:py-36 px-6 md:px-10"
			style={{ background: 'linear-gradient(180deg, rgba(6,6,6,0.88) 0%, rgba(5,5,5,0.88) 100%)' }}
		>
			<div className="section-divider absolute top-0 left-0 right-0" />

			<div className="max-w-5xl mx-auto">
				<RevealOnScroll className="mb-16">
					<p className="font-mono text-[#00FF41] text-xs tracking-[0.3em] mb-3 opacity-60">
						{tr.projects.eyebrow}
					</p>
					<h2 className="font-mono text-3xl md:text-4xl text-white font-bold">
						{tr.projects.title}
					</h2>
				</RevealOnScroll>

				{isSingle ? (
					<div className="max-w-2xl mx-auto">
						<ProjectCard project={projects[0]} index={0} wide lang={lang} />
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						{projects.map((project, i) => (
							<ProjectCard key={project.id} project={project} index={i} lang={lang} />
						))}
					</div>
				)}

				<RevealOnScroll delay={0.2} className="mt-10 text-center">
					<p className="font-mono text-[10px] text-[#2a2a2a] tracking-[0.3em]">
						{tr.projects.more}
					</p>
				</RevealOnScroll>
			</div>
		</section>
	)
}
