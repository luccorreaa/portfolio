import { LanguageProvider } from './context/LanguageContext'
import { Cursor } from './components/Cursor'
import { Background } from './components/Background'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'

export default function App() {
	return (
		<LanguageProvider>
			<div className="min-h-screen">
				<Cursor />
				<Background />
				<Nav />
				<main>
					<Hero />
					<Skills />
					<Projects />
					<Experience />
					<Contact />
				</main>
			</div>
		</LanguageProvider>
	)
}
