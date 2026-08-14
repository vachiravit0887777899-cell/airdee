<script setup lang="ts">
import type { AirQualityData } from '../../types/airQuality'

defineProps<{
  data: AirQualityData
}>()
</script>

<template>
  <div
    class="rounded-2xl border border-glass-border bg-glass-light p-6 backdrop-blur-xl"
  >
    <p class="text-sm text-white/60">อุณหภูมิ</p>
    <p class="mt-1 text-4xl font-bold text-white">{{ data.temperature }}°</p>

    <div class="mt-4 grid grid-cols-2 gap-4">
      <div>
        <p class="text-xs text-white/40">ความชื้น</p>
        <p class="text-lg text-white">{{ data.humidity }}%</p>
      </div>
      <div>
        <p class="text-xs text-white/40">ลม</p>
        <p class="text-lg text-white">{{ data.windSpeed }} km/h</p>
      </div>
    </div>
  </div>
</template>