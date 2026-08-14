<script setup lang="ts">
</script>

<template>
  <div
    class="absolute inset-0 z-0 overflow-hidden"
    style="background: linear-gradient(180deg, #1f1a16 0%, #2b241e 50%, #362d24 100%)"
  >
    <!-- พระอาทิตย์แทบมองไม่เห็น ถูกฝุ่นบังหนักมาก -->
    <div
      class="absolute left-1/2 top-24 h-40 w-40 -translate-x-1/2 rounded-full blur-lg"
      style="
        background: radial-gradient(circle, #8a6040 0%, #6b4a30 40%, transparent 70%);
        opacity: 0.25;
      "
    />

    <!-- หมอกฝุ่นหนามาก 3 ชั้น -->
    <div
      class="absolute inset-0 bg-amber-950/20 backdrop-blur-[4px]"
      style="animation: haze-drift 25s ease-in-out infinite"
    />
    <div
      class="absolute inset-x-0 top-0 h-2/3 bg-orange-950/15 backdrop-blur-[3px]"
      style="animation: haze-drift 35s ease-in-out infinite reverse"
    />
    <div
      class="absolute inset-x-0 bottom-0 h-3/4 bg-amber-900/15 backdrop-blur-[3px]"
      style="animation: haze-drift 40s ease-in-out infinite"
    />

    <!-- Warning tint แดงส้มเข้มขึ้นชัดเจน -->
    <div
      class="absolute inset-0"
      style="box-shadow: inset 0 0 200px 60px rgba(239, 68, 68, 0.12); animation: warning-pulse 4s ease-in-out infinite"
    />
  </div>
</template>

<style scoped>
@keyframes haze-drift {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes warning-pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
  }
}
</style>