<script setup lang="ts">
import type { Province } from '../../data/provinces'

defineProps<{
  province: Province
  pm25?: number
  aqi?: number
  temperature?: number
}>()

const emit = defineEmits<{
  select: [id: string]
}>()
</script>

<template>
  <button
    type="button"
    @click="emit('select', province.id)"
    class="w-full rounded-2xl border border-glass-border bg-glass-light p-4 text-left backdrop-blur-xl transition hover:bg-white/10"
  >
    <p class="text-sm font-medium text-white">{{ province.nameTh }}</p>
    <p class="text-xs text-white/40">{{ province.nameEn }}</p>

    <div class="mt-3 flex items-center justify-between">
      <div>
        <p class="text-xs text-white/40">PM2.5</p>
        <p class="text-lg font-semibold text-white">{{ pm25 ?? '—' }}</p>
      </div>
      <div>
        <p class="text-xs text-white/40">AQI</p>
        <p class="text-lg font-semibold text-white">{{ aqi ?? '—' }}</p>
      </div>
      <div>
        <p class="text-xs text-white/40">อุณหภูมิ</p>
        <p class="text-lg font-semibold text-white">{{ temperature ?? '—' }}°</p>
      </div>
    </div>
  </button>
</template>