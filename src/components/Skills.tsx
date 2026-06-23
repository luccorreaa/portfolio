import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { RevealOnScroll } from './ui/RevealOnScroll'
import { skillCategories } from '../data/skills'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'

type SkillCat = (typeof skillCategories)[number]

function SkillCard({ cat, ci }: { cat: SkillCat; ci: number }) {
	const ref = useRef<HTMLDivElement>(null)
	const [hovered, setHovered] = useState(false)

	const rawX = useMotionValue(0)
	const rawY = useMotionValue(0)
	const x = useSpring(rawX, { stiffness: 280, damping: 28 })
	const y = useSpring(rawY, { stiffness: 280, damping: 28 })
	const rotateX = useTransform(y, [-80, 80], [4, -4])
	const rotateY = useTransform(x, [-80, 80], [-4, 4])

	return (
		<RevealOnScroll delay={ci * 0.12} className="h-full">
			<motion.div
				ref={ref}
				className="relative h-full p-6 group"
				style={{
					rotateX: hovered ? rotateX : 0,
					rotateY: hovered ? rotateY : 0,
					transformStyle: 'preserve-3d',
					transformPerspective: 800,
					background: 'linear-gradient(135deg, #0d0d0d 0%, #0a0a0a 100%)',
					border: hovered
						? '1px solid rgba(0,255,65,0.22)'
						: '1px solid rgba(255,255,255,0.08)',
					borderTop: '1px solid rgba(0,255,65,0.22)',
					boxShadow: hovered
						? '0 20px 50px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,65,0.05)'
						: '0 4px 20px rgba(0,0,0,0.3)',
					transition: 'border-color 0.3s ease, box-shadow 0.35s ease',
				}}
				onMouseMove={(e) => {
					const rect = ref.current?.getBoundingClientRect()
					if (!rect) return
					rawX.set(e.clientX - rect.left - rect.width / 2)
					rawY.set(e.clientY - rect.top - rect.height / 2)
				}}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => {
					setHovered(false)
					rawX.set(0)
					rawY.set(0)
				}}
				whileHover={{ y: -6 }}
				transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
			>
				{/* Corner accents */}
				<div
					className="absolute top-0 right-0 w-5 h-5 pointer-events-none transition-colors duration-300"
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
					className="absolute bottom-0 left-0 w-5 h-5 pointer-events-none transition-colors duration-300"
					style={{
						borderBottom: hovered
							? '1px solid rgba(0,255,65,0.5)'
							: '1px solid rgba(255,255,255,0.08)',
						borderLeft: hovered
							? '1px solid rgba(0,255,65,0.5)'
							: '1px solid rgba(255,255,255,0.08)',
					}}
				/>

				{/* Header */}
				<div className="flex items-center justify-between mb-5">
					<p className="font-mono text-[#00FF41]/55 text-xs tracking-widest">
						{'// '}
						{cat.category}
					</p>
					<span className="font-mono text-[9px] text-[#252525] tracking-[0.2em]">
						{String(cat.skills.length).padStart(2, '0')}
					</span>
				</div>

				{/* Skill tags */}
				<div className="flex flex-wrap gap-2">
					{cat.skills.map((skill, si) => (
						<motion.span
							key={skill}
							className="font-mono text-[11px] px-2.5 py-[5px] cursor-default select-none"
							style={{
								backgroundColor: 'rgba(255,255,255,0.02)',
								border: '1px solid rgba(255,255,255,0.07)',
								color: '#4a4a4a',
							}}
							initial={{ opacity: 0, scale: 0.85 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{
								delay: ci * 0.08 + si * 0.04,
								duration: 0.35,
								ease: [0.22, 1, 0.36, 1],
							}}
							whileHover={{
								scale: 1.06,
								y: -2,
								color: '#00FF41',
								borderColor: 'rgba(0,255,65,0.4)',
								backgroundColor: 'rgba(0,255,65,0.04)',
								boxShadow: '0 0 14px rgba(0,255,65,0.18), inset 0 0 8px rgba(0,255,65,0.04)',
								transition: { duration: 0.15, ease: 'easeOut' },
							}}
						>
							{skill}
						</motion.span>
					))}
				</div>

				{/* Bottom scan line */}
				<div className="mt-6 h-px bg-white/5 overflow-hidden">
					<div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-[#00FF41]/40 to-transparent transition-all duration-500 ease-out" />
				</div>
			</motion.div>
		</RevealOnScroll>
	)
}

export function Skills() {
	const { lang } = useLang()
	const tr = translations[lang]

	return (
		<section
			id="skills"
			className="relative py-28 md:py-36 px-6 md:px-10"
			style={{
				backgroundColor: 'rgba(8,8,8,0.88)',
				backgroundImage: `
					linear-gradient(rgba(0,255,65,0.025) 1px, transparent 1px),
					linear-gradient(90deg, rgba(0,255,65,0.025) 1px, transparent 1px)
				`,
				backgroundSize: '64px 64px',
			}}
		>
			<div className="section-divider absolute top-0 left-0 right-0" />

			<div className="max-w-5xl mx-auto">
				<RevealOnScroll className="mb-16">
					<p className="font-mono text-[#00FF41] text-xs tracking-[0.3em] mb-3 opacity-60">
						{tr.skills.eyebrow}
					</p>
					<h2 className="font-mono text-3xl md:text-4xl text-white font-bold">
						{tr.skills.title}
					</h2>
				</RevealOnScroll>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
					{skillCategories.map((cat, ci) => (
						<SkillCard key={cat.category} cat={cat} ci={ci} />
					))}
				</div>
			</div>
		</section>
	)
}
