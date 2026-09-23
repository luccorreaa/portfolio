import { useEffect, useRef } from 'react'
import { ArrowUpRight, Code2, ShieldCheck } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { useMotion } from '../context/MotionContext'

export function EngineeringVisual() {
	const { lang } = useLang()
	const { enabled } = useMotion()
	const scene = useRef<HTMLDivElement>(null)
	const plane = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const element = scene.current
		const surface = plane.current
		if (!element || !surface) return
		const observer = new IntersectionObserver(([entry]) => {
			element.dataset.visible = String(entry.isIntersecting)
		}, { threshold: 0.1 })
		observer.observe(element)
		if (!enabled) { surface.style.transform = ''; return () => observer.disconnect() }
		const fine = matchMedia('(hover: hover) and (pointer: fine)')
		let frame = 0
		let previous = 0
		let x = 0, y = 0, vx = 0, vy = 0, targetX = 0, targetY = 0
		const tick = (time: number) => {
			const dt = Math.min((time - (previous || time - 16)) / 1000, 0.032)
			previous = time
			// Critically damped springs retain velocity when the pointer changes direction.
			vx += ((targetX - x) * 170 - vx * 26) * dt
			vy += ((targetY - y) * 170 - vy * 26) * dt
			x += vx * dt
			y += vy * dt
			surface.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`
			if (Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(vx) + Math.abs(vy) > 0.015) {
				frame = requestAnimationFrame(tick)
			} else { frame = 0; previous = 0 }
		}
		const start = () => { if (!frame) frame = requestAnimationFrame(tick) }
		const move = (event: PointerEvent) => {
			if (!fine.matches || event.pointerType === 'touch') return
			const rect = element.getBoundingClientRect()
			targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 10
			targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 10
			start()
		}
		const reset = () => { targetX = 0; targetY = 0; start() }
		const suspend = () => {
			if (!document.hidden) return
			cancelAnimationFrame(frame)
			frame = 0; previous = 0; x = 0; y = 0; vx = 0; vy = 0; targetX = 0; targetY = 0
			surface.style.transform = ''
		}
		element.addEventListener('pointermove', move)
		element.addEventListener('pointerleave', reset)
		document.addEventListener('visibilitychange', suspend)
		return () => {
			observer.disconnect()
			cancelAnimationFrame(frame)
			element.removeEventListener('pointermove', move)
			element.removeEventListener('pointerleave', reset)
			document.removeEventListener('visibilitychange', suspend)
			surface.style.transform = ''
		}
	}, [enabled])

	return (
		<div className="engineering-scene hero-enter" ref={scene} aria-hidden="true">
			<div className="scene-topline"><span><i /> ENGINEERING MINDSET</span><span>FIG. 01</span></div>
			<div className="scene-plane" ref={plane}>
				<svg className="engineering-art" viewBox="0 0 520 440" fill="none">
					<defs>
						<radialGradient id="orbital-glow"><stop stopColor="#b4e99c" stopOpacity=".13" /><stop offset="1" stopColor="#b4e99c" stopOpacity="0" /></radialGradient>
						<linearGradient id="chip-surface" x1="200" y1="140" x2="330" y2="300" gradientUnits="userSpaceOnUse"><stop stopColor="#3b4a37" /><stop offset="1" stopColor="#161e16" /></linearGradient>
						<linearGradient id="chip-edge"><stop stopColor="#c2eca7" /><stop offset="1" stopColor="#42553b" /></linearGradient>
					</defs>
					<circle cx="260" cy="215" r="210" fill="url(#orbital-glow)" />
					<g stroke="#b4d5a2" strokeOpacity=".1"><path d="M30 215h460M260 12v406" strokeDasharray="2 7" /><circle cx="260" cy="215" r="187" /><circle cx="260" cy="215" r="148" strokeDasharray="2 8" /></g>
					<g className="orbital-track"><ellipse cx="260" cy="215" rx="215" ry="83" transform="rotate(-34 260 215)" stroke="#9bbd88" strokeOpacity=".3" /><ellipse cx="260" cy="215" rx="215" ry="83" transform="rotate(34 260 215)" stroke="#9bbd88" strokeOpacity=".3" /><ellipse cx="260" cy="215" rx="83" ry="187" stroke="#9bbd88" strokeOpacity=".18" /></g>
					<g className="orbit-spin"><circle cx="260" cy="28" r="4" fill="#c4efa9" /><circle cx="260" cy="28" r="9" stroke="#b5e79c" strokeOpacity=".25" /><circle cx="260" cy="402" r="2" fill="#96b888" /></g>
					<g className="orbit-spin orbit-reverse"><circle cx="408" cy="215" r="3" fill="#c4efa9" /><circle cx="112" cy="215" r="2" fill="#7e9b71" /></g>
					<path d="m194 199 66-39 66 39v48l-66 39-66-39z" fill="#10170f" stroke="#46593d" />
					<path d="m194 218 66 39 66-39m-66 39v29" stroke="#688458" />
					<path d="m191 190 69-40 69 40v33l-69 40-69-40z" fill="#1c2819" stroke="#6a865a" />
					<path d="m191 190 69 41 69-41m-69 41v32" stroke="#8cad73" />
					<path d="m191 190 69-40 69 40-69 41z" fill="url(#chip-surface)" stroke="url(#chip-edge)" />
					<path d="m212 190 48-28 48 28-48 28z" stroke="#b7e898" strokeOpacity=".23" />
					<text x="259" y="198" textAnchor="middle" fill="#c2efa4" fontFamily="monospace" fontSize="27" letterSpacing="-2">lc_</text>
					<g fill="#111810" stroke="#526748"><circle cx="92" cy="129" r="7" /><circle cx="428" cy="129" r="7" /><circle cx="260" cy="365" r="7" /></g>
					<g fill="#c2efa4"><circle cx="92" cy="129" r="2" /><circle cx="428" cy="129" r="2" /><circle cx="260" cy="365" r="2" /></g>
					<g fill="#adc0a4" fontFamily="monospace" fontSize="10" letterSpacing="2"><text x="67" y="106">TEST</text><text x="406" y="106">BUILD</text><text x="240" y="394">LEARN</text></g>
					<g stroke="#687d5d" strokeOpacity=".6"><path d="M28 28h14m-7-7v14M478 394h14m-7-7v14" /></g>
				</svg>
				<div className="scene-tag tag-quality"><ShieldCheck size={16} /><span>Quality first</span><span className="tag-dot" /></div>
				<div className="scene-tag tag-code"><Code2 size={16} /><span>Built with purpose</span></div>
			</div>
			<div className="scene-bottomline"><span>{lang === 'es' ? 'Probar. Construir. Evolucionar.' : 'Test. Build. Evolve.'}</span><ArrowUpRight size={15} /></div>
		</div>
	)
}
