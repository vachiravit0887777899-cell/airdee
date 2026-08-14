<script setup lang="ts">
</script>

<template>
  <div
    class="absolute inset-0 z-0 overflow-hidden"
    style="background: linear-gradient(180deg, #1a2332 0%, #2a3548 50%, #3a4558 100%)"
  >
    <!-- พระอาทิตย์ถูกหมอกบัง glow ลดลง -->
    <div
      class="absolute left-1/2 top-24 h-40 w-40 -translate-x-1/2 rounded-full blur-sm"
      style="
        background: radial-gradient(circle, #e8c878 0%, #d4a860 40%, transparent 70%);
        box-shadow: 0 0 80px 40px rgba(220, 190, 140, 0.15);
        opacity: 0.7;
        animation: sun-pulse 6s ease-in-out infinite;
      "
    />

    <!-- ชั้นหมอกบางๆ -->
    <div
      class="absolute inset-x-0 top-1/3 h-1/2 bg-white/[0.03] backdrop-blur-[2px]"
      style="animation: haze-drift 40s ease-in-out infinite"
    />

    <!-- เมฆ -->
    <div
      class="absolute top-32 h-16 w-64 rounded-full bg-white/[0.06] blur-2xl"
      style="left: -20%; animation: cloud-drift 55s linear infinite"
    />
  </div>
</template>

<style scoped>
@keyframes sun-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.75; }
}

@keyframes cloud-drift {
  from { transform: translateX(0); }
  to { transform: translateX(140vw); }
}

@keyframes haze-drift {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
  }
}
</style>