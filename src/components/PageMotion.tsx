import { useEffect, useRef } from 'react'
import { useMotion } from '../context/MotionContext'

/** Progressive enhancement: content is visible even if observers or animation fail. */
export function PageMotion() {
	const { enabled } = useMotion()
	const seen = useRef(new WeakSet<Element>())
	const progress = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let frame = 0
		const update = () => {
			frame = 0
			const distance = document.documentElement.scrollHeight - innerHeight
			const fraction = distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0
			if (progress.current) progress.current.style.transform = `scaleX(${fraction})`
		}
		const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
		const onKeyboard = () => { document.documentElement.dataset.input = 'keyboard' }
		const onPointer = () => { document.documentElement.dataset.input = 'pointer' }
		update()
		addEventListener('scroll', schedule, { passive: true })
		addEventListener('resize', schedule)
		addEventListener('keydown', onKeyboard)
		addEventListener('pointerdown', onPointer, { passive: true })
		const resize = new ResizeObserver(schedule)
		resize.observe(document.body)
		return () => {
			cancelAnimationFrame(frame)
			removeEventListener('scroll', schedule)
			removeEventListener('resize', schedule)
			removeEventListener('keydown', onKeyboard)
			removeEventListener('pointerdown', onPointer)
			delete document.documentElement.dataset.input
			resize.disconnect()
		}
	}, [])

	useEffect(() => {
		if (!enabled) return
		const animations = new Map<Element, Animation>()
		const finish = (target: Element) => {
			animations.get(target)?.finish()
			animations.delete(target)
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting || seen.current.has(entry.target)) return
				seen.current.add(entry.target)
				observer.unobserve(entry.target)
				// Keyboard navigation never waits for a reveal.
				if (document.documentElement.dataset.input === 'keyboard' || entry.target.contains(document.activeElement)) return
				const animation = entry.target.animate(
					[{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'translateY(0)' }],
					{
						duration: 650,
						delay: Number(entry.target.getAttribute('data-reveal-delay') || 0),
						fill: 'backwards',
						easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
					}
				)
				animations.set(entry.target, animation)
				animation.onfinish = () => animations.delete(entry.target)
			})
		}, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })
		document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
		const onFocus = (event: FocusEvent) => {
			if (!(event.target instanceof Element)) return
			const element = event.target.closest('[data-reveal]')
			if (element) { seen.current.add(element); finish(element) }
		}
		const onKey = () => animations.forEach((_, element) => finish(element))
		document.addEventListener('focusin', onFocus)
		document.addEventListener('keydown', onKey)
		addEventListener('beforeprint', onKey)
		return () => {
			observer.disconnect()
			animations.forEach((animation) => animation.cancel())
			document.removeEventListener('focusin', onFocus)
			document.removeEventListener('keydown', onKey)
			removeEventListener('beforeprint', onKey)
		}
	}, [enabled])

	return <div ref={progress} className="reading-progress" aria-hidden="true" />
}
