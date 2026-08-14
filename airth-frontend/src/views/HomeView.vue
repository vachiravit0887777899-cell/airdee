<script setup lang="ts">
import { ref, onMounted } from 'vue'
import WeatherEnvironment from '../components/weather-scene/WeatherEnvironment.vue'
import DustParticleCanvas from '../components/weather-scene/DustParticleCanvas.vue'
import RainCanvas from '../components/weather-scene/RainCanvas.vue'
import AQICard from '../components/dashboard/AQICard.vue'
import WeatherCard from '../components/dashboard/WeatherCard.vue'
import RainCard from '../components/dashboard/RainCard.vue'
import ProvinceSelector from '../components/province/ProvinceSelector.vue'
import ThailandMap from '../components/map/ThailandMap.vue'
import { fetchAirQuality } from '../services/provinceService'
import { mockAirQuality } from '../data/mockAirQuality'
import type { AirQualityData } from '../types/airQuality'
import { requestUserLocation } from '../composables/useGeolocation'

const showSelector = ref(false)
const isLoading = ref(true)
const isLocating = ref(false)
const locationError = ref<string | null>(null)
const currentData = ref<AirQualityData>({ ...mockAirQuality })

async function loadProvince(id: string) {
  isLoading.value = true
  try {
    currentData.value = await fetchAirQuality(id)
  } catch (err) {
    console.error('Failed to load province data:', err)
  } finally {
    isLoading.value = false
  }
}

function handleSelectProvince(id: string) {
  loadProvince(id)
}

async function handleUseMyLocation() {
  isLocating.value = true
  locationError.value = null

  const result = await requestUserLocation()

  if (result.province) {
    await loadProvince(result.province.id)
  } else {
    const messages: Record<string, string> = {
      denied: 'คุณไม่ได้อนุญาตให้เข้าถึงตำแหน่ง',
      unavailable: 'ไม่สามารถระบุตำแหน่งได้ในขณะนี้',
      timeout: 'ใช้เวลานานเกินไปในการระบุตำแหน่ง',
      unsupported: 'เบราว์เซอร์นี้ไม่รองรับการระบุตำแหน่ง',
    }
    locationError.value = messages[result.error ?? 'unavailable']
  }

  isLocating.value = false
}

onMounted(() => {
  loadProvince('bangkok')
})
</script>
<template>
<WeatherEnvironment :pm25="currentData.pm25" />
  <DustParticleCanvas :pm25="currentData.pm25" />
  <RainCanvas :rainProbability="currentData.rainProbability" />

  <div class="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">
          {{ currentData.provinceName }}
        </h1>
        <p class="mt-1 text-sm text-white/40">
          อัปเดตล่าสุด: {{ new Date(currentData.updatedAt).toLocaleTimeString('th-TH') }}
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <button
          type="button"
          :disabled="isLocating"
          @click="handleUseMyLocation"
          class="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20 disabled:opacity-50"
        >
          {{ isLocating ? 'กำลังค้นหา...' : 'ใช้ตำแหน่งของฉัน' }}
        </button>
        <button
          type="button"
          @click="showSelector = true"
          class="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
        >
          เปลี่ยนจังหวัด
        </button>
        <router-link
          :to="`/province/${currentData.provinceId}`"
          class="rounded-full bg-aqi-good/90 px-4 py-2 text-sm font-medium text-base-950 transition hover:bg-aqi-good"
        >
          ดูรายละเอียด
        </router-link>
      </div>
    </div>

    <p v-if="locationError" class="mt-2 text-sm text-red-300">
      {{ locationError }}
    </p>

    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <AQICard :data="currentData" />
      <WeatherCard :data="currentData" />
      <RainCard :data="currentData" />
    </div>

    <div class="mt-8">
      <h2 class="mb-4 text-lg font-semibold text-white">แผนที่คุณภาพอากาศทั่วประเทศ</h2>
      <ThailandMap />
    </div>

    <ProvinceSelector
      v-if="showSelector"
      @select="handleSelectProvince"
      @close="showSelector = false"
    />
  </div>
</template>