<script setup lang="ts">
</script>

<template>
  <div
    class="absolute inset-0 z-0 overflow-hidden"
    style="background: linear-gradient(180deg, #0a1628 0%, #0f2847 50%, #163a5f 100%)"
  >
    <!-- พระอาทิตย์พร้อม glow -->
    <div
      class="absolute left-1/2 top-24 h-40 w-40 -translate-x-1/2 rounded-full"
      style="
        background: radial-gradient(circle, #ffd97a 0%, #ffb84d 40%, transparent 70%);
        box-shadow: 0 0 120px 60px rgba(255, 200, 120, 0.25);
        animation: sun-pulse 6s ease-in-out infinite;
      "
    />

    <!-- เมฆลอยช้าๆ -->
    <div
      class="absolute top-32 h-16 w-64 rounded-full bg-white/5 blur-2xl"
      style="left: -20%; animation: cloud-drift 60s linear infinite"
    />
    <div
      class="absolute top-48 h-12 w-48 rounded-full bg-white/5 blur-2xl"
      style="left: -30%; animation: cloud-drift 80s linear infinite; animation-delay: -20s"
    />
  </div>
</template>

<style scoped>
@keyframes sun-pulse {
  0%, 100% {
    opacity: 0.9;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.05);
  }
}

@keyframes cloud-drift {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(140vw);
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
  }
}
</style>