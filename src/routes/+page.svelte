<script>
  import { onMount, onDestroy } from 'svelte'
  import { browser } from '$app/environment'

  /* ── ESTADO REACTIVO (Svelte 5) ── */
  let x = $state(0)
  let y = $state(0)
  let typedText = $state('')
  let activeSection = $state('hero')
  let isPointer = $state(false)
  let lang = $state('es')

  /* ── TRADUCCIONES ── */
  const t = {
    es: {
      available:    '// disponible para trabajar',
      heroDesc:     'Construyendo experiencias web modernas y aplicaciones interactivas — del concepto a producción.',
      viewProjects: 'Ver Proyectos',
      contact:      'Contacto',
      aboutLabel:   '// 01 — sobre mí',
      aboutTitle:   'Sobre mí',
      aboutText:    'Soy un desarrollador enfocado en Data Science e ingeniería de datos, con experiencia en análisis exploratorio, modelado predictivo y visualización de información usando Python y su ecosistema científico. Trabajo con herramientas como Pandas, NumPy, Scikit-learn y TensorFlow para transformar datos en decisiones concretas. Complemento mis proyectos con SQL para gestión de bases de datos y Power BI para reporting ejecutivo. Actualmente estoy iniciando mi camino en Rust, atraído por su enfoque en rendimiento y seguridad de memoria — cualidades clave en pipelines de datos de alta escala.',
      projectsLabel:'// 02 — proyectos',
      projectsTitle:'Trabajos recientes',
      viewProject:  'Ver proyecto →',
      contactLabel: '// 03 — contacto',
      contactTitle: 'Trabajemos juntos',
      downloadCV:   'Descargar CV',
      nav:          { hero: 'inicio', about: 'sobre mí', projects: 'proyectos', contact: 'contacto' },
      roles:        ['Desarrollador Frontend', 'Diseñador UI', 'Desarrollador Web'],
      projects: [
        { name: 'Portfolio',  tech: 'SvelteKit / Tailwind' },
        { name: 'Web App',    tech: 'Node.js / JavaScript'  },
        { name: 'Dashboard',  tech: 'React / API'           },
      ],
    },
    en: {
      available:    '// available for work',
      heroDesc:     'Building modern web experiences and interactive applications — from concept to production.',
      viewProjects: 'View Projects',
      contact:      'Contact',
      aboutLabel:   '// 01 — about',
      aboutTitle:   'About me',
      aboutText:    'I\'m a developer focused on Data Science and data engineering, with experience in exploratory analysis, predictive modeling, and data visualization using Python and its scientific ecosystem. I work with tools like Pandas, NumPy, Scikit-learn, and TensorFlow to turn data into concrete decisions. I complement my projects with SQL for database management and Power BI for executive reporting. I\'m currently starting my journey with Rust, drawn to its focus on performance and memory safety — key qualities in large-scale data pipelines.',
      projectsLabel:'// 02 — projects',
      projectsTitle:'Recent work',
      viewProject:  'View project →',
      contactLabel: '// 03 — contact',
      contactTitle: 'Let\'s work together',
      downloadCV:   'Download CV',
      nav:          { hero: 'home', about: 'about', projects: 'projects', contact: 'contact' },
      roles:        ['Frontend Developer', 'UI Designer', 'Web Developer'],
      projects: [
        { name: 'Portfolio',  tech: 'SvelteKit / Tailwind' },
        { name: 'Web App',    tech: 'Node.js / JavaScript'  },
        { name: 'Dashboard',  tech: 'React / API'           },
      ],
    }
  }

  let tr = $derived(t[lang])

  let cursorVisible = $state(false)
  let menuOpen = $state(false)

  function closeMenu() { menuOpen = false }

  /* ── CURSOR ── */
  function onMouseMove(e) {
    x = e.clientX
    y = e.clientY
    cursorVisible = true
    const el = document.elementFromPoint(e.clientX, e.clientY)
    isPointer = !!el?.closest('button, a, [role="button"], [role="presentation"], .tech-tag, .nav-item')
  }

  /* ── MATRIX ── */
  let canvas = $state(null)
  let matrixInterval
  const chars = '01アイウエオカキクケコサシスセソ'
  const fs = 14

  function initMatrix() {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let drops = Array.from(
      { length: Math.floor(canvas.width / fs) },
      () => Math.floor(Math.random() * canvas.height / fs)
    )

    function draw() {
      ctx.fillStyle = 'rgba(5,5,5,0.065)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = fs + 'px monospace'
      drops.forEach((yy, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = `rgba(0,255,156,${0.10 + Math.random() * 0.08})`
        ctx.fillText(ch, i * fs, yy * fs)
        if (yy * fs > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }

    if (matrixInterval) clearInterval(matrixInterval)
    matrixInterval = setInterval(draw, 35)

    function onResize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      drops = Array.from({ length: Math.floor(canvas.width / fs) }, () => 1)
    }
    window.addEventListener('resize', onResize)
  }

  /* ── TYPING ── */
  let typingActive = true

  async function typeLoop() {
    const sleep = ms => new Promise(r => setTimeout(r, ms))
    let ri = 0
    while (typingActive) {
      const roles = t[lang].roles
      const word = roles[ri % roles.length]
      for (let i = 0; i <= word.length && typingActive; i++) {
        typedText = word.slice(0, i)
        await sleep(75)
      }
      await sleep(1600)
      for (let i = word.length; i >= 0 && typingActive; i--) {
        typedText = word.slice(0, i)
        await sleep(38)
      }
      await sleep(250)
      ri = (ri + 1) % roles.length
    }
  }

  /* ── TILT CARDS ── */
  function tilt(e) {
    const card = e.currentTarget
    const r  = card.getBoundingClientRect()
    const rx = (e.clientY - r.top  - r.height / 2) / 12
    const ry = (r.width / 2 - (e.clientX - r.left)) / 12
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`
  }
  function resetTilt(e) {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)'
  }

  /* ── NAV ── */
  const sections = ['hero', 'about', 'projects', 'contact']

  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  /* ── SCROLL REVEAL + ACTIVE NAV ── */
  let revealEls = $state([])
  let observer
  let navObserver

  function setupObservers() {
    observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.12 })
    revealEls.forEach(el => { if (el) observer.observe(el) })

    navObserver = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) activeSection = e.target.id })
    }, { threshold: 0.4 })
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) navObserver.observe(el)
    })
  }

  /* ── LIFECYCLE ── */
  onMount(() => {
    window.addEventListener('mousemove', onMouseMove)
    initMatrix()
    typeLoop()
    setupObservers()
  })

  onDestroy(() => {
    if (!browser) return
    typingActive = false
    if (matrixInterval) clearInterval(matrixInterval)
    if (observer) observer.disconnect()
    if (navObserver) navObserver.disconnect()
    window.removeEventListener('mousemove', onMouseMove)
  })

  const techs = [
    'Python', 'Pandas', 'NumPy', 'Scikit-learn',
    'TensorFlow', 'Matplotlib', 'SQL', 'Power BI', 'Rust'
  ]
</script>

<!-- CURSOR -->
<div id="cursor" style="left:{x}px; top:{y}px; opacity:{cursorVisible ? 1 : 0}" class:pointer={isPointer}>
  {#if !isPointer}
    <!-- FLECHA -->
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cg" x1="4" y1="3" x2="18" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#4a4a4a"/>
          <stop offset="100%" stop-color="#000000"/>
        </linearGradient>
      </defs>
      <path d="M5 3 L5 21 L9.5 16.5 L13.5 24 L16 22.5 L12 15.5 L18.5 15.5 Z"
        fill="rgba(0,0,0,0.15)" transform="translate(1.2,1.2)"/>
      <path d="M5 3 L5 21 L9.5 16.5 L13.5 24 L16 22.5 L12 15.5 L18.5 15.5 Z"
        fill="white" stroke="white" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M5 3 L5 21 L9.5 16.5 L13.5 24 L16 22.5 L12 15.5 L18.5 15.5 Z"
        fill="url(#cg)"/>
    </svg>
  {:else}
    <!-- MANO estilo cursor nativo -->
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hg" x1="2" y1="2" x2="18" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#4a4a4a"/>
          <stop offset="100%" stop-color="#000000"/>
        </linearGradient>
      </defs>
      <!-- Sombra -->
      <path d="M7,8 L7,3 A2,2 0 0,1 11,3 L11,9
        C11.5,8.5 12.1,8.3 12.8,8.5 C13.3,8.7 13.7,9.1 13.8,9.6
        C14.2,9.1 14.9,8.9 15.6,9.1 C15.8,9.2 16.2,9.5 16.4,9.9
        C16.8,9.5 17.5,9.4 18.1,9.7 C18.8,10.1 19,11 19,11.9
        L19,16 C19,19.3 16.3,22 13,22 L10.5,22
        C8.8,22 7.3,21.2 6.3,20 L4,17
        C3.5,16.3 3.6,15.3 4.3,14.8 C5,14.3 6,14.4 6.5,15.1
        L8,17 Z"
        fill="rgba(0,0,0,0.25)" transform="translate(1,1)"/>
      <!-- 1. Relleno degradado -->
      <path d="M7,8 L7,3 A2,2 0 0,1 11,3 L11,9
        C11.5,8.5 12.1,8.3 12.8,8.5 C13.3,8.7 13.7,9.1 13.8,9.6
        C14.2,9.1 14.9,8.9 15.6,9.1 C15.8,9.2 16.2,9.5 16.4,9.9
        C16.8,9.5 17.5,9.4 18.1,9.7 C18.8,10.1 19,11 19,11.9
        L19,16 C19,19.3 16.3,22 13,22 L10.5,22
        C8.8,22 7.3,21.2 6.3,20 L4,17
        C3.5,16.3 3.6,15.3 4.3,14.8 C5,14.3 6,14.4 6.5,15.1
        L8,17 Z"
        fill="url(#hg)" stroke="none"/>
      <!-- 2. Borde blanco encima — fill none para que no tape el degradado -->
      <path d="M7,8 L7,3 A2,2 0 0,1 11,3 L11,9
        C11.5,8.5 12.1,8.3 12.8,8.5 C13.3,8.7 13.7,9.1 13.8,9.6
        C14.2,9.1 14.9,8.9 15.6,9.1 C15.8,9.2 16.2,9.5 16.4,9.9
        C16.8,9.5 17.5,9.4 18.1,9.7 C18.8,10.1 19,11 19,11.9
        L19,16 C19,19.3 16.3,22 13,22 L10.5,22
        C8.8,22 7.3,21.2 6.3,20 L4,17
        C3.5,16.3 3.6,15.3 4.3,14.8 C5,14.3 6,14.4 6.5,15.1
        L8,17 Z"
        fill="none" stroke="white" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
      <!-- Separadores dedos -->
      <line x1="11" y1="10.5" x2="13.8" y2="10.5" stroke="rgba(255,255,255,0.3)" stroke-width="0.7"/>
      <line x1="13.8" y1="11.2" x2="16.4" y2="11.2" stroke="rgba(255,255,255,0.3)" stroke-width="0.7"/>
      <line x1="16.4" y1="12" x2="18.8" y2="12" stroke="rgba(255,255,255,0.3)" stroke-width="0.7"/>
    </svg>
  {/if}
</div>

<!-- MATRIX -->
<canvas bind:this={canvas} id="matrix-canvas"></canvas>

<!-- MOBILE HEADER -->
<header class="mobile-header">
  <button class="hamburger" onclick={() => menuOpen = !menuOpen} aria-label="Menu">
    {#if menuOpen}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    {:else}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    {/if}
  </button>
  <span class="mobile-logo">LC_</span>
  <div class="mobile-lang">
    <button class="lang-btn {lang === 'en' ? 'active' : ''}" onclick={() => lang = 'en'}>EN</button>
    <span class="lang-sep">|</span>
    <button class="lang-btn {lang === 'es' ? 'active' : ''}" onclick={() => lang = 'es'}>ES</button>
  </div>
</header>

<!-- MOBILE DRAWER -->
{#if menuOpen}
  <div
    class="mobile-overlay"
    role="button"
    tabindex="-1"
    onclick={closeMenu}
    onkeydown={(e) => e.key === 'Escape' && closeMenu()}
  ></div>
  <nav class="mobile-drawer">
    <div class="mobile-drawer-links">
      {#each sections as s (s)}
        <button
          class="nav-item {activeSection === s ? 'active' : ''}"
          onclick={() => { goTo(s); closeMenu() }}
        >
          <span class="nav-dot"></span>
          <span class="nav-label">{tr.nav[s]}</span>
        </button>
      {/each}
    </div>
  </nav>
{/if}

<!-- LAYOUT -->
<div class="layout">

  <!-- SIDEBAR -->
  <nav class="sidebar">
    <div class="nav-logo">LC_</div>
    <div class="nav-links">
      {#each sections as s (s)}
        <button
          class="nav-item {activeSection === s ? 'active' : ''}"
          onclick={() => goTo(s)}
        >
          <span class="nav-dot"></span>
          <span class="nav-label">{tr.nav[s]}</span>
        </button>
      {/each}
    </div>

    <!-- LANG SWITCHER -->
    <div class="lang-switcher">
      <button class="lang-btn {lang === 'en' ? 'active' : ''}" onclick={() => lang = 'en'}>EN</button>
      <span class="lang-sep">|</span>
      <button class="lang-btn {lang === 'es' ? 'active' : ''}" onclick={() => lang = 'es'}>ES</button>
    </div>

    <div class="nav-socials">
      <a class="social-item" href="https://github.com/luccorreaa" target="_blank" rel="noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <span class="social-label">GitHub</span>
      </a>
      <a class="social-item" href="https://www.linkedin.com/in/luciano-correa-b1b500322/" target="_blank" rel="noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <span class="social-label">LinkedIn</span>
      </a>
    </div>
  </nav>

  <!-- CONTENIDO -->
  <main class="content">

    <!-- HERO -->
    <section id="hero">
      <div class="hero-inner">
        <p class="hero-tag">{tr.available}</p>
        <h1 class="hero-name">Luciano<br/>Correa</h1>
        <p class="hero-role">
          <span>{typedText}</span><span class="cursor-blink"></span>
        </p>
        <p class="hero-desc">{tr.heroDesc}</p>
        <div class="hero-btns">
          <button class="btn-primary" onclick={() => goTo('projects')}>{tr.viewProjects}</button>
          <button class="btn-outline" onclick={() => goTo('contact')}>{tr.contact}</button>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about">
      <div class="reveal" bind:this={revealEls[0]}>
        <p class="section-label">{tr.aboutLabel}</p>
        <h2 class="section-title">{tr.aboutTitle}</h2>
        <div class="about-grid">
          <p class="about-text">{tr.aboutText}</p>
        </div>
        <div class="tech-stack">
            {#each techs as t (t)}
              <span class="tech-tag">
                {#if t === 'Python'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.131V3.19S18.28 0 11.914 0zm-3.2 1.848a1.046 1.046 0 1 1 0 2.092 1.046 1.046 0 0 1 0-2.092z"/><path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.402-3.35 3.402H9.451s-3.24-.052-3.24 3.131v5.339S5.72 24 12.086 24zm3.2-1.848a1.046 1.046 0 1 1 0-2.092 1.046 1.046 0 0 1 0 2.092z"/></svg>
                {:else if t === 'Pandas'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9.074 2.49v6.45H7.498V2.49h1.576zm0 12.57v6.45H7.498v-6.45h1.576zM16.502 7.06v9.88h-1.576V7.06h1.576zM9.861 0H6.71v24h3.152V0zm6.716 4.572H13.43V24h3.148V4.572z"/></svg>
                {:else if t === 'NumPy'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.242 0L0 6v12l11.242 6L22.485 18V6zm-1.07 1.95l1.07.572 1.07-.572 5.734 3.06-1.052.562-4.682-2.5-4.682 2.5-1.052-.562zM4.43 6.54l5.742 3.067v6.126L4.43 12.667zm6.812 3.067l5.743-3.067v6.126l-5.743 3.067z"/></svg>
                {:else if t === 'Scikit-learn'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z"/></svg>
                {:else if t === 'TensorFlow'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.43 5.311l-6.168-3.564v14.02L12.46 24V0l10.248 5.856.014 5.31z"/></svg>
                {:else if t === 'Matplotlib'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2a8 8 0 0 1 6.93 4H5.07A8 8 0 0 1 12 4zM4 12a8 8 0 0 1 .07-1h15.86A8 8 0 1 1 4 12z"/></svg>
                {:else if t === 'SQL'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm6 14c0 .84-2.46 2-6 2s-6-1.16-6-2v-2.23C7.53 15.56 9.68 16 12 16s4.47-.44 6-1.23V17zm0-5c0 .84-2.46 2-6 2s-6-1.16-6-2v-2.23C7.53 10.56 9.68 11 12 11s4.47-.44 6-1.23V12zm-6-3C8.46 9 6 7.84 6 7s2.46-2 6-2 6 1.16 6 2-2.46 2-6 2z"/></svg>
                {:else if t === 'Power BI'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h4v18H3zm5.5 5h4v13H8.5zM14 8h4v13h-4zM19.5 3H21v18h-1.5z"/></svg>
                {:else if t === 'Rust'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 1.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zm-.75 3v3.25H8.5l3.5 4 3.5-4h-2.75V6.5h-1.5zm-3.5 6.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm8.5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-4.25 2v1.5h-2l1 1.75h2l1-1.75h-2V14.75z"/></svg>
                {/if}
                {t}
              </span>
            {/each}
          </div>
        <div class="about-rings">
          <div class="ring ring1"></div>
          <div class="ring ring2"></div>
          <div class="ring ring3"></div>
          <div class="ring-center"></div>
        </div>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects">
      <div class="reveal" bind:this={revealEls[1]}>
        <p class="section-label">{tr.projectsLabel}</p>
        <h2 class="section-title">{tr.projectsTitle}</h2>
        <div class="projects-grid">
          {#each tr.projects as project (project.name)}
            <div
              class="project-card"
              role="presentation"
              onmousemove={tilt}
              onmouseleave={resetTilt}
            >
              <img src="https://picsum.photos/400/300?{tr.projects.indexOf(project)+1}" alt={project.name} />
              <div class="project-overlay">
                <button class="project-link" onclick={() => {}}>{tr.viewProject}</button>
              </div>
              <div class="project-info">
                <div class="project-name">{project.name}</div>
                <div class="project-tech">{project.tech}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact">
      <div class="reveal" bind:this={revealEls[2]}>
        <p class="section-label">{tr.contactLabel}</p>
        <h2 class="section-title">{tr.contactTitle}</h2>
        <div class="divider"></div>
        <div class="contact-inner">
          <button class="contact-email" onclick={() => window.location.href = 'mailto:lucianocorrea1112@gmail.com'}>
            lucianocorrea1112@gmail.com
          </button>
          <div class="socials-wrapper">
          <div class="contact-socials">
            <a href="https://github.com/luccorreaa" target="_blank" rel="noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/luciano-correa-b1b500322/" target="_blank" rel="noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
          <button class="cv-download" onclick={() => { const a = document.createElement('a'); a.href = '/cv.pdf'; a.download = 'Luciano_Correa_CV.pdf'; a.click() }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {tr.downloadCV}
          </button>
        </div>
        </div>
      </div>
    </section>

  </main>
</div>

<style>
  /* Fonts — agregá en src/app.html:
     <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
  */

  /* Forzar cursor none en TODO — incluyendo elementos interactivos */
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(html) { scroll-behavior: smooth; height: 100%; }
  :global(body) {
    background: #060606;
    color: #e8e8e8;
    font-family: 'Outfit', 'Segoe UI', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }
  :global(a), :global(button), :global(input), :global(select),
  :global(textarea), :global([role="button"]), :global([tabindex]),
  :global([role="presentation"]) {
    cursor: none !important;
  }

  #cursor {
    position: fixed;
    width: 28px; height: 28px;
    pointer-events: none;
    transform: translate(-3px, -2px);
    transition: left 0.05s linear, top 0.05s linear;
    z-index: 9999;
    filter: drop-shadow(0px 1px 3px rgba(0,0,0,0.6));
  }
  /* La mano necesita alinearse desde la punta del dedo índice */
  #cursor.pointer {
    transform: translate(-6px, -2px);
  }

  #matrix-canvas {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 0;
    opacity: 0.35;
    pointer-events: none;
  }

  .layout {
    display: flex;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }

  /* SIDEBAR */
  .sidebar {
    position: fixed;
    left: 0; top: 0;
    height: 100vh;
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: 2.5rem 2rem;
    background: rgba(6,6,6,0.8);
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(255,255,255,0.05);
    z-index: 100;
  }

  .nav-logo {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 700;
    font-size: 1rem;
    color: #00ff9c;
    letter-spacing: 0.05em;
    margin-bottom: 3rem;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.6rem 0.8rem;
    border-radius: 0.5rem;
    transition: background 0.2s;
    text-align: left;
    width: 100%;
  }
  .nav-item:hover { background: rgba(255,255,255,0.04); }
  .nav-item.active { background: rgba(0,255,156,0.07); }

  .nav-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    flex-shrink: 0;
    transition: background 0.2s, transform 0.2s;
  }
  .nav-item.active .nav-dot { background: #00ff9c; transform: scale(1.4); }

  .nav-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .nav-item.active .nav-label,
  .nav-item:hover .nav-label { color: rgba(255,255,255,0.8); }

  .nav-socials {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  /* LANG SWITCHER */
  .lang-switcher {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 0.8rem;
    margin-bottom: 0.5rem;
  }
  .lang-btn {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    background: none;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 0.3rem;
    color: rgba(255,255,255,0.3);
    padding: 0.25rem 0.55rem;
    cursor: none;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
  }
  .lang-btn.active {
    color: #00ff9c;
    border-color: rgba(0,255,156,0.5);
    background: rgba(0,255,156,0.07);
  }
  .lang-btn:hover:not(.active) {
    color: rgba(255,255,255,0.7);
    border-color: rgba(255,255,255,0.3);
  }
  .lang-sep {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.65rem;
    color: rgba(255,255,255,0.15);
  }

  .social-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.8rem;
    border-radius: 0.5rem;
    text-decoration: none;
    color: rgba(255,255,255,0.3);
    transition: background 0.2s, color 0.2s;
    cursor: none;
  }
  .social-item:hover {
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.8);
  }
  .social-item svg {
    flex-shrink: 0;
    opacity: 0.5;
    transition: opacity 0.2s;
  }
  .social-item:hover svg { opacity: 1; }

  .social-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  /* CONTENT */
  .content {
    margin-left: 200px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  section {
    height: 100vh;
    display: flex;
    align-items: center;
    padding: 4rem 5rem;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    position: relative;
    overflow: hidden;
  }

  .section-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.67rem;
    color: #00ff9c;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    opacity: 0.75;
  }

  h2.section-title {
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 2rem;
    color: #f0f0f0;
  }

  /* HERO */
  #hero { justify-content: center; }
  .hero-inner { max-width: 680px; }

  .hero-tag {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    color: #00ff9c;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    opacity: 0;
    animation: fadeUp 0.8s 0.2s forwards;
  }

  h1.hero-name {
    font-size: clamp(3.5rem, 7vw, 6.5rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.02em;
    color: #e8e8e8;
    text-shadow: 0 0 60px rgba(0,255,156,0.12), 0 0 120px rgba(0,255,156,0.05);
    opacity: 0;
    animation: fadeUp 0.8s 0.4s forwards;
  }
  h1.hero-name::after {
    content: '';
    display: block;
    width: 52px; height: 2px;
    background: #00ff9c;
    margin-top: 1rem;
    border-radius: 2px;
  }

  .hero-role {
    font-family: 'IBM Plex Mono', monospace;
    font-size: clamp(0.82rem, 1.6vw, 1rem);
    color: rgba(255,255,255,0.4);
    margin-top: 1.5rem;
    min-height: 1.6rem;
    opacity: 0;
    animation: fadeUp 0.8s 0.6s forwards;
  }

  .cursor-blink {
    display: inline-block;
    width: 2px; height: 0.9em;
    background: #00ff9c;
    vertical-align: middle;
    margin-left: 2px;
    animation: blink 1s step-end infinite;
  }

  .hero-desc {
    color: rgba(255,255,255,0.27);
    max-width: 440px;
    margin-top: 1.1rem;
    font-size: 0.93rem;
    font-weight: 300;
    line-height: 1.8;
    opacity: 0;
    animation: fadeUp 0.8s 0.8s forwards;
  }

  .hero-btns {
    display: flex;
    gap: 0.9rem;
    margin-top: 2.5rem;
    opacity: 0;
    animation: fadeUp 0.8s 1s forwards;
  }

  .btn-primary {
    padding: 0.68rem 1.7rem;
    background: #00ff9c;
    color: #000;
    border: none;
    border-radius: 0.4rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .btn-primary:hover { transform: scale(1.04); box-shadow: 0 0 28px rgba(0,255,156,0.35); }

  .btn-outline {
    padding: 0.68rem 1.7rem;
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.5);
    background: transparent;
    border-radius: 0.4rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-outline:hover { border-color: rgba(255,255,255,0.45); color: #fff; }

  /* ABOUT */
  #about { overflow: hidden; }

  .about-grid {
    display: block;
    max-width: 640px;
  }

  .about-text {
    color: rgba(255,255,255,0.42);
    line-height: 1.85;
    font-size: 0.96rem;
    font-weight: 300;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-content: flex-start;
    margin-top: 1.5rem;
  }

  .tech-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.66rem;
    padding: 0.32rem 0.8rem;
    border: 1px solid rgba(0,255,156,0.18);
    border-radius: 2rem;
    color: rgba(0,255,156,0.45);
    letter-spacing: 0.05em;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    cursor: none;
  }
  .tech-tag svg { opacity: 0.6; flex-shrink: 0; }
  .tech-tag:hover { border-color: #00ff9c; color: #00ff9c; background: rgba(0,255,156,0.05); }
  .tech-tag:hover svg { opacity: 1; }

  .about-rings {
    position: absolute;
    right: 5rem; top: 50%;
    transform: translateY(-50%);
    width: 220px; height: 220px;
    display: flex; align-items: center; justify-content: center;
    opacity: 0.25;
    pointer-events: none;
  }
  .ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid;
    animation: spin linear infinite;
  }
  .ring1 { width: 200px; height: 200px; border-color: rgba(0,255,156,0.5); animation-duration: 14s; }
  .ring2 { width: 140px; height: 140px; border-color: rgba(0,255,156,0.4); animation-duration: 9s; animation-direction: reverse; }
  .ring3 { width: 80px;  height: 80px;  border-color: rgba(0,255,156,0.6); animation-duration: 5s; }
  .ring-center {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: rgba(0,255,156,0.1);
    border: 1px solid rgba(0,255,156,0.5);
    z-index: 1;
  }

  /* PROJECTS */
  #projects { align-items: center; }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.1rem;
    margin-top: 0.5rem;
  }

  .project-card {
    position: relative;
    border-radius: 0.7rem;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.015);
    transition: border-color 0.25s;
    transform-style: preserve-3d;
    cursor: none;
  }
  .project-card:hover { border-color: rgba(0,255,156,0.22); }

  .project-card img {
    width: 100%;
    height: 170px;
    object-fit: cover;
    display: block;
    filter: brightness(0.6) saturate(0.5);
    transition: filter 0.3s;
  }
  .project-card:hover img { filter: brightness(0.45) saturate(0.7); }

  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 170px;
    background: rgba(0,0,0,0.82);
    display: flex;
    align-items: flex-end;
    padding: 1.2rem;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.3s, transform 0.3s;
  }
  .project-card:hover .project-overlay { opacity: 1; transform: translateY(0); }

  .project-info {
    padding: 0.9rem 1rem;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .project-name { font-size: 0.88rem; font-weight: 600; margin-bottom: 0.2rem; color: #e0e0e0; }
  .project-tech { font-family: 'IBM Plex Mono', monospace; font-size: 0.63rem; color: rgba(0,255,156,0.45); letter-spacing: 0.04em; }

  .project-link {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    padding: 0.38rem 0.85rem;
    border: 1px solid rgba(0,255,156,0.35);
    border-radius: 0.3rem;
    color: #00ff9c;
    background: transparent;
    cursor: pointer;
    transition: background 0.2s;
  }
  .project-link:hover { background: rgba(0,255,156,0.1); }

  /* CONTACT */
  #contact { justify-content: flex-start; }

  .contact-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .divider { width: 44px; height: 2px; background: #00ff9c; margin: 1.4rem 0; border-radius: 2px; }

  .contact-email {
    font-family: 'IBM Plex Mono', monospace;
    font-size: clamp(0.9rem, 1.8vw, 1.2rem);
    color: rgba(255,255,255,0.38);
    background: none;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding: 0 0 3px 0;
    display: inline-block;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
  }
  .contact-email:hover { color: #00ff9c; border-color: #00ff9c; }

  .socials-wrapper {
    display: inline-flex;
    flex-direction: column;
    gap: 0;
  }

  .contact-socials { display: flex; gap: 1rem; }
  .contact-socials a {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.82rem;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    letter-spacing: 0.08em;
    padding: 0.7rem 1.3rem;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 0.5rem;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
    cursor: none;
  }
  .contact-socials a:hover {
    color: #00ff9c;
    border-color: rgba(0,255,156,0.4);
    background: rgba(0,255,156,0.04);
  }
  .contact-socials a svg {
    opacity: 0.6;
    transition: opacity 0.2s;
    flex-shrink: 0;
  }
  .contact-socials a:hover svg { opacity: 1; }

  .cv-download {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    margin-top: 1rem;
    width: 100%;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #000;
    background: #00ff9c;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    cursor: none;
    transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
  }
  .cv-download:hover {
    background: #33ffb0;
    transform: scale(1.03);
    box-shadow: 0 0 28px rgba(0,255,156,0.35);
  }
  .cv-download svg {
    stroke: #000;
    transition: transform 0.2s;
  }
  .cv-download:hover svg {
    transform: translateY(2px);
  }

  /* SCROLL REVEAL */
  :global(.reveal) {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.7s ease, transform 0.7s ease;
    width: 100%;
  }
  :global(.reveal.visible) { opacity: 1; transform: translateY(0); }

  /* KEYFRAMES */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .sidebar { width: 160px; padding: 2rem 1.5rem; }
    .content { margin-left: 160px; }
    section { padding: 3rem 2.5rem; }
    .projects-grid { grid-template-columns: 1fr 1fr; }
    .about-rings { display: none; }
  }
  @media (max-width: 640px) {
    .sidebar { display: none; }
    .content { margin-left: 0; }
    section { padding: 3rem 1.5rem; }
    .projects-grid { grid-template-columns: 1fr; }
    .about-grid { grid-template-columns: 1fr; }
  }

  /* En touch/mobile no hay mouse — ocultar cursor custom y restaurar el nativo */
  @media (hover: none) and (pointer: coarse) {
    #cursor { display: none; }
    :global(body) { cursor: auto; }
    :global(a), :global(button), :global(input), :global(select),
    :global(textarea), :global([role="button"]), :global([tabindex]),
    :global([role="presentation"]) { cursor: auto !important; }
  }

  /* MOBILE HEADER */
  .mobile-header {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 56px;
    background: rgba(6,6,6,0.9);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    z-index: 200;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.2rem;
  }

  .hamburger {
    background: none;
    border: none;
    color: rgba(255,255,255,0.7);
    padding: 0.4rem;
    border-radius: 0.4rem;
    transition: color 0.2s, background 0.2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hamburger:hover { color: #00ff9c; background: rgba(0,255,156,0.07); }

  .mobile-logo {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 700;
    font-size: 0.95rem;
    color: #00ff9c;
    letter-spacing: 0.05em;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .mobile-lang {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  /* MOBILE DRAWER */
  .mobile-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 300;
    backdrop-filter: blur(2px);
  }

  .mobile-drawer {
    display: none;
    position: fixed;
    top: 56px; left: 0;
    width: 220px;
    height: calc(100vh - 56px);
    background: rgba(6,6,6,0.97);
    border-right: 1px solid rgba(255,255,255,0.07);
    z-index: 400;
    padding: 1.5rem 1.2rem;
    flex-direction: column;
  }

  .mobile-drawer-links {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  @media (max-width: 640px) {
    .mobile-header { display: flex; }
    .mobile-overlay { display: block; }
    .mobile-drawer { display: flex; }
    .sidebar { display: none; }
    .content { margin-left: 0; padding-top: 56px; }
    section { padding: 3rem 1.5rem; }
    .projects-grid { grid-template-columns: 1fr; }
    .about-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 900px) and (min-width: 641px) {
    .mobile-header { display: none; }
    .sidebar { width: 160px; padding: 2rem 1.5rem; }
    .content { margin-left: 160px; }
    section { padding: 3rem 2.5rem; }
    .projects-grid { grid-template-columns: 1fr 1fr; }
    .about-rings { display: none; }
  }
</style>