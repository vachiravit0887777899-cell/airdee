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

  ctx.strokeStyle = 'rgba(180, 200, 230, 0.5)'
  ctx.lineWidth = 1

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
  if (prefersReducedMotion) {
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

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  resizeCanvas()
  initDrops()
  startAnimation()

  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  stopAnimation()
  window.removeEventListener('resize', resizeCanvas)
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
    class="pointer-events-none absolute inset-0 z-[2]"
    aria-hidden="true"
  />
</template>