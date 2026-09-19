import { LanguageProvider, useLang } from './context/LanguageContext'
import { translations } from './data/translations'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'

function Portfolio() {
	const { lang } = useLang()
	return (
		<>
			<a className="skip-link" href="#main">
				{translations[lang].nav.skip}
			</a>
			<Nav />
			<main id="main" tabIndex={-1}>
				<Hero />
				<Projects />
				<Experience />
				<Skills />
				<Contact />
			</main>
		</>
	)
}

export default function App() {
	return (
		<LanguageProvider>
			<Portfolio />
		</LanguageProvider>
	)
}
