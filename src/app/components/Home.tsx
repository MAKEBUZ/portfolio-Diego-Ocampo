"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Dark mode handling
  useEffect(() => {
    setIsMounted(true)
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle('dark', isDarkMode)
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    }
  }, [isDarkMode, isMounted])

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 150
    const maxDistance = 300

    class Particle {
      x!: number
      y!: number
      directionX: number
      directionY: number
      size: number
      color: string

      constructor() {
        if (canvas) {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
        }
        this.directionX = (Math.random() - 0.5) * 0.8
        this.directionY = (Math.random() - 0.5) * 0.8
        this.size = Math.random() * 3 + 1.5

        const isDark = document.documentElement.classList.contains('dark')
        const colors = [
          isDark 
            ? `rgba(100, 200, 255, ${Math.random() * 0.7 + 0.3})` 
            : `rgba(30, 100, 200, ${Math.random() * 0.7 + 0.3})`,
          isDark 
            ? `rgba(100, 255, 200, ${Math.random() * 0.7 + 0.3})` 
            : `rgba(30, 200, 100, ${Math.random() * 0.7 + 0.3})`,
          isDark 
            ? `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})` 
            : `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX * (0.9 + Math.random() * 0.2)
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY * (0.9 + Math.random() * 0.2)
        }

        this.x += this.directionX
        this.y += this.directionY
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = document.documentElement.classList.contains('dark')
      const connectionColor = isDark ? 'rgba(150, 220, 255, 0.8)' : 'rgba(30, 120, 220, 0.8)'

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = connectionColor.replace('0.8', `${opacity * 0.8}`)
            ctx.lineWidth = opacity * 1.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const observer = new MutationObserver(() => {
      particles.length = 0
      init()
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    window.addEventListener("resize", handleResize)

    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [])

  const handleStartClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push('/loading')
    }, 300)
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-primary">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-90 dark:opacity-80"
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="mb-4 text-4xl font-bold tracking-wider text-primary dark:text-primary md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          DIEGO ALEJANDRO OCAMPO
        </motion.h1>

        <motion.h2
          className="mb-8 text-2xl font-medium tracking-wide text-primary md:text-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          MADROÑERO
        </motion.h2>

        <motion.div
          className="mb-10 w-full max-w-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
        >
          <div className="flex flex-col items-center space-y-1">
            <span className={isDarkMode ? 'text-gray-200 text-5xl font-medium' : 'text-gray-800 text-5xl font-medium'}>쓰</span>
            <div className={`flex items-center w-full px-4 ${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
              <div className={`${isDarkMode ? 'bg-white h-0.5 flex-1' : 'bg-gray-800 h-0.5 flex-1'}`}></div> 
              <div className="w-8"></div>
              <div className={`${isDarkMode ? 'bg-white h-0.5 flex-1' : 'bg-gray-800 h-0.5 flex-1'}`}></div>
            </div>
            <span className={isDarkMode ? 'text-gray-200 text-5xl font-medium transform scale-y-[-1]' : 'text-gray-800 text-5xl font-medium transform scale-y-[-1]'}>쓰</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <button
            onClick={handleStartClick}
            className={`rounded-md px-8 py-3 text-lg font-medium shadow-lg transition-smooth hover:shadow-xl ${
              isDarkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'
            } hover:bg-opacity-90`}
          >
            Click To Start
          </button>
        </motion.div>
      </div>
    </main>
  )
}