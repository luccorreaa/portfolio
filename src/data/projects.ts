export interface Project {
	id: 'anvil' | 'blockchain' | 'interview' | 'notes'
	title: string
	year: string
	category: { en: string; es: string }
	description: { en: string; es: string }
	tech: string[]
	authorship: 'coauthor' | 'soleAuthor' | 'personal'
	github: string | null
	demo: string | null
}

export const projects: Project[] = [
	{
		id: 'anvil',
		title: 'anvil-zk',
		year: '2026',
		category: { es: 'Sistemas distribuidos', en: 'Distributed systems' },
		description: {
			es: 'Coordinador distribuido de pruebas de conocimiento cero. Arquitectura hexagonal y una máquina de estados tipada para organizar el ciclo de vida de los trabajos.',
			en: 'A distributed zero-knowledge proof coordinator. Hexagonal architecture and a typed state machine to organize the job lifecycle.'
		},
		tech: ['Rust', 'gRPC', 'Docker'],
		authorship: 'coauthor',
		github: null,
		demo: null
	},
	{
		id: 'blockchain',
		title: 'mini-blockchain',
		year: '2026',
		category: { es: 'Blockchain & redes P2P', en: 'Blockchain & P2P networking' },
		description: {
			es: 'Un nodo blockchain construido desde cero en Rust. Núcleo criptográfico, API REST y red peer-to-peer en un mismo sistema.',
			en: 'A blockchain node built from scratch in Rust. Cryptographic core, REST API and peer-to-peer networking in one system.'
		},
		tech: ['Rust', 'Tokio', 'Axum', 'libp2p'],
		authorship: 'soleAuthor',
		github: 'https://github.com/luccorreaa/mini-blockchain',
		demo: null
	},
	{
		id: 'interview',
		title: 'AI Interview Assistant',
		year: '2026',
		category: { es: 'Desktop & inteligencia artificial', en: 'Desktop & artificial intelligence' },
		description: {
			es: 'App de escritorio con captura de audio en tiempo real, transcripción y sugerencias asistidas por IA. Una interfaz en React dentro de una aplicación Tauri.',
			en: 'A desktop app with real-time audio capture, transcription and AI-assisted suggestions. A React interface inside a Tauri application.'
		},
		tech: ['Tauri', 'React', 'Claude API', 'Whisper'],
		authorship: 'personal',
		github: null,
		demo: null
	},
	{
		id: 'notes',
		title: 'notes-app',
		year: '2026',
		category: { es: 'Desarrollo full stack', en: 'Full stack development' },
		description: {
			es: 'Monorepo full stack en TypeScript para gestionar notas. Frontend en React, API en NestJS y PostgreSQL con consultas tipadas y migraciones automatizadas con Prisma.',
			en: 'A full stack TypeScript monorepo for managing notes. React frontend, NestJS API and PostgreSQL with type-safe queries and automated Prisma migrations.'
		},
		tech: ['NestJS', 'React', 'TypeScript', 'PostgreSQL', 'Prisma'],
		authorship: 'personal',
		github: 'https://github.com/luccorreaa/notes-app',
		demo: 'https://frontend-zeta-nine-63.vercel.app'
	}
]
