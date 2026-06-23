import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Cursor() {
	const isMouse = window.matchMedia('(pointer: fine)').matches
	const [pos, setPos] = useState({ x: -100, y: -100 })
	const [hovering, setHovering] = useState(false)
	const [clicking, setClicking] = useState(false)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const onMove = (e: MouseEvent) => {
			setPos({ x: e.clientX, y: e.clientY })
			if (!visible) setVisible(true)

			const target = e.target as HTMLElement
			setHovering(
				target.tagName === 'A' ||
					target.tagName === 'BUTTON' ||
					!!target.closest('a') ||
					!!target.closest('button')
			)
		}

		const onDown = () => setClicking(true)
		const onUp = () => setClicking(false)
		const onLeave = () => setVisible(false)
		const onEnter = () => setVisible(true)

		window.addEventListener('mousemove', onMove)
		window.addEventListener('mousedown', onDown)
		window.addEventListener('mouseup', onUp)
		document.documentElement.addEventListener('mouseleave', onLeave)
		document.documentElement.addEventListener('mouseenter', onEnter)

		return () => {
			window.removeEventListener('mousemove', onMove)
			window.removeEventListener('mousedown', onDown)
			window.removeEventListener('mouseup', onUp)
			document.documentElement.removeEventListener('mouseleave', onLeave)
			document.documentElement.removeEventListener('mouseenter', onEnter)
		}
	}, [visible])

	const size = hovering ? 38 : 14

	if (!isMouse) return null

	return (
		<motion.div
			className="fixed top-0 left-0 pointer-events-none z-[9999]"
			animate={{
				x: pos.x - size / 2,
				y: pos.y - size / 2,
				width: size,
				height: size,
				opacity: visible ? 1 : 0,
				scale: clicking ? 0.75 : 1
			}}
			transition={{
				x: { type: 'spring', stiffness: 900, damping: 40, mass: 0.05 },
				y: { type: 'spring', stiffness: 900, damping: 40, mass: 0.05 },
				width: { duration: 0.15 },
				height: { duration: 0.15 },
				opacity: { duration: 0.15 },
				scale: { duration: 0.08 }
			}}
		>
			<div
				className="w-full h-full border border-[#00FF41] transition-colors duration-150"
				style={{ background: hovering ? 'rgba(0,255,65,0.06)' : 'transparent' }}
			/>
		</motion.div>
	)
}
