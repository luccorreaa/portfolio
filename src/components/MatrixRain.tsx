import { useEffect, useRef } from 'react'

const CHARS =
	'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEF<>/\\|{}[]'

export function MatrixRain() {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const FONT_SIZE = 13
		let drops: number[] = []
		let animId: number

		const resize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
			const cols = Math.floor(canvas.width / FONT_SIZE)
			drops = Array.from({ length: cols }, () => Math.random() * -80)
		}

		resize()
		window.addEventListener('resize', resize)

		let lastFrame = 0
		const TARGET_FPS = 18

		const draw = (timestamp: number) => {
			animId = requestAnimationFrame(draw)
			if (timestamp - lastFrame < 1000 / TARGET_FPS) return
			lastFrame = timestamp

			ctx.fillStyle = 'rgba(8, 8, 8, 0.06)'
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`

			for (let i = 0; i < drops.length; i++) {
				const y = drops[i] * FONT_SIZE
				if (y < 0) {
					drops[i]++
					continue
				}

				// Bright head character
				const isHead = drops[i] === Math.floor(drops[i])
				ctx.fillStyle = isHead ? '#ccffdd' : '#00FF41'
				ctx.globalAlpha = isHead ? 0.9 : 0.25

				const char = CHARS[Math.floor(Math.random() * CHARS.length)]
				ctx.fillText(char, i * FONT_SIZE, y)

				if (y > canvas.height && Math.random() > 0.978) {
					drops[i] = 0
				}
				drops[i] += 0.5
			}

			ctx.globalAlpha = 1
		}

		animId = requestAnimationFrame(draw)

		return () => {
			cancelAnimationFrame(animId)
			window.removeEventListener('resize', resize)
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 pointer-events-none"
			style={{ opacity: 0.18 }}
		/>
	)
}
