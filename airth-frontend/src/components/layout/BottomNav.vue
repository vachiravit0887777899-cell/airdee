<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const emit = defineEmits<{
  openProvinceSelector: []
}>()

function goHome() {
  router.push('/')
}

const isHome = () => route.path === '/'
</script>

<template>
  <nav
    aria-label="เมนูนำทางหลัก"
    class="fixed inset-x-0 bottom-0 z-40 border-t border-glass-border bg-base-900/90 backdrop-blur-xl sm:hidden"
  >
    <div class="flex items-center justify-around px-2 py-2">
      <button
        type="button"
        @click="goHome"
        :aria-current="isHome() ? 'page' : undefined"
        class="flex flex-col items-center gap-1 rounded-lg px-4 py-1.5 text-xs transition"
        :class="isHome() ? 'text-aqi-good' : 'text-white/50'"
      >
        <span aria-hidden="true" class="text-lg">🏠</span>
        หน้าแรก
      </button>

      <button
        type="button"
        @click="emit('openProvinceSelector')"
        class="flex flex-col items-center gap-1 rounded-lg px-4 py-1.5 text-xs text-white/50 transition"
      >
        <span aria-hidden="true" class="text-lg">📍</span>
        จังหวัด
      </button>
    </div>
  </nav>
</template>