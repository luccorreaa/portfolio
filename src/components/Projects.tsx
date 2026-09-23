import { ArrowUpRight, Github } from 'lucide-react'
import { projects, type Project } from '../data/projects'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'
import { profile } from '../data/profile'

function ProjectDiagram({ id }: { id: Project['id'] }) {
	return (
		<svg
			viewBox="0 0 480 172"
			fill="none"
			className={`project-diagram diagram-${id}`}
			aria-hidden="true"
		>
			{id === 'anvil' && (
				<>
					<g stroke="currentColor" opacity=".35">
						<path d="M132 86h64m88 0h64M240 49V26h108v30M240 123v23h108v-30" />
						<path d="M240 38l44 24v48l-44 24-44-24V62z" />
					</g>
					<rect x="41" y="64" width="91" height="44" rx="5" className="diagram-box" />
					<text x="86" y="90">
						gRPC
					</text>
					<path
						d="M240 49l32 18v38l-32 18-32-18V67z"
						fill="#14261a"
						stroke="currentColor"
						opacity=".8"
					/>
					<text x="240" y="90" className="diagram-accent">
						Rust
					</text>
					{[35, 75, 115].map((y) => (
						<g key={y}>
							<rect x="348" y={y} width="91" height="28" rx="4" className="diagram-box" />
							<circle cx="363" cy={y + 14} r="3" fill="currentColor" />
							<path d={`M377 ${y + 14}h47`} stroke="currentColor" opacity=".35" />
						</g>
					))}
				</>
			)}
			{id === 'blockchain' && (
				<>
					<g stroke="currentColor" opacity=".3">
						<path d="M100 85h280M160 85l80-51 80 51-80 51z" strokeDasharray="4 5" />
					</g>
					{[82, 205, 328].map((x, i) => (
						<g key={x}>
							<path d={`M${x + 35} 47l35 20v40l-35 20-35-20V67z`} className="diagram-box" />
							<path d={`M${x} 67l35 20 35-20m-35 20v40`} stroke="currentColor" opacity=".4" />
							<text x={x + 35} y="77" className="diagram-accent">
								0{i + 1}
							</text>
						</g>
					))}
					<circle cx="240" cy="34" r="4" fill="currentColor" />
					<circle cx="240" cy="136" r="4" fill="currentColor" />
				</>
			)}
			{id === 'interview' && (
				<>
					<rect x="43" y="40" width="394" height="94" rx="7" className="diagram-box" />
					<path d="M61 60h358" stroke="currentColor" opacity=".15" />
					<circle cx="61" cy="51" r="2" fill="currentColor" />
					{Array.from({ length: 28 }, (_, i) => {
						const height = 8 + Math.abs(Math.sin(i * 1.81)) * 34
						return (
							<path
								key={i}
								d={`M${69 + i * 5} ${95 - height / 2}v${height}`}
								stroke="currentColor"
								strokeWidth="2"
								opacity={0.3 + (i % 3) * 0.25}
							/>
						)
					})}
					<path d="M230 95h33m-6-5 6 5-6 5" stroke="currentColor" opacity=".6" />
					<text x="345" y="92">
						Whisper → Claude
					</text>
					<path d="M285 108h116" stroke="currentColor" opacity=".2" />
				</>
			)}
			{id === 'notes' && (
				<>
					<g stroke="currentColor" opacity=".4">
						<path d="M144 86h30m132 0h30" />
						<path d="M169 82l5 4-5 4m162-8 5 4-5 4" />
					</g>
					{[
						{ x: 40, label: 'React', sub: 'interface' },
						{ x: 188, label: 'NestJS', sub: 'api' },
						{ x: 336, label: 'PostgreSQL', sub: 'database' }
					].map(({ x, label, sub }) => (
						<g key={label}>
							<rect x={x} y="50" width="104" height="72" rx="5" className="diagram-box" />
							<text x={x + 52} y="82" className="diagram-accent">
								{label}
							</text>
							<text x={x + 52} y="104" className="diagram-small">
								{sub}
							</text>
						</g>
					))}
				</>
			)}
		</svg>
	)
}

export function Projects() {
	const { lang } = useLang()
	const tr = translations[lang].projects
	return (
		<section
			id="projects"
			className="section projects-section"
			aria-labelledby="projects-title"
			tabIndex={-1}
		>
			<div className="container">
				<div className="section-heading" data-reveal>
					<div>
						<p className="eyebrow">{tr.eyebrow}</p>
						<h2 id="projects-title">{tr.title}</h2>
						<p className="section-description">{tr.description}</p>
					</div>
					<a className="text-link" href={profile.github} target="_blank" rel="noopener noreferrer">
						{tr.github}
						<ArrowUpRight size={16} aria-hidden="true" />
					</a>
				</div>
				<div className="projects-grid">
					{projects.map((project, i) => (
						<article
							className={`project-card project-${project.id}`}
							data-reveal
							data-reveal-delay={(i % 2) * 90}
							key={project.id}
							aria-labelledby={`project-${project.id}`}
						>
							<div className="project-visual">
								<div className="project-visual-label">
									<span>
										{String(i + 1).padStart(2, '0')} /{' '}
										{project.id === 'interview'
											? 'audio.pipeline'
											: project.id === 'notes'
												? 'fullstack.flow'
												: project.id === 'anvil'
													? 'distributed.proofs'
													: 'peer.to.peer'}
									</span>
									<span>{project.year}</span>
								</div>
								<ProjectDiagram id={project.id} />
								<span className="visual-orbit" aria-hidden="true" />
								<span className="diagram-caption">{tr.diagram}</span>
							</div>
							<div className="project-content">
								<p className="project-category">{project.category[lang]}</p>
								<h3 id={`project-${project.id}`}>{project.title}</h3>
								<p className="project-description">{project.description[lang]}</p>
								<ul className="tags" aria-label="Stack">
									{project.tech.map((tech) => (
										<li key={tech}>{tech}</li>
									))}
								</ul>
								<div className="project-footer">
									<span className="authorship">{tr[project.authorship]}</span>
									<div className="project-links">
										{project.github && (
											<a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`${tr.code}: ${project.title}`}
											>
												<Github size={15} aria-hidden="true" />
												{tr.code}
											</a>
										)}
										{project.demo && (
											<a
												href={project.demo}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`${tr.demo}: ${project.title}`}
											>
												{tr.demo}
												<ArrowUpRight size={15} aria-hidden="true" />
											</a>
										)}
									</div>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
