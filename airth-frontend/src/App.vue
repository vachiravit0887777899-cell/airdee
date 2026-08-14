<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue'
</script>

<template>
  <div id="app-root" class="relative min-h-screen bg-base-900">
    <Navbar />
    <router-view />
  </div>
</template>