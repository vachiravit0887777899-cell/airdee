<script setup lang="ts">
import { useRoute } from 'vue-router'
import { provinces } from '../data/provinces'
import AirQualityChart from '../components/charts/AirQualityChart.vue'
import ForecastChart from '../components/charts/ForecastChart.vue'
import WeatherForecast from '../components/dashboard/WeatherForecast.vue'

const route = useRoute()
const provinceId = route.params.id as string

const provinceNameTh = provinces.find((p) => p.id === provinceId)?.nameTh ?? provinceId
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <h1 class="text-2xl font-bold text-white">รายละเอียดจังหวัด</h1>
      <span
        class="rounded-full border border-glass-border bg-glass-light px-4 py-1.5 text-lg font-semibold text-aqi-good"
      >
        {{ provinceNameTh }}
      </span>
    </div>

    <div class="mt-6 space-y-6">
      <AirQualityChart :province-id="provinceId" />
      <ForecastChart :province-id="provinceId" />
      <WeatherForecast :province-id="provinceId" />
    </div>
  </div>
</template>