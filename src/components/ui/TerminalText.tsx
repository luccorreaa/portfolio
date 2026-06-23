import { useState, useEffect } from 'react'

interface TerminalTextProps {
	text: string
	/** ms before typing starts */
	delay?: number
	/** ms per character */
	speed?: number
	showCursorWhenDone?: boolean
}

export function TerminalText({
	text,
	delay = 0,
	speed = 45,
	showCursorWhenDone = true
}: TerminalTextProps) {
	const [displayed, setDisplayed] = useState('')
	const [cursorVisible, setCursorVisible] = useState(true)
	const [done, setDone] = useState(false)

	useEffect(() => {
		const startTimer = setTimeout(() => {
			let i = 0
			const interval = setInterval(() => {
				if (i < text.length) {
					setDisplayed(text.slice(0, i + 1))
					i++
				} else {
					clearInterval(interval)
					setDone(true)
				}
			}, speed)
			return () => clearInterval(interval)
		}, delay)

		return () => clearTimeout(startTimer)
	}, [text, delay, speed])

	useEffect(() => {
		if (!done || !showCursorWhenDone) return
		const interval = setInterval(() => setCursorVisible((v) => !v), 530)
		return () => clearInterval(interval)
	}, [done, showCursorWhenDone])

	return (
		<span>
			{displayed}
			<span
				className="inline-block w-[2px] bg-[#00FF41] ml-0.5 align-middle"
				style={{
					height: '0.85em',
					opacity: done ? (cursorVisible ? 1 : 0) : 1,
					transition: done ? 'none' : undefined
				}}
			/>
		</span>
	)
}
