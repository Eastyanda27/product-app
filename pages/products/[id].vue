<script setup lang="ts">
// Ambil ID produk dari URL
const route = useRoute()
const id = route.params.id as string

// Ambil data produk dari API dummy
const { data: product } = await useProduct(id)

// ✅ Atur meta tag SEO dasar + OG / Twitter Cards
useSeoMeta({
  title: product.value?.name ?? 'Detail Produk',
  description: product.value?.description,
  ogTitle: product.value?.name,
  ogDescription: product.value?.description,
  ogImage: product.value?.image,
  ogUrl: `https://yourdomain.com/products/${id}`,
  twitterCard: 'summary_large_image',
  twitterTitle: product.value?.name,
  twitterDescription: product.value?.description,
  twitterImage: product.value?.image
})
</script>

<template>
  <section class="max-w-6xl mx-auto px-4 md:px-8 py-10">
    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      
      <!-- ✅ Optimized image with NuxtPicture -->
      <div class="bg-white rounded-xl overflow-hidden shadow-sm">
        <h3 class="text-sm text-gray-500 mb-2">Rendered with &lt;NuxtPicture&gt;</h3>
        <NuxtPicture
          :src="product.image"
          :alt="product.name"
          :width="600"
          :height="400"
          format="webp, avif, jpg"
          densities="1x 2x"
          class="w-full h-auto object-cover rounded-xl"
        />
      </div>

      <!-- ✅ Optimized image with NuxtImg -->
      <div class="bg-white rounded-xl overflow-hidden shadow-sm">
        <h3 class="text-sm text-gray-500 mb-2">Rendered with &lt;NuxtImg&gt;</h3>
        <NuxtImg
          :src="product.image"
          :alt="product.name"
          class="w-600 h-[350px] object-cover rounded-xl"
          format="webp"
          quality="75"
        />
      </div>
    </div>

    <!-- ✅ Detail Produk -->
    <div v-if="product" class="mt-10">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ product.name }}
      </h1>

      <p class="text-2xl text-green-600 font-semibold mt-2">
        Rp {{ product.price.toLocaleString('id-ID') }}
      </p>

      <p class="text-gray-700 leading-relaxed mt-4">
        {{ product.description }}
      </p>

      <div class="mt-6" v-if="product.variants">
        <ProductVariants :variants="product.variants" />
      </div>

      <div class="mt-4">
        <ProductAddToCart :product="product" />
      </div>
    </div>
    <div v-if="product?.id" class="mt-16 border-t pt-8">
      <h2 class="text-xl font-semibold mb-4">Ulasan Pembeli</h2>
      <ProductReviews :productId="product.id" />
    </div>
  </section>
</template>
