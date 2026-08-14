<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchForecast, type DailyForecastItem } from '../../services/provinceService'

const props = defineProps<{
  provinceId: string
}>()

const daily = ref<DailyForecastItem[]>([])
const isLoading = ref(true)

async function loadForecast() {
  isLoading.value = true
  try {
    const data = await fetchForecast(props.provinceId)
    daily.value = data.daily
  } catch (err) {
    console.error('Failed to load daily forecast:', err)
  } finally {
    isLoading.value = false
  }
}

function formatDay(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric', month: 'short' })
}

onMounted(loadForecast)
watch(() => props.provinceId, loadForecast)
</script>

<template>
  <div class="rounded-2xl border border-glass-border bg-glass-light p-6 backdrop-blur-xl">
    <h3 class="mb-4 text-sm font-medium text-white/60">พยากรณ์ 7 วันข้างหน้า</h3>

    <div v-if="isLoading" class="flex h-32 items-center justify-center">
      <p class="text-sm text-white/40">กำลังโหลดพยากรณ์...</p>
    </div>

    <div v-else class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      <div
        v-for="day in daily"
        :key="day.date"
        class="rounded-xl border border-glass-border bg-white/[0.03] p-3 text-center"
      >
        <p class="text-xs text-white/50">{{ formatDay(day.date) }}</p>
        <p class="mt-2 text-lg font-semibold text-white">{{ day.tempMax }}°</p>
        <p class="text-xs text-white/40">{{ day.tempMin }}°</p>
        <p class="mt-2 text-xs text-blue-300">💧 {{ day.rainProbability }}%</p>
      </div>
    </div>
  </div>
</template>