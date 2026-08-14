const CACHE_NAME = 'airdee-v1'
const OFFLINE_URL = '/offline.html'

const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]

// ติดตั้ง Service Worker และ cache ไฟล์สำคัญไว้ล่วงหน้า
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  )
  self.skipWaiting()
})

// ลบ cache เวอร์ชันเก่าทิ้งตอน activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// Strategy: Network first สำหรับ API, Cache first สำหรับ static assets
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // ไม่ cache API calls (ข้อมูล PM2.5 ต้องสดเสมอ ไม่ใช่ static content)
  if (url.pathname.startsWith('/api/')) {
    return
  }

  // Navigation requests (เปิดหน้าเว็บ) — ลอง network ก่อน ถ้าล้มเหลวใช้ offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL))
    )
    return
  }

  // Static assets อื่นๆ — cache first
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  )
})