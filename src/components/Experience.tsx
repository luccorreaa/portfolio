import { BriefcaseBusiness, GraduationCap } from 'lucide-react'
import { workExperience as work } from '../data/experience'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'

export function Experience() {
	const { lang } = useLang()
	const tr = translations[lang].experience
	return (
		<section
			id="experience"
			className="section experience-section"
			aria-labelledby="experience-title"
			tabIndex={-1}
		>
			<div className="container experience-layout">
				<div className="experience-heading">
					<p className="eyebrow">{tr.eyebrow}</p>
					<h2 id="experience-title">{tr.title}</h2>
					<p className="section-description">{tr.description}</p>
					<span className="section-command" aria-hidden="true">
						$ cat journey.log
					</span>
				</div>
				<div className="timeline">
					<article className="timeline-item">
						<span className="timeline-icon">
							<BriefcaseBusiness size={18} aria-hidden="true" />
						</span>
						<div className="timeline-top">
							<span className="overline">{tr.work}</span>
							<span className="current-badge">
								<span className="status-dot" />
								{tr.current}
							</span>
						</div>
						<p className="timeline-date">{work.period[lang]}</p>
						<h3>{work.role}</h3>
						<p className="company">
							{work.company}
							<span> / {work.companyType[lang]}</span>
						</p>
						<p className="work-location">{work.location}</p>
						<ul className="work-highlights">
							{work.highlights[lang].map((text) => (
								<li key={text}>{text}</li>
							))}
						</ul>
						<ul className="tags">
							{work.tech.map((tech) => (
								<li key={tech}>{tech}</li>
							))}
						</ul>
					</article>
					<article className="timeline-item">
						<span className="timeline-icon">
							<GraduationCap size={19} aria-hidden="true" />
						</span>
						<p className="overline">{tr.education}</p>
						<p className="timeline-date">
							{tr.period} <span className="date-separator">/</span> {tr.progress}
						</p>
						<h3>{tr.degree}</h3>
						<p className="company">{tr.university}</p>
						<p className="education-description">{tr.studyDescription}</p>
					</article>
				</div>
			</div>
		</section>
	)
}
