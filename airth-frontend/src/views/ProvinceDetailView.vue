<script setup lang="ts">
import { useRoute } from 'vue-router'
import AirQualityChart from '../components/charts/AirQualityChart.vue'
import ForecastChart from '../components/charts/ForecastChart.vue'
import WeatherForecast from '../components/dashboard/WeatherForecast.vue'

const route = useRoute()
const provinceId = route.params.id as string
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6">
    <h1 class="text-2xl font-bold text-white">รายละเอียดจังหวัด</h1>
    <p class="mt-1 text-sm text-white/40">{{ provinceId }}</p>

    <div class="mt-6 space-y-6">
      <AirQualityChart :province-id="provinceId" />
      <ForecastChart :province-id="provinceId" />
      <WeatherForecast :province-id="provinceId" />
    </div>
  </div>
</template>