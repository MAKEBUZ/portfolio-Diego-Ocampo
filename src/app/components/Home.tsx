"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import * as THREE from 'three'
import { gsap } from 'gsap'

export default function Home() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Manejo del tema oscuro
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

  // ThreeJS Gusano setup con tema
  useEffect(() => {
    if (!containerRef.current || !isMounted) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 0

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(isDarkMode ? 0x111111 : 0xf8f8f8) // Fondo oscuro/claro
    containerRef.current.appendChild(renderer.domElement)
    renderer.domElement.classList.add('absolute', 'top-0', 'left-0', 'z-0')

    // Configuración del material con tema
    const wireColor = isDarkMode ? 0xffffff : 0x333333 // Líneas blancas/negras
    const baseColor = isDarkMode ? 0x111111 : 0xf8f8f8 // Fondo oscuro/claro

    const uniforms = {
      uTime: { value: 0.0 },
      uWireColor: { value: new THREE.Color(wireColor) },
      uBaseColor: { value: new THREE.Color(baseColor) }
    }

    const wireframeMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uWireColor;
        uniform vec3 uBaseColor;
        varying vec2 vUv;

        void main() {
          vec2 grid = abs(fract(vUv * 20.0 - 0.5) - 0.5);
          vec2 gridWidth = fwidth(vUv * 20.0);
          float lineX = smoothstep(0.0, gridWidth.x * 1.0, grid.x);
          float lineY = smoothstep(0.0, gridWidth.y * 1.0, grid.y);
          float line = 1.0 - min(lineX, lineY);

          vec3 finalColor = mix(uBaseColor, uWireColor, line);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.BackSide
    })

    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -10),
      new THREE.Vector3(3, 2, -20),
      new THREE.Vector3(-3, -2, -30),
      new THREE.Vector3(0, 0, -40)
    ])

    const geometry = new THREE.TubeGeometry(path, 200, 2, 32, false)
    const tube = new THREE.Mesh(geometry, wireframeMaterial)
    scene.add(tube)

    // Animación
    const percentage = { value: 0 }
    gsap.to(percentage, {
      value: 1,
      duration: 10,
      ease: "linear",
      repeat: -1,
      onUpdate: () => {
        const p1 = path.getPointAt(percentage.value)
        const p2 = path.getPointAt((percentage.value + 0.01) % 1)
        camera.position.set(p1.x, p1.y, p1.z)
        camera.lookAt(p2)
      }
    })

    const animate = () => {
      uniforms.uTime.value += 0.01
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      const container = containerRef.current
      if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement)
      }
    }
  }, [isDarkMode, isMounted])

  const handleStartClick = () => {
    router.push('/loading')
  }

  const textColor = isDarkMode ? 'text-white' : 'text-gray-900'
  const secondaryTextColor = isDarkMode ? 'text-gray-300' : 'text-gray-700'
  const dividerColor = isDarkMode ? 'bg-white' : 'bg-gray-900'
  const buttonStyles = isDarkMode 
    ? 'bg-white text-gray-800 hover:bg-gray-100' 
    : 'bg-gray-800 text-white hover:bg-gray-700'

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Contenido principal */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <motion.h1
          className={`mb-4 text-4xl font-bold tracking-wider ${textColor} md:text-5xl lg:text-6xl`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          DIEGO ALEJANDRO OCAMPO
        </motion.h1>

        <motion.h2
          className={`mb-8 text-2xl font-medium tracking-wide ${secondaryTextColor} md:text-3xl`}
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
            <span className={`text-5xl font-medium ${textColor}`}>쓰</span>
            <div className="flex items-center w-full px-4">
              <div className={`h-0.5 flex-1 ${dividerColor}`}></div> 
              <div className="w-8"></div>
              <div className={`h-0.5 flex-1 ${dividerColor}`}></div>
            </div>
            <span className={`text-5xl font-medium ${textColor} transform scale-y-[-1]`}>쓰</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <button
            onClick={handleStartClick}
            className={`rounded-md px-8 py-3 text-lg font-medium shadow-lg transition-all hover:shadow-xl ${buttonStyles}`}
          >
            Click To Start
          </button>
        </motion.div>
      </div>
    </div>
  )
}