<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import {
  type RainDrop,
  getRainDropCount,
  createRainDrop,
  updateRainDrop,
} from '../../composables/useRainParticles'

const props = defineProps<{
  rainProbability: number
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let drops: RainDrop[] = []
let animationFrameId: number | null = null
let prefersReducedMotion = false
let resizeTimeoutId: number | null = null

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function initDrops() {
  const canvas = canvasRef.value
  if (!canvas) return
  const count = getRainDropCount(props.rainProbability)
  drops = Array.from({ length: count }, () => createRainDrop(canvas.width, canvas.height))
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = 'rgba(100, 200, 255, 1)'
  ctx.lineWidth = 3

  for (const drop of drops) {
    updateRainDrop(drop, canvas.width, canvas.height)
    ctx.globalAlpha = drop.opacity
    ctx.beginPath()
    ctx.moveTo(drop.x, drop.y)
    ctx.lineTo(drop.x - drop.length * 0.3, drop.y + drop.length)
    ctx.stroke()
  }
  ctx.globalAlpha = 1

  animationFrameId = requestAnimationFrame(draw)
}

function startAnimation() {
  if (drops.length === 0) return
  if (animationFrameId) return // ป้องกันสั่งซ้ำซ้อน
  if (prefersReducedMotion) {
    draw()
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
    animationFrameId = null
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

function handleResize() {
  if (resizeTimeoutId) clearTimeout(resizeTimeoutId)
  resizeTimeoutId = window.setTimeout(() => {
    resizeCanvas()
    initDrops()
  }, 150)
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
  initDrops()
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

watch(
  () => props.rainProbability,
  () => {
    stopAnimation()
    initDrops()
    startAnimation()
  }
)
</script>

<template>
  <canvas
    v-if="rainProbability >= 60"
    ref="canvasRef"
    class="pointer-events-none fixed inset-0 z-[2]"
    aria-hidden="true"
  />
</template>