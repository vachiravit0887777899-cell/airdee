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
    <p class="text-sm text-white/60">โอกาสฝนตก</p>
    <p class="mt-1 text-4xl font-bold text-white">{{ data.rainProbability }}%</p>

    <p v-if="data.rainProbability >= 60" class="mt-4 text-sm text-blue-300">
      มีโอกาสฝนตกสูง เตรียมร่มไว้ด้วย
    </p>
    <p v-else class="mt-4 text-sm text-white/40">
      ไม่มีฝนตกหนักในช่วงนี้
    </p>
  </div>
</template>