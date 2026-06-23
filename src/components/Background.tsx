import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const DESKTOP = { nodes: 90, particles: 1600, maxDist: 22, maxConn: 7 }
const MOBILE  = { nodes: 35, particles: 500,  maxDist: 18, maxConn: 4 }

export function Background() {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const isMobile = window.innerWidth < 768
		const cfg = isMobile ? MOBILE : DESKTOP

		// — Scene setup —
		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(
			70,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		)
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile })
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		renderer.setClearColor(0x000000, 0)
		container.appendChild(renderer.domElement)

		camera.position.set(0, 2, 38)

		// — Mouse tracking —
		let mouseX = 0
		let mouseY = 0
		const onMouse = (e: MouseEvent) => {
			mouseX = (e.clientX / window.innerWidth)  * 2 - 1
			mouseY = -(e.clientY / window.innerHeight) * 2 + 1
		}
		if (!isMobile) window.addEventListener('mousemove', onMouse)

		// — Network nodes (Fibonacci sphere) —
		const networkGroup = new THREE.Group()
		const nodes: { mesh: THREE.Mesh; pos: THREE.Vector3 }[] = []

		const nodeMat = new THREE.MeshPhongMaterial({
			color:             0x00ff41,
			emissive:          0x00ff41,
			emissiveIntensity: 0.75,
			transparent:       true,
			opacity:           0.6,
		})

		for (let i = 0; i < cfg.nodes; i++) {
			const phi   = Math.acos(-1 + (2 * i) / cfg.nodes)
			const theta = Math.sqrt(cfg.nodes * Math.PI) * phi
			const r = 12 + Math.random() * 20
			const x = r * Math.cos(theta) * Math.sin(phi)
			const y = r * Math.sin(theta) * Math.sin(phi)
			const z = r * Math.cos(phi)

			const size = 0.07 + Math.random() * 0.1
			const node = new THREE.Mesh(new THREE.OctahedronGeometry(size, 0), nodeMat.clone())
			node.position.set(x, y, z)
			networkGroup.add(node)
			nodes.push({ mesh: node, pos: new THREE.Vector3(x, y, z) })
		}

		// — Connections —
		for (let i = 0; i < nodes.length; i++) {
			const nearby: { j: number; d: number }[] = []
			for (let j = 0; j < nodes.length; j++) {
				if (i === j) continue
				const d = nodes[i].pos.distanceTo(nodes[j].pos)
				if (d < cfg.maxDist) nearby.push({ j, d })
			}
			nearby
				.sort((a, b) => a.d - b.d)
				.slice(0, cfg.maxConn)
				.forEach(({ j, d }) => {
					const opacity = (1 - d / cfg.maxDist) * 0.09
					const line = new THREE.Line(
						new THREE.BufferGeometry().setFromPoints([nodes[i].pos, nodes[j].pos]),
						new THREE.LineBasicMaterial({ color: 0x00ff41, transparent: true, opacity }),
					)
					networkGroup.add(line)
				})
		}

		scene.add(networkGroup)

		// — Lights —
		scene.add(new THREE.AmbientLight(0xffffff, 0.35))
		const pl = new THREE.PointLight(0x00ff41, 1.4, 130)
		pl.position.set(10, 10, 10)
		scene.add(pl)
		const pl2 = new THREE.PointLight(0x00ff41, 0.8, 130)
		pl2.position.set(-10, -10, 10)
		scene.add(pl2)

		// — Particle field —
		const posArr = new Float32Array(cfg.particles * 3)
		for (let i = 0; i < cfg.particles * 3; i++) posArr[i] = (Math.random() - 0.5) * 360
		const particlesGeo = new THREE.BufferGeometry()
		particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
		const particlesMesh = new THREE.Points(
			particlesGeo,
			new THREE.PointsMaterial({
				size:        0.07,
				color:       0x00ff41,
				transparent: true,
				opacity:     0.22,
				blending:    THREE.AdditiveBlending,
			}),
		)
		scene.add(particlesMesh)

		// — Animation loop —
		let animId: number
		const animate = () => {
			animId = requestAnimationFrame(animate)

			const t = Date.now()
			networkGroup.rotation.y += 0.0012
			networkGroup.rotation.x  = Math.sin(t * 0.00012) * 0.1

			nodes.forEach((node, i) => {
				const pulse = Math.sin(t * 0.0012 + i * 0.55) * 0.22 + 1
				node.mesh.scale.setScalar(pulse)
				node.mesh.rotation.x += 0.006
				node.mesh.rotation.y += 0.006
			})

			particlesMesh.rotation.y += 0.00018

			if (!isMobile) {
				camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.035
				camera.position.y += (mouseY * 2.5 - camera.position.y) * 0.035
			}
			camera.lookAt(scene.position)
			renderer.render(scene, camera)
		}
		animate()

		// — Resize —
		const onResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
		}
		window.addEventListener('resize', onResize)

		return () => {
			cancelAnimationFrame(animId)
			window.removeEventListener('mousemove', onMouse)
			window.removeEventListener('resize', onResize)
			scene.traverse((obj) => {
				const mesh = obj as THREE.Mesh
				if (mesh.geometry) mesh.geometry.dispose()
				if (mesh.material) {
					if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose())
					else mesh.material.dispose()
				}
			})
			renderer.dispose()
			if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
		}
	}, [])

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 pointer-events-none"
			style={{ zIndex: 0 }}
		/>
	)
}
