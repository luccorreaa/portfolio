import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations } from '../data/translations'

export type Lang = 'en' | 'es'
const LanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
	lang: 'es',
	setLang: () => {}
})

function initialLanguage(): Lang {
	try {
		const saved = localStorage.getItem('portfolio-language')
		if (saved === 'en' || saved === 'es') return saved
	} catch {
		/* Language selection remains usable when storage is disabled. */
	}
	return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [lang, setLang] = useState<Lang>(initialLanguage)
	useEffect(() => {
		document.documentElement.lang = lang
		document
			.querySelector('meta[name="description"]')
			?.setAttribute('content', translations[lang].meta)
		try {
			localStorage.setItem('portfolio-language', lang)
		} catch {
			/* Storage is optional. */
		}
	}, [lang])
	return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}

export function useLang() {
	return useContext(LanguageContext)
}
