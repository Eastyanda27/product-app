import { defineStore } from 'pinia'

// ✅ Define store bernama 'cart'
export const useCartStore = defineStore('cart', {
  // ✅ State: Menyimpan daftar item keranjang
  state: () => ({
    items: [] as {
      id: string
      name: string
      price: number
      image: string
      quantity: number
    }[]
  }),

  // ✅ Action: Fungsi untuk manipulasi state
  actions: {
    // Menambahkan produk ke keranjang
    addToCart(product: any) {
      const existing = this.items.find(item => item.id === product.id)

      if (existing) {
        // Jika produk sudah ada, tambahkan quantity-nya
        existing.quantity += 1
      } else {
        // Jika belum ada, tambahkan produk baru ke keranjang
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        })
      }
    },

    // Menghapus item dari keranjang (optional, untuk 5e)
    removeFromCart(id: string) {
      this.items = this.items.filter(item => item.id !== id)
    },

    // Mengosongkan keranjang
    clearCart() {
      this.items = []
    }
  },

  // ✅ Getter: Fungsi turunan dari state
  getters: {
    // Total jumlah semua produk
    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),

    // Total harga semua item di keranjang
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }
})
