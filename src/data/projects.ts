export interface Project {
	id: number
	title: string
	description: string
	description_es: string
	tech: string[]
	github: string | null
	demo: string | null
	image: string | null
}

export const projects: Project[] = [
	{
		id: 1,
		title: 'mini-blockchain',
		description:
			'Fully functional blockchain node implemented in Rust from scratch. Nodes discover each other on local networks via mDNS, synchronize chains automatically, and propagate blocks and transactions through a P2P mesh. Includes PoW mining, Merkle trees, and encrypted wallet management — server never touches private keys.',
		description_es:
			'Nodo blockchain completamente funcional implementado desde cero en Rust. Los nodos se descubren en redes locales vía mDNS, sincronizan cadenas automáticamente y propagan bloques y transacciones mediante una red P2P. Incluye minería PoW, árboles de Merkle y gestión de wallets cifradas — el servidor nunca toca las claves privadas.',
		tech: ['Rust', 'libp2p', 'axum', 'tokio', 'ed25519', 'SHA-256', 'AES-GCM'],
		github: 'https://github.com/luccorreaa/mini-blockchain',
		demo: null,
		image: null,
	},
	{
		id: 2,
		title: 'notes-app',
		description:
			'Full-stack note-taking app with a NestJS REST API and a React frontend. Uses PostgreSQL via Prisma ORM and requires no authentication — users can create and manage notes straight away. Both frontend and backend are independently deployed on Vercel.',
		description_es:
			'App de notas full-stack con una API REST en NestJS y frontend en React. Usa PostgreSQL vía Prisma ORM y no requiere autenticación — los usuarios pueden crear y gestionar notas de inmediato. El frontend y el backend están desplegados de forma independiente en Vercel.',
		tech: ['TypeScript', 'React', 'NestJS', 'PostgreSQL', 'Prisma', 'Vercel'],
		github: 'https://github.com/luccorreaa/notes-app',
		demo: 'https://frontend-zeta-nine-63.vercel.app',
		image: null,
	},
]
