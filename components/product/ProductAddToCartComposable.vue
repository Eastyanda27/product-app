<script setup lang="ts">
import { useProductCart } from '~/composables/useProductCart'

// Props dari parent (pastikan ID bertipe number agar cocok dengan CartItem)
const props = defineProps<{
  product: {
    id: number
    name: string
    price: number
    variant?: string
  }
}>()

// Gunakan composable keranjang
const { addItem, isInCart } = useProductCart()

// Event handler tambah ke keranjang
const handleAdd = () => {
  addItem(props.product)
}
</script>

<template>
  <button
  @click="handleAdd"
  :disabled="isInCart(props.product.id).value"
>
  Tambah ke Keranjang
</button>
</template>
