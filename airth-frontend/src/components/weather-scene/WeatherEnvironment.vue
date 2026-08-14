<script setup lang="ts">
import { computed } from 'vue'
import CleanSkyScene from './CleanSkyScene.vue'
import LightHazeScene from './LightHazeScene.vue'
import DustScene from './DustScene.vue'
import HeavyPollutionScene from './HeavyPollutionScene.vue'
import { resolveScene, isNightTime } from '../../composables/useWeatherScene'

const props = defineProps<{
  pm25: number
  isRaining?: boolean
}>()

const scene = computed(() =>
  resolveScene({
    pm25: props.pm25,
    isRaining: props.isRaining ?? false,
    isNight: isNightTime(),
  })
)
</script>

<template>
  <Transition name="scene-fade" mode="out-in">
    <CleanSkyScene v-if="scene === 'clean-sky' || scene === 'night'" key="clean" />
    <LightHazeScene v-else-if="scene === 'light-haze'" key="light-haze" />
    <DustScene v-else-if="scene === 'dust'" key="dust" />
    <HeavyPollutionScene v-else-if="scene === 'heavy-pollution' || scene === 'rain'" key="heavy" />
  </Transition>
</template>

<style scoped>
.scene-fade-enter-active,
.scene-fade-leave-active {
  transition: opacity 1.2s ease;
}
.scene-fade-enter-from,
.scene-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .scene-fade-enter-active,
  .scene-fade-leave-active {
    transition: none;
  }
}
</style>