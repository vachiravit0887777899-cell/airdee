<script setup lang="ts">
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-glass-border bg-base-900/70 backdrop-blur-xl"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
      <!-- โลโก้ / ชื่อแอป — คลิกแล้วกลับหน้าหลัก -->
      <router-link
        to="/"
        class="flex items-center gap-2 rounded-lg transition hover:opacity-80"
      >
        <span
          class="text-xl font-semibold tracking-tight text-white"
          aria-label="AirDee - ตรวจสอบคุณภาพอากาศประเทศไทย - กลับหน้าหลัก"
        >
          Air<span class="text-aqi-good">Dee</span>
        </span>
      </router-link>

      <!-- ที่ว่างสำหรับปุ่มเลือกจังหวัด / ปุ่มใช้ตำแหน่งฉัน จะเพิ่มใน STEP 5 -->
      <nav aria-label="เมนูหลัก" class="flex items-center gap-3">
        <!-- placeholder -->
      </nav>
    </div>
  </header>
</template>