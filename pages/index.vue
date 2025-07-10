<script setup lang="ts">
import ProductCard from '~/components/product/ProductCard.vue'

interface ProductInterface {
  id: number
  name: string
  price: number
  image: string
  discount?: number
  variants?: Array<{ id: number; name: string; stock: number }>
}


const products = [
  {
    id: 1,
    name: 'Kaos Lengan Panjang',
    price: 159000,
    image: '/kaos.jpg',
    discount: 10,
    variants: [{ id: 1, name: 'L', stock: 3 }]
  },
  {
    id: 2,
    name: 'Kaos Polos Abu',
    price: 99000,
    image: '/kaos.jpg',
    discount: 5
  }
]

function handleAddToCart(product: ProductInterface) {
  console.log('Tambah ke keranjang:', product)
}

function handleViewDetail(id: number) {
  console.log('Klik produk:', id)
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      :showDiscount="true"
      layout="grid"
      :lazy="true"
      @add-to-cart="handleAddToCart"
      @view-detail="handleViewDetail"
    />
  </div>
</template>
