<script setup lang="ts">
import { ref, computed } from 'vue'
import { provinces, regionLabel, type Region } from '../../data/provinces'
import ProvinceCard from './ProvinceCard.vue'

const emit = defineEmits<{
  select: [id: string]
  close: []
}>()

const searchQuery = ref('')

const regions: Region[] = ['north', 'northeast', 'central', 'east', 'west', 'south']

const filteredProvinces = computed(() => {
  if (!searchQuery.value.trim()) return provinces
  const q = searchQuery.value.trim().toLowerCase()
  return provinces.filter(
    (p) => p.nameTh.includes(q) || p.nameEn.toLowerCase().includes(q)
  )
})

function provincesByRegion(region: Region) {
  return filteredProvinces.value.filter((p) => p.region === region)
}

function handleSelect(id: string) {
  emit('select', id)
  emit('close')
}
</script>

<template>
  <div
    role="dialog"
    aria-label="เลือกจังหวัด"
    class="fixed inset-0 z-[2000] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <div
      class="mt-16 w-full max-w-3xl rounded-2xl border border-glass-border bg-base-900 p-6"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-white">เลือกจังหวัด</h2>
        <button
          type="button"
          aria-label="ปิด"
          @click="emit('close')"
          class="rounded-full px-3 py-1 text-white/60 hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
      </div>

      <input
        v-model="searchQuery"
        type="text"
        placeholder="ค้นหาจังหวัด..."
        aria-label="ค้นหาจังหวัด"
        class="mt-4 w-full rounded-xl border border-glass-border bg-white/5 px-4 py-2 text-white placeholder-white/30 outline-none focus:border-aqi-good"
      />

      <div class="mt-6 max-h-[60vh] space-y-6 overflow-y-auto">
        <div v-for="region in regions" :key="region">
          <div v-if="provincesByRegion(region).length > 0">
            <h3 class="mb-3 text-sm font-medium text-white/60">
              {{ regionLabel[region] }}
            </h3>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ProvinceCard
                v-for="province in provincesByRegion(region)"
                :key="province.id"
                :province="province"
                @select="handleSelect"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>