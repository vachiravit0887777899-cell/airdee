<script setup lang="ts">
import type { AirQualityData } from '../../types/airQuality'

defineProps<{
  data: AirQualityData
}>()

const statusLabel: Record<AirQualityData['status'], string> = {
  good: 'ดีมาก',
  moderate: 'ปานกลาง',
  unhealthy: 'เริ่มมีผลกระทบ',
  danger: 'อันตราย',
  hazardous: 'อันตรายมาก',
}

const statusColor: Record<AirQualityData['status'], string> = {
  good: 'text-aqi-good border-aqi-good/30',
  moderate: 'text-aqi-moderate border-aqi-moderate/30',
  unhealthy: 'text-aqi-unhealthy border-aqi-unhealthy/30',
  danger: 'text-aqi-danger border-aqi-danger/30',
  hazardous: 'text-aqi-hazardous border-aqi-hazardous/30',
}
</script>

<template>
  <div
    class="rounded-2xl border border-glass-border bg-glass-light p-6 backdrop-blur-xl"
  >
    <p class="text-sm text-white/60">PM2.5</p>
    <p class="mt-1 text-4xl font-bold text-white">{{ data.pm25 }}</p>
    <p class="text-xs text-white/40">μg/m³</p>

    <div class="mt-4 flex items-center justify-between">
      <div>
        <p class="text-sm text-white/60">AQI</p>
        <p class="text-2xl font-semibold text-white">{{ data.aqi }}</p>
      </div>
      <span
        :class="statusColor[data.status]"
        class="rounded-full border px-3 py-1 text-sm font-medium"
      >
        {{ statusLabel[data.status] }}
      </span>
    </div>
  </div>
</template>