'use client'

import { useState, useEffect, useRef } from 'react'
import { FaPython, FaJava } from 'react-icons/fa'
import { SiTypescript, SiVuedotjs, SiNextdotjs } from 'react-icons/si'
import { PiFileCSharpFill } from "react-icons/pi"
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detectar y manejar cambios de tema
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode() // Verificar estado inicial
    
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  // Efecto para medir el ancho del contenedor
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [])

  // Animación de progreso
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 2
        if (newProgress >= 100) {
          clearInterval(timer)
          setTimeout(() => router.push('/portfolio'), 300)
          return 100
        }
        return newProgress
      })
    }, 20)
    
    return () => clearInterval(timer)
  }, [router])

  const technologies = [
    { name: 'Python', icon: <FaPython size={64} /> },
    { name: 'Java', icon: <FaJava size={64} /> },
    { name: 'TypeScript', icon: <SiTypescript size={64} /> },
    { name: 'C#', icon: <PiFileCSharpFill size={64} /> },
    { name: 'Vue.js', icon: <SiVuedotjs size={64} /> },
    { name: 'Next.js', icon: <SiNextdotjs size={64} /> },
  ]

  // Sistema de colores dinámico
  const getThemeColors = () => {
    return {
      bgPrimary: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
      bgSecondary: isDarkMode ? 'bg-gray-800' : 'bg-white',
      textPrimary: isDarkMode ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
      iconActive: isDarkMode ? 'text-blue-400' : 'text-gray-800',
      iconInactive: isDarkMode ? 'text-gray-600' : 'text-gray-400',
      progressBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-200',
      progressFill: isDarkMode ? 'from-blue-400 to-blue-500' : 'from-gray-300 to-gray-500',
      gradientBg: isDarkMode 
        ? 'from-blue-900/20 via-gray-900 to-gray-800/20' 
        : 'from-yellow-100/50 via-gray-50 to-blue-100/50'
    }
  }

  const colors = getThemeColors()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center min-h-screen ${colors.bgPrimary} transition-colors duration-300`}
    >
      {/* Fondo con gradiente dinámico */}
      <div className={`absolute inset-0 overflow-hidden opacity-30 bg-gradient-to-br ${colors.gradientBg}`} />
      
      <div className="z-10 flex flex-col items-center w-full max-w-4xl px-4">
        <h1 className={`mb-8 text-3xl font-bold ${colors.textPrimary}`}>
          Cargando aplicación
        </h1>
        
        <div 
          ref={containerRef}
          className="flex flex-wrap justify-center gap-6 mb-8 w-full"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: progress > index * 16 ? 1 : 0.5,
                y: 0,
              }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`flex flex-col items-center p-4 ${colors.bgSecondary} rounded-lg shadow-sm`}
            >
              <div className={progress > index * 16 ? colors.iconActive : colors.iconInactive}>
                {tech.icon}
              </div>
              <span className={`text-sm font-medium mt-1 ${progress > index * 16 ? colors.textPrimary : colors.textSecondary}`}>
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
        
        {/* Barra de progreso */}
        <div 
          className={`h-1.5 mb-3 overflow-hidden rounded-full ${colors.progressBg}`}
          style={{ width: containerWidth || '100%' }}
        >
          <div 
            className={`h-full bg-gradient-to-r ${colors.progressFill} rounded-full transition-all duration-75 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className={`text-sm ${colors.textSecondary}`}>
          {progress < 100 ? `Cargando... ${progress}%` : '¡Redirigiendo al portfolio!'}
        </div>
      </div>
    </motion.div>
  )
}