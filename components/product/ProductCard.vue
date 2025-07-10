<script setup lang="ts">
// ✅ TypeScript Interface untuk product
interface ProductInterface {
  id: number
  name: string
  price: number
  image: string
  discount?: number
  variants?: Array<{ id: number; name: string; stock: number }>
}

// ✅ Props dengan tipe yang sesuai dan eksplisit
const props = defineProps<{
  product: ProductInterface
  showDiscount: boolean
  layout: 'grid' | 'list'
  lazy: boolean
}>()

// ✅ Event yang akan di-emit keluar
const emit = defineEmits<{
  (e: 'add-to-cart', product: ProductInterface): void
  (e: 'view-detail', id: number): void
}>()

// ✅ Reactive flag untuk lazy loading
const isVisible = ref(!props.lazy)
const el = ref<HTMLElement | null>(null)

// ✅ Intersection Observer untuk lazy load gambar produk
onMounted(() => {
  if (!props.lazy || !el.value) return
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      isVisible.value = true
      observer.disconnect()
    }
  })
  observer.observe(el.value)
})

// ✅ Format harga dalam format Rupiah
const formattedPrice = computed(() =>
  `Rp ${props.product.price.toLocaleString('id-ID')}`
)
</script>

<template>
  <!-- ✅ Card produk yang clickable -->
  <div
    class="product-card"
    ref="el"
    @click="emit('view-detail', product.id)"
    :class="layout"
  >
    <!-- ✅ Suspense fallback untuk loading -->
    <Suspense>
      <template #default>
        <!-- ✅ Tampilkan isi produk jika sudah terlihat -->
        <div v-if="isVisible" class="card-inner">
          <img
            :src="product.image"
            :alt="product.name"
            class="product-image"
            loading="lazy"
          />
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">{{ formattedPrice }}</p>

            <!-- ✅ Tampilkan badge diskon jika aktif -->
            <span
              v-if="showDiscount && product.discount"
              class="badge-discount"
            >
              -{{ product.discount }}%
            </span>

            <!-- ✅ Tombol emit "add-to-cart" -->
            <button
              class="add-btn"
              @click.stop="emit('add-to-cart', product)"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
        <!-- ✅ Placeholder saat belum terlihat -->
        <div v-else class="loading">Memuat...</div>
      </template>

      <!-- ✅ Fallback Suspense -->
      <template #fallback>
        <div class="fallback">Loading produk...</div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
/* ✅ Komponen fleksibel dan responsive */
.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}
.product-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.card-inner {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
}
.product-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}
.product-name {
  font-weight: bold;
}
.product-price {
  color: green;
}
.badge-discount {
  background-color: crimson;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  width: fit-content;
}
.add-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
}
.add-btn:hover {
  background-color: #1d4ed8;
}

/* ✅ Layout mode "grid" dan "list" dari prop */
.grid {
  display: flex;
  flex-direction: column;
}
.list {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
