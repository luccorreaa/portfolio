import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { translations } from '../data/translations'
import { profile } from '../data/profile'

function SystemGraphic() {
	return (
		<svg className="system-graphic" viewBox="0 0 420 245" fill="none" aria-hidden="true">
			<defs>
				<radialGradient id="system-glow">
					<stop stopColor="#00ff41" stopOpacity=".1" />
					<stop offset="1" stopColor="#00ff41" stopOpacity="0" />
				</radialGradient>
			</defs>
			<ellipse cx="210" cy="122" rx="155" ry="120" fill="url(#system-glow)" />
			<g stroke="#00ff41" strokeOpacity=".13">
				<ellipse cx="210" cy="122" rx="146" ry="62" transform="rotate(-25 210 122)" />
				<ellipse cx="210" cy="122" rx="146" ry="62" transform="rotate(25 210 122)" />
				<ellipse cx="210" cy="122" rx="96" ry="96" />
				<path d="M64 122h292M210 22v200M105 53l210 138M105 191L315 53" strokeDasharray="3 5" />
			</g>
			<g stroke="#00ff41" strokeOpacity=".45">
				<path d="M105 78l105 44 106-47M210 122l-92 60m92-60 103 55" />
			</g>
			<g fill="#111a13" stroke="#405e46">
				<circle cx="105" cy="78" r="5" />
				<circle cx="316" cy="75" r="5" />
				<circle cx="118" cy="182" r="5" />
				<circle cx="313" cy="177" r="5" />
			</g>
			<rect
				x="179"
				y="91"
				width="62"
				height="62"
				rx="10"
				transform="rotate(45 210 122)"
				fill="#101c13"
				stroke="#00ff41"
				strokeOpacity=".65"
			/>
			<text x="210" y="130" textAnchor="middle" fill="#00ff41" fontSize="23" fontFamily="monospace">
				lc_
			</text>
			<g fill="#9faa9f" fontSize="10" fontFamily="monospace">
				<text x="76" y="62">
					TEST
				</text>
				<text x="294" y="58">
					BUILD
				</text>
				<text x="80" y="206">
					LEARN
				</text>
				<text x="292" y="202">
					ITERATE
				</text>
			</g>
			<g fill="#00ff41">
				<circle cx="77" cy="150" r="2" />
				<circle cx="247" cy="34" r="2" />
				<circle cx="345" cy="124" r="2" />
			</g>
		</svg>
	)
}

export function Hero() {
	const { lang } = useLang()
	const tr = translations[lang].hero
	return (
		<section id="about" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
			<div className="hero-grid" aria-hidden="true" />
			<div className="container hero-content">
				<div className="hero-topline">
					<span className="availability">
						<span className="status-dot" />
						{tr.available}
					</span>
					<span className="location">
						<MapPin size={13} aria-hidden="true" />
						{tr.location}
					</span>
				</div>
				<div className="hero-main">
					<div className="hero-copy">
						<p className="eyebrow">
							<span aria-hidden="true">~/</span> {tr.eyebrow}
						</p>
						<h1 id="hero-title">
							Luciano
							<br />
							Correa<span className="name-dot">.</span>
						</h1>
						<p className="hero-intro">
							{tr.intro}
							<br />
							<span>{tr.introAccent}</span>
						</p>
						<p className="hero-description">{tr.description}</p>
						<div className="hero-actions">
							<a href="#projects" className="button button-primary">
								{tr.projects}
								<ArrowDown size={16} aria-hidden="true" />
							</a>
							<a
								href={profile.cv[lang]}
								className="button button-secondary"
								download
								aria-label={tr.cvLabel}
							>
								<Download size={16} aria-hidden="true" />
								{tr.cv}
								<span className="file-type">PDF</span>
							</a>
						</div>
					</div>
					<aside className="profile-terminal" aria-label={tr.terminalLabel}>
						<div className="terminal-bar">
							<span className="terminal-dots" aria-hidden="true">
								<i />
								<i />
								<i />
							</span>
							<span>luciano / profile.ts</span>
							<span className="terminal-branch">main</span>
						</div>
						<div className="terminal-body">
							<div className="terminal-prompt">
								<span>❯</span> whoami
								<span className="terminal-caret" aria-hidden="true" />
							</div>
							<SystemGraphic />
							<p className="terminal-comment">{tr.terminalComment}</p>
							<dl className="profile-data">
								<div>
									<dt>role</dt>
									<dd>QA Automation Engineer</dd>
								</div>
								<div>
									<dt>{tr.focusLabel}</dt>
									<dd>{tr.focus}</dd>
								</div>
								<div>
									<dt>{tr.learningLabel}</dt>
									<dd>{tr.learning}</dd>
								</div>
								<div>
									<dt>stack</dt>
									<dd>TypeScript · React · Rust</dd>
								</div>
							</dl>
						</div>
						<div className="terminal-footer">
							<span>
								<span className="status-dot" /> build. test. repeat.
							</span>
							<span aria-hidden="true">UTF-8</span>
						</div>
					</aside>
				</div>
				<div className="hero-facts">
					<a href="#experience">
						<span className="fact-index" aria-hidden="true">
							01
						</span>
						<span>
							<small>{tr.workLabel}</small>
							<strong>{tr.work}</strong>
						</span>
						<ArrowUpRight size={17} aria-hidden="true" />
					</a>
					<a href="#projects">
						<span className="fact-index" aria-hidden="true">
							02
						</span>
						<span>
							<small>{tr.projectsLabel}</small>
							<strong>{tr.projectsValue}</strong>
						</span>
						<ArrowUpRight size={17} aria-hidden="true" />
					</a>
					<a href="#skills">
						<span className="fact-index" aria-hidden="true">
							03
						</span>
						<span>
							<small>{tr.studyLabel}</small>
							<strong>{tr.study}</strong>
						</span>
						<ArrowUpRight size={17} aria-hidden="true" />
					</a>
				</div>
			</div>
		</section>
	)
}
