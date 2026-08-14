<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import type L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { matchProvinceId } from '../../data/provinceGeoMapping'
import { fetchAllAirQuality, type BulkAirQualityItem } from '../../services/provinceService'
import { getColorFromPm25, getStatusFromPm25, statusLabelMap } from '../../utils/airQualityColor'

const router = useRouter()
const mapContainer = ref<HTMLDivElement | null>(null)
const isLoading = ref(true)
const loadError = ref(false)

const map = shallowRef<L.Map | null>(null)

function getPm25ById(data: BulkAirQualityItem[], id: string): number | null {
  const found = data.find((d) => d.provinceId === id)
  return found ? found.pm25 : null
}

async function initMap() {
  if (!mapContainer.value) return

  // Dynamic import — โหลด Leaflet เฉพาะตอนแผนที่จะถูกสร้างจริงๆ
  const leaflet = await import('leaflet')
  const L = leaflet.default

  map.value = L.map(mapContainer.value, {
    center: [13.7563, 100.5018],
    zoom: 6,
    minZoom: 5,
    maxZoom: 9,
    zoomControl: true,
    attributionControl: false,
  })

  try {
    const [geoRes, airData] = await Promise.all([
      fetch('/thailand-provinces.geojson').then((r) => r.json()),
      fetchAllAirQuality(),
    ])

    L.geoJSON(geoRes, {
      style: (feature) => {
        const provinceName = feature?.properties?.name ?? ''
        const provinceId = matchProvinceId(provinceName)
        const pm25 = provinceId ? getPm25ById(airData, provinceId) : null

        return {
          fillColor: getColorFromPm25(pm25),
          fillOpacity: 0.65,
          color: '#0a0e14',
          weight: 1,
        }
      },
      onEachFeature: (feature, layer) => {
        const provinceName = feature?.properties?.name ?? ''
        const provinceId = matchProvinceId(provinceName)
        const pm25 = provinceId ? getPm25ById(airData, provinceId) : null

        const tooltipContent =
          pm25 !== null
            ? `<strong>${provinceName}</strong><br/>PM2.5: ${pm25}<br/>สถานะ: ${statusLabelMap[getStatusFromPm25(pm25)]}`
            : `<strong>${provinceName}</strong><br/>ไม่มีข้อมูล`

        layer.bindTooltip(tooltipContent, { sticky: true })

        layer.on({
          mouseover: (e) => {
            const target = e.target as L.Path
            target.setStyle({ fillOpacity: 0.9, weight: 2 })
          },
          mouseout: (e) => {
            const target = e.target as L.Path
            target.setStyle({ fillOpacity: 0.65, weight: 1 })
          },
          click: () => {
            if (provinceId) {
              router.push(`/province/${provinceId}`)
            }
          },
        })
      },
    }).addTo(map.value)

    isLoading.value = false
  } catch (err) {
    console.error('Map load error:', err)
    loadError.value = true
    isLoading.value = false
  }
}

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
})
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl border border-glass-border">
    <div
      v-if="isLoading"
      class="absolute inset-0 z-[400] flex items-center justify-center bg-base-900/80 backdrop-blur-sm"
    >
      <p class="text-sm text-white/60">กำลังโหลดแผนที่...</p>
    </div>
    <div
      v-if="loadError"
      class="absolute inset-0 z-[400] flex items-center justify-center bg-base-900/80 backdrop-blur-sm"
    >
      <p class="text-sm text-red-300">ไม่สามารถโหลดแผนที่ได้ ลองรีเฟรชหน้าใหม่</p>
    </div>
    <div ref="mapContainer" class="h-[500px] w-full" style="background: #0a0e14" />
  </div>
</template>

<style>
.leaflet-tooltip {
  background: rgba(10, 14, 20, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: white !important;
  border-radius: 8px !important;
  padding: 8px 12px !important;
  font-size: 13px !important;
}
.leaflet-tooltip-top:before {
  border-top-color: rgba(10, 14, 20, 0.95) !important;
}
</style>