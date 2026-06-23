import { RevealOnScroll } from './ui/RevealOnScroll'
import { experience } from '../data/experience'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'

const TYPE_COLOR = {
	work: '#00FF41',
	education: '#00ccaa',
	project: '#7c5cbf',
}

const TYPE_LABEL = {
	work: 'PROCESS',
	education: 'LOADED',
	project: 'BUILD',
}

export function Experience() {
	const { lang } = useLang()
	const tr = translations[lang]

	return (
		<section
			id="experience"
			className="relative py-28 md:py-36 px-6 md:px-10"
			style={{
				backgroundColor: 'rgba(8,8,8,0.88)',
				backgroundImage: `
					linear-gradient(rgba(0,255,65,0.022) 1px, transparent 1px),
					linear-gradient(90deg, rgba(0,255,65,0.022) 1px, transparent 1px)
				`,
				backgroundSize: '64px 64px',
			}}
		>
			<div className="section-divider absolute top-0 left-0 right-0" />

			<div className="max-w-3xl mx-auto">
				<RevealOnScroll className="mb-16">
					<p className="font-mono text-[#00FF41] text-xs tracking-[0.3em] mb-3 opacity-60">
						{tr.experience.eyebrow}
					</p>
					<h2 className="font-mono text-3xl md:text-4xl text-white font-bold">
						{tr.experience.title}
					</h2>
				</RevealOnScroll>

				<div className="relative">
					{/* Left rail — 2px, stronger gradient */}
					<div
						className="absolute left-0 top-2 bottom-2 w-[2px]"
						style={{
							background:
								'linear-gradient(to bottom, rgba(0,255,65,0.5) 0%, rgba(0,255,65,0.15) 80%, transparent 100%)',
						}}
					/>

					<div className="space-y-0">
						{experience.map((item, i) => {
							const color = TYPE_COLOR[item.type]
							const description = lang === 'es' ? item.description_es : item.description
							return (
								<RevealOnScroll key={i} delay={i * 0.09}>
									<div className="relative pl-8 pb-8 last:pb-0 group">
										{/* Dot with hover ring */}
										<div className="absolute left-0 top-[6px] -translate-x-[5px] w-[12px] h-[12px] flex items-center justify-center">
											<div
												className="absolute inset-0 rounded-full border scale-[1.7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
												style={{ borderColor: color + '38' }}
											/>
											<div
												className="w-[7px] h-[7px] rounded-full transition-transform duration-300 group-hover:scale-110"
												style={{ background: color }}
											/>
										</div>

										{/* Card */}
										<div
											className="p-5 transition-all duration-300"
											style={{
												background: 'linear-gradient(135deg, #0d0d0d 0%, #0a0a0a 100%)',
												border: '1px solid rgba(255,255,255,0.06)',
												borderLeft: `2px solid ${color}28`,
											}}
											onMouseEnter={(e) => {
												const el = e.currentTarget as HTMLElement
												el.style.borderLeftColor = color + '55'
												el.style.boxShadow = `0 4px 30px rgba(0,0,0,0.5), -4px 0 24px ${color}08`
											}}
											onMouseLeave={(e) => {
												const el = e.currentTarget as HTMLElement
												el.style.borderLeftColor = color + '28'
												el.style.boxShadow = 'none'
											}}
										>
											<div className="font-mono text-[10px] tracking-[0.25em] mb-3 flex items-center gap-3">
												<span style={{ color: `${color}65` }}>
													[{item.period}]
												</span>
												<span
													className="text-[9px] px-1.5 py-0.5"
													style={{
														color: color,
														border: `1px solid ${color}28`,
														background: `${color}08`,
													}}
												>
													{TYPE_LABEL[item.type]}
												</span>
											</div>

											<div className="flex items-baseline justify-between gap-4 mb-2">
												<h3 className="font-mono text-white font-bold text-sm">
													{item.role}
												</h3>
												<span
													className="font-mono text-xs shrink-0"
													style={{ color }}
												>
													{item.company}
												</span>
											</div>

											<p className="text-[#585858] text-sm leading-relaxed">
												{description}
											</p>

											{item.tech.length > 0 && (
												<div className="flex flex-wrap gap-1.5 mt-4">
													{item.tech.map((t) => (
														<span
															key={t}
															className="font-mono text-[10px] text-[#383838] px-2 py-0.5"
															style={{
																border: '1px solid rgba(255,255,255,0.06)',
																background: 'rgba(255,255,255,0.02)',
															}}
														>
															{t}
														</span>
													))}
												</div>
											)}
										</div>
									</div>
								</RevealOnScroll>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
