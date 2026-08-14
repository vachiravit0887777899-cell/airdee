<script setup lang="ts">
</script>

<template>
  <div
    class="absolute inset-0 z-0 overflow-hidden"
    style="background: linear-gradient(180deg, #2e2a24 0%, #3d3830 50%, #4a4238 100%)"
  >
    <!-- พระอาทิตย์สีหม่นแดง ถูกฝุ่นบังหนัก -->
    <div
      class="absolute left-1/2 top-24 h-40 w-40 -translate-x-1/2 rounded-full blur-md"
      style="
        background: radial-gradient(circle, #c9905a 0%, #a8703f 40%, transparent 70%);
        box-shadow: 0 0 60px 30px rgba(180, 130, 80, 0.12);
        opacity: 0.5;
      "
    />

    <!-- หมอกฝุ่นหนาขึ้น หลายชั้น -->
    <div
      class="absolute inset-x-0 top-1/4 h-2/3 bg-amber-100/[0.04] backdrop-blur-[3px]"
      style="animation: haze-drift 30s ease-in-out infinite"
    />
    <div
      class="absolute inset-x-0 bottom-0 h-1/2 bg-amber-200/[0.03] backdrop-blur-[2px]"
      style="animation: haze-drift 45s ease-in-out infinite reverse"
    />

    <!-- Warning tint เบาๆ ที่ขอบจอ -->
    <div
      class="absolute inset-0"
      style="box-shadow: inset 0 0 150px 30px rgba(251, 146, 60, 0.06)"
    />
  </div>
</template>

<style scoped>
@keyframes haze-drift {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.9; }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
  }
}
</style>