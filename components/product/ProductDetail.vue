<script setup lang="ts">
// ✅ Define props dengan TypeScript agar lebih aman
const props = defineProps<{
  product: {
    id: number
    name: string
    image: string
    description: string
    formattedPrice: string
    discount?: number
  }
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
    <div class="bg-white rounded-xl overflow-hidden shadow-sm">
      <NuxtImg
        :src="product.image"
        :alt="product.name"
        class="w-full h-[350px] object-cover"
      />
    </div>

    <div class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ product.name }}
      </h1>

      <!-- Harga & Diskon -->
      <div class="flex items-center gap-4">
        <p class="text-2xl text-green-600 font-semibold">
          {{ product.formattedPrice }}
        </p>
        <span
          v-if="product.discount"
          class="bg-red-500 text-white text-sm px-2 py-1 rounded-full"
        >
          -{{ product.discount }}%
        </span>
      </div>

      <p class="text-gray-700 leading-relaxed">
        {{ product.description }}
      </p>
    </div>
  </div>
</template>
