import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let particles: Particle[] = []
    const COUNT = 90
    const CONNECTION_DIST = 160
    const MOUSE_DIST = 200

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const init = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8,
        opacity: Math.random() * 0.5 + 0.3,
      }))
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const mx = mouse.current.x
      const my = mouse.current.y

      // Update positions
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_DIST) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST
          p.x += (dx / dist) * force * 1.5
          p.y += (dy / dist) * force * 1.5
        }
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35

            // Mouse proximity brightens lines
            const mdA = Math.sqrt((a.x - mx) ** 2 + (a.y - my) ** 2)
            const mdB = Math.sqrt((b.x - mx) ** 2 + (b.y - my) ** 2)
            const boost = mdA < MOUSE_DIST || mdB < MOUSE_DIST ? 2.5 : 1

            const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            gradient.addColorStop(0, `rgba(26,107,255,${alpha * boost})`)
            gradient.addColorStop(1, `rgba(0,212,170,${alpha * boost})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const mdist = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2)
        const glow = mdist < MOUSE_DIST ? 1 : 0.5

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * (mdist < MOUSE_DIST ? 1.8 : 1), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(26,107,255,${p.opacity * glow})`
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    const onResize = () => { resize(); init() }
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 } }

    window.addEventListener('resize', onResize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
