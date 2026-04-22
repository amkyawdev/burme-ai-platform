'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function BackgroundThree() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 1500
    const posArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 60
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.6
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    camera.position.z = 30

    // Animation
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = (event.clientY / window.innerHeight) * 2 - 1
    }

    document.addEventListener('mousemove', handleMouseMove)

    function animate() {
      requestAnimationFrame(animate)
      
      particlesMesh.rotation.y = mouseX * 0.5
      particlesMesh.rotation.x = mouseY * 0.3
      
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}