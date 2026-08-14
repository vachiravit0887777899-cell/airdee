<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { fetchForecast, type HourlyForecastItem } from '../../services/provinceService'

use([CanvasRenderer, LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent])

const props = defineProps<{
  provinceId: string
}>()

const hourly = ref<HourlyForecastItem[]>([])
const isLoading = ref(true)
const chartOption = ref({})

async function loadForecast() {
  isLoading.value = true
  try {
    const data = await fetchForecast(props.provinceId)
    hourly.value = data.hourly
    buildChartOption()
  } catch (err) {
    console.error('Failed to load forecast:', err)
  } finally {
    isLoading.value = false
  }
}

function buildChartOption() {
  const times = hourly.value.map((h) =>
    new Date(h.time).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
  )
  const temps = hourly.value.map((h) => h.temperature)
  const rainProbs = hourly.value.map((h) => h.rainProbability)

  chartOption.value = {
    backgroundColor: 'transparent',
    textStyle: { color: '#ffffffcc' },
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['อุณหภูมิ', 'โอกาสฝน'],
      textStyle: { color: '#ffffffaa' },
      top: 0,
    },
    grid: { left: 40, right: 40, top: 40, bottom: 30 },
    xAxis: {
      type: 'category',
      data: times,
      axisLine: { lineStyle: { color: '#ffffff33' } },
      axisLabel: { color: '#ffffff66' },
    },
    yAxis: [
      {
        type: 'value',
        name: '°C',
        position: 'left',
        axisLine: { lineStyle: { color: '#ffffff33' } },
        axisLabel: { color: '#ffffff66' },
        splitLine: { lineStyle: { color: '#ffffff11' } },
      },
      {
        type: 'value',
        name: '%',
        position: 'right',
        min: 0,
        max: 100,
        axisLine: { lineStyle: { color: '#ffffff33' } },
        axisLabel: { color: '#ffffff66' },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: 'อุณหภูมิ',
        type: 'line',
        yAxisIndex: 0,
        data: temps,
        smooth: true,
        itemStyle: { color: '#fb923c' },
      },
      {
        name: 'โอกาสฝน',
        type: 'bar',
        yAxisIndex: 1,
        data: rainProbs,
        itemStyle: { color: 'rgba(96, 165, 250, 0.4)' },
        barWidth: '60%',
      },
    ],
  }
}

onMounted(loadForecast)

watch(() => props.provinceId, loadForecast)
</script>

<template>
  <div class="rounded-2xl border border-glass-border bg-glass-light p-6 backdrop-blur-xl">
    <h3 class="mb-4 text-sm font-medium text-white/60">พยากรณ์ 24 ชั่วโมงข้างหน้า</h3>

    <div v-if="isLoading" class="flex h-64 items-center justify-center">
      <p class="text-sm text-white/40">กำลังโหลดพยากรณ์...</p>
    </div>
    <VChart v-else :option="chartOption" class="h-64 w-full" autoresize />
  </div>
</template>