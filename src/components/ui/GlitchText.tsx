import { useState, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

interface GlitchTextProps {
	text: string
	className?: string
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
	const [displayed, setDisplayed] = useState(text)

	const glitch = useCallback(() => {
		let iterations = 0
		const total = text.length

		const interval = setInterval(() => {
			setDisplayed(
				text
					.split('')
					.map((char, i) => {
						if (char === ' ') return ' '
						if (i < iterations) return text[i]
						return CHARS[Math.floor(Math.random() * CHARS.length)]
					})
					.join('')
			)
			iterations += 0.4
			if (iterations >= total) {
				clearInterval(interval)
				setDisplayed(text)
			}
		}, 28)
	}, [text])

	return (
		<span className={`font-mono ${className}`} onMouseEnter={glitch}>
			{displayed}
		</span>
	)
}
