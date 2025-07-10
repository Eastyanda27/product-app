// Composable untuk mengatur meta tag SEO berdasarkan data produk
export const useProductMeta = (product: Ref<any>) => {
  useSeoMeta({
    title: () => product.value.name,
    ogTitle: () => product.value.name,
    ogDescription: () => product.value.description,
    ogImage: () => product.value.image
  })
}
