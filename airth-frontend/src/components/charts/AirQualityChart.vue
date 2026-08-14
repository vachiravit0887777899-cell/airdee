<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { fetchAirQualityHistory, type HistoryPoint } from '../../services/provinceService'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent])

const props = defineProps<{
  provinceId: string
}>()

const history = ref<HistoryPoint[]>([])
const isLoading = ref(true)

async function loadHistory() {
  isLoading.value = true
  try {
    history.value = await fetchAirQualityHistory(props.provinceId, 24)
  } catch (err) {
    console.error('Failed to load history:', err)
  } finally {
    isLoading.value = false
  }
}

const chartOption = ref({})

function buildChartOption() {
  const times = history.value.map((h) =>
    new Date(h.recordedAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
  )
  const pm25Values = history.value.map((h) => h.pm25)
  const aqiValues = history.value.map((h) => h.aqi)

  chartOption.value = {
    backgroundColor: 'transparent',
    textStyle: { color: '#ffffffcc' },
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['PM2.5', 'AQI'],
      textStyle: { color: '#ffffffaa' },
      top: 0,
    },
    grid: { left: 40, right: 20, top: 40, bottom: 30 },
    xAxis: {
      type: 'category',
      data: times,
      axisLine: { lineStyle: { color: '#ffffff33' } },
      axisLabel: { color: '#ffffff66' },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#ffffff33' } },
      axisLabel: { color: '#ffffff66' },
      splitLine: { lineStyle: { color: '#ffffff11' } },
    },
    series: [
      {
        name: 'PM2.5',
        type: 'line',
        data: pm25Values,
        smooth: true,
        itemStyle: { color: '#4ade80' },
        areaStyle: { color: 'rgba(74, 222, 128, 0.1)' },
      },
      {
        name: 'AQI',
        type: 'line',
        data: aqiValues,
        smooth: true,
        itemStyle: { color: '#facc15' },
      },
    ],
  }
}

onMounted(async () => {
  await loadHistory()
  buildChartOption()
})

watch(
  () => props.provinceId,
  async () => {
    await loadHistory()
    buildChartOption()
  }
)
</script>

<template>
  <div class="rounded-2xl border border-glass-border bg-glass-light p-6 backdrop-blur-xl">
    <h3 class="mb-4 text-sm font-medium text-white/60">PM2.5 และ AQI ย้อนหลัง 24 ชั่วโมง</h3>

    <div v-if="isLoading" class="flex h-64 items-center justify-center">
      <p class="text-sm text-white/40">กำลังโหลดกราฟ...</p>
    </div>
    <div v-else-if="history.length === 0" class="flex h-64 items-center justify-center">
      <p class="text-sm text-white/40">ยังไม่มีข้อมูลย้อนหลังเพียงพอ</p>
    </div>
    <VChart v-else :option="chartOption" class="h-64 w-full" autoresize />
  </div>
</template>