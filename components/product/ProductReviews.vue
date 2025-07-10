<script setup lang="ts">
const props = defineProps<{
  productId: string | number
}>()

const reviews = ref([
  {
    id: 1,
    name: 'Rudi Hartono',
    comment: 'Produk bagus, pengiriman cepat!',
    rating: 5
  },
  {
    id: 2,
    name: 'Ayu Wulandari',
    comment: 'Bahan nyaman, sesuai deskripsi.',
    rating: 4
  }
])

</script>

<template>
  <div class="bg-gray-50 p-6 rounded-xl shadow-sm">
    <h2 class="text-xl font-semibold mb-4">Ulasan Pembeli</h2>

    <div v-if="reviews.length > 0" class="space-y-4">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="bg-white p-4 rounded-lg border"
      >
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-medium">{{ review.name }}</h3>
          <span class="text-yellow-500 text-sm">
            ⭐ {{ review.rating }}/5
          </span>
        </div>
        <p class="text-gray-700 text-sm">{{ review.comment }}</p>
      </div>
    </div>

    <div v-else class="text-gray-500 text-sm italic">
      Belum ada ulasan untuk produk ini.
    </div>
  </div>
</template>
