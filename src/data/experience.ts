export interface ExperienceItem {
	period: string
	role: string
	role_es: string
	company: string
	description: string
	description_es: string
	tech: string[]
	type: 'work' | 'education' | 'project'
}

export const experience: ExperienceItem[] = [
	{
		period: '2024 – present',
		role: 'Information Systems Engineering',
		role_es: 'Ingeniería en Sistemas de Información',
		company: 'UTN FRBA',
		description:
			'Studying Information Systems Engineering. Core subjects: algorithms, data structures, distributed systems, software architecture, and databases.',
		description_es:
			'Cursando la carrera de Ingeniería en Sistemas de Información. Materias clave: algoritmos, estructuras de datos, sistemas distribuidos, arquitectura de software y bases de datos.',
		tech: ['Algoritmos', 'Estructuras de Datos', 'Sistemas Distribuidos', 'Bases de Datos'],
		type: 'education',
	},
	{
		period: '2024 – present',
		role: 'Personal Project',
		role_es: 'Proyecto Personal',
		company: 'mini-blockchain',
		description:
			'Built from scratch in Rust: a fully functional P2P blockchain node. Peer discovery via mDNS on local networks, automatic chain sync, gossip block/transaction propagation, PoW mining, Merkle trees, and AES-GCM encrypted wallet management — server never handles private keys.',
		description_es:
			'Implementación desde cero de un nodo blockchain funcional en Rust. Descubrimiento de peers via mDNS en redes locales, sincronización automática de cadenas, propagación de bloques y transacciones, minería PoW, Merkle trees y gestión de wallets cifradas — el servidor nunca maneja las claves privadas.',
		tech: ['Rust', 'libp2p', 'axum', 'tokio', 'ed25519', 'SHA-256', 'AES-GCM'],
		type: 'project',
	},
	{
		period: '2024',
		role: 'Personal Project',
		role_es: 'Proyecto Personal',
		company: 'notes-app',
		description:
			'Full-stack note-taking app with a NestJS REST API and a React frontend. Uses PostgreSQL via Prisma ORM — no authentication required, users can create and manage notes straight away. Frontend and backend deployed independently on Vercel.',
		description_es:
			'App de notas full-stack con una API REST en NestJS y frontend en React. Usa PostgreSQL vía Prisma ORM — sin autenticación, los usuarios pueden crear y gestionar notas de inmediato. Frontend y backend desplegados de forma independiente en Vercel.',
		tech: ['TypeScript', 'React', 'NestJS', 'PostgreSQL', 'Prisma', 'Vercel'],
		type: 'project',
	},
]
