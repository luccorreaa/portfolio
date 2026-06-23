import type { Config } from 'tailwindcss'

export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['JetBrains Mono', 'monospace'],
				sans: ['Inter', 'sans-serif']
			},
			colors: {
				matrix: {
					green: '#00FF41',
					dim: '#00cc33',
					bg: '#080808',
					surface: '#0a0a0a',
					elevated: '#0e0e0e'
				}
			},
			animation: {
				blink: 'blink 1s step-end infinite',
				'scan-line': 'scanLine 8s linear infinite'
			},
			keyframes: {
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				scanLine: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100vh)' }
				}
			}
		}
	},
	plugins: []
} satisfies Config
