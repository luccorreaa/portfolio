export interface ExperienceItem {
	period: string
	role: string
	company: string
	description: string
	description_es: string
	tech: string[]
	type: 'work' | 'education' | 'project'
}

export const experience: ExperienceItem[] = [
	{
		period: '2023 – present',
		role: 'Ingeniería en Sistemas de Información',
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
		company: 'mini-blockchain',
		description:
			'Built from scratch in Rust: a fully functional P2P blockchain node. Peer discovery via mDNS on local networks, automatic chain sync, gossip block/transaction propagation, PoW mining, Merkle trees, and AES-GCM encrypted wallet management — server never handles private keys.',
		description_es:
			'Implementación desde cero de un nodo blockchain funcional en Rust. Descubrimiento de peers via mDNS en redes locales, sincronización automática de cadenas, propagación de bloques y transacciones, minería PoW, Merkle trees y gestión de wallets cifradas — el servidor nunca maneja las claves privadas.',
		tech: ['Rust', 'libp2p', 'axum', 'tokio', 'ed25519', 'SHA-256', 'AES-GCM'],
		type: 'project',
	},
]
