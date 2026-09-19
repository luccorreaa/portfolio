import { Code2, Database, Languages, Terminal, TestTube2 } from 'lucide-react'
import { skillCategories } from '../data/skills'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'

const icons = { testing: TestTube2, frontend: Code2, backend: Database, tools: Terminal }

export function Skills() {
	const { lang } = useLang()
	const tr = translations[lang].skills
	return (
		<section
			id="skills"
			className="section skills-section"
			aria-labelledby="skills-title"
			tabIndex={-1}
		>
			<div className="container">
				<div className="section-heading">
					<div>
						<p className="eyebrow">{tr.eyebrow}</p>
						<h2 id="skills-title">{tr.title}</h2>
						<p className="section-description">{tr.description}</p>
					</div>
					<span className="section-command" aria-hidden="true">
						~/toolkit
					</span>
				</div>
				<div className="skills-grid">
					{skillCategories.map(({ id, skills }, i) => {
						const Icon = icons[id]
						return (
							<article className="skill-group" key={id}>
								<div className="skill-group-top">
									<Icon size={21} aria-hidden="true" />
									<span aria-hidden="true">0{i + 1}</span>
								</div>
								<h3>{tr[id]}</h3>
								<ul>
									{skills.map((skill) => (
										<li key={skill}>{skill}</li>
									))}
								</ul>
							</article>
						)
					})}
				</div>
				<div className="skills-bottom">
					<div className="languages">
						<h3>
							<Languages size={17} aria-hidden="true" />
							{tr.languages}
						</h3>
						<p>
							{tr.spanish}
							<span>{tr.native}</span>
						</p>
						<p>
							{tr.english}
							<span>B2</span>
						</p>
					</div>
					<div className="soft-skills">
						<h3>{tr.approach}</h3>
						<ul>
							{tr.soft.map((skill) => (
								<li key={skill}>{skill}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
