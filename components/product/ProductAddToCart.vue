<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

// ✅ Terima props produk dari parent
const props = defineProps<{
  product: {
    id: string
    name: string
    price: number
    image: string
  }
}>()

// ✅ Akses instance store keranjang
const cart = useCartStore()

// ✅ Handler tombol tambah ke keranjang
const handleAddToCart = () => {
  cart.addToCart(props.product)
}
</script>

<template>
  <!-- ✅ Tombol interaktif -->
  <button
    class="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow"
    @click="handleAddToCart"
  >
    Tambah ke Keranjang
  </button>
</template>
