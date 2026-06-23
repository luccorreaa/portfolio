import { motion } from 'framer-motion'

const SHAPES = [
	{ size: 8,  x: '7%',  y: '12%', opacity: 0.14, duration: 7,   delay: 0    },
	{ size: 5,  x: '86%', y: '7%',  opacity: 0.09, duration: 9,   delay: 1.5  },
	{ size: 13, x: '93%', y: '22%', opacity: 0.11, duration: 8,   delay: 0.5  },
	{ size: 6,  x: '2%',  y: '48%', opacity: 0.09, duration: 11,  delay: 2    },
	{ size: 10, x: '95%', y: '57%', opacity: 0.1,  duration: 8.5, delay: 1    },
	{ size: 4,  x: '5%',  y: '71%', opacity: 0.08, duration: 10,  delay: 3    },
	{ size: 11, x: '90%', y: '80%', opacity: 0.1,  duration: 9.5, delay: 0.8  },
	{ size: 5,  x: '11%', y: '89%', opacity: 0.07, duration: 7.5, delay: 2.5  },
	{ size: 3,  x: '49%', y: '4%',  opacity: 0.06, duration: 12,  delay: 4    },
	{ size: 4,  x: '76%', y: '93%', opacity: 0.07, duration: 9,   delay: 1.8  },
	{ size: 7,  x: '18%', y: '5%',  opacity: 0.08, duration: 10,  delay: 0.3  },
	{ size: 3,  x: '62%', y: '96%', opacity: 0.05, duration: 13,  delay: 5    },
]

export function FloatingShapes() {
	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
			{SHAPES.map((s, i) => (
				<motion.div
					key={i}
					className="absolute"
					style={{
						left: s.x,
						top: s.y,
						width: s.size,
						height: s.size,
						rotate: 45,
						border: `1px solid rgba(0,255,65,${s.opacity * 1.8})`,
						background: `rgba(0,255,65,${s.opacity * 0.25})`,
						boxShadow: `0 0 ${s.size * 1.5}px rgba(0,255,65,${s.opacity * 0.6})`,
					}}
					initial={{ opacity: 0 }}
					animate={{
						opacity: [0, s.opacity, s.opacity * 1.6, s.opacity, s.opacity * 0.8, s.opacity],
						y: [0, -(s.size * 1.8), 0, s.size * 1.2, 0],
					}}
					transition={{
						opacity: { duration: 2, delay: s.delay },
						y: {
							duration: s.duration,
							delay: s.delay,
							repeat: Infinity,
							ease: 'easeInOut',
						},
					}}
				/>
			))}
		</div>
	)
}
