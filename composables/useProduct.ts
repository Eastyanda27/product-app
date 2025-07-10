// Interface untuk tipe data produk
interface Product {
  id: string
  name: string
  description: string
  image: string
  price: number
  variants: string[]
}

// Composable untuk mengambil data produk dari API
export const useProduct = (id: string) => {
  return useFetch<Product>(`/api/products/${id}`, {
    // Transformasi: menambahkan properti harga terformat
    transform: (data) => ({
      ...data,
      formattedPrice: `Rp ${data.price.toLocaleString('id-ID')}`
    }),
    // Default: menghindari error saat produk belum tersedia
    default: () => ({
      id: '',
      name: '',
      description: '',
      image: '',
      price: 0,
      variants: []
    })
  })
}
