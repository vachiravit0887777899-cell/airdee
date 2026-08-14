<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import {
  type DustParticle,
  getParticleCount,
  createParticle,
  updateParticle,
} from '../../composables/useDustParticles'

const props = defineProps<{
  pm25: number
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let particles: DustParticle[] = []
let animationFrameId: number | null = null
let prefersReducedMotion = false
let resizeTimeoutId: number | null = null

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function handleResize() {
  if (resizeTimeoutId) clearTimeout(resizeTimeoutId)
  resizeTimeoutId = window.setTimeout(() => {
    resizeCanvas()
    initParticles()
  }, 150)
}

function initParticles() {
  const canvas = canvasRef.value
  if (!canvas) return
  const count = getParticleCount(props.pm25)
  particles = Array.from({ length: count }, () => createParticle(canvas.width, canvas.height))
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (const p of particles) {
    updateParticle(p, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(200, 180, 150, ${p.opacity})`
    ctx.fill()
  }

  animationFrameId = requestAnimationFrame(draw)
}

function startAnimation() {
  if (prefersReducedMotion) {
    // วาดครั้งเดียวแบบนิ่ง ไม่ animate ต่อเนื่อง (ตาม accessibility)
    draw()
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
    return
  }
  draw()
}

function stopAnimation() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopAnimation()
  } else {
    startAnimation()
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  resizeCanvas()
  initParticles()
  startAnimation()

  window.addEventListener('resize', handleResize)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  stopAnimation()
  if (resizeTimeoutId) clearTimeout(resizeTimeoutId)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
// เมื่อ PM2.5 เปลี่ยน (เปลี่ยนจังหวัด) ให้สร้าง particle set ใหม่ตามจำนวนที่เหมาะสม
watch(
  () => props.pm25,
  () => {
    initParticles()
  }
)
</script>

<template>
  <canvas
    ref="canvasRef"
    class="pointer-events-none absolute inset-0 -z-[5]"
    aria-hidden="true"
  />
</template>