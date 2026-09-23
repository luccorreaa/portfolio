import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const MotionContext = createContext({ enabled: false, systemReduced: false, toggle: () => {} })

export function MotionProvider({ children }: { children: ReactNode }) {
	const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
	const [paused, setPaused] = useState(false)
	const enabled = !reduced && !paused

	useEffect(() => {
		const media = matchMedia('(prefers-reduced-motion: reduce)')
		const update = () => setReduced(media.matches)
		media.addEventListener('change', update)
		return () => media.removeEventListener('change', update)
	}, [])

	useEffect(() => {
		document.documentElement.dataset.motion = enabled ? 'on' : 'off'
		return () => { delete document.documentElement.dataset.motion }
	}, [enabled])

	return (
		<MotionContext.Provider value={{ enabled, systemReduced: reduced, toggle: () => setPaused((value) => !value) }}>
			{children}
		</MotionContext.Provider>
	)
}

export const useMotion = () => useContext(MotionContext)
