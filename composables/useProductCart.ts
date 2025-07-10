interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  variant?: string
}

interface UseProductCartReturn {
  items: Ref<CartItem[]>
  totalItems: ComputedRef<number>
  totalPrice: ComputedRef<number>
  addItem: (product: any, quantity?: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  isInCart: (id: number) => ComputedRef<boolean>
}

// composables/useProductCart.ts
export const useProductCart = (): UseProductCartReturn => {
  const CART_KEY = 'product_cart'
  const items = ref<CartItem[]>([])

  // Load from localStorage saat composable dipanggil
  const loadCart = () => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) items.value = JSON.parse(stored)
    } catch (e) {
      console.error('Gagal load cart:', e)
    }
  }

  // Simpan ke localStorage setiap kali cart berubah
  watch(items, () => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items.value))
    } catch (e) {
      console.error('Gagal simpan cart:', e)
    }
  }, { deep: true })

  onMounted(loadCart)

  // Hitung total item & total harga
  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const addItem = (product: any, quantity = 1) => {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        variant: product.variant || undefined
      })
    }
  }

  const removeItem = (id: number) => {
    items.value = items.value.filter(item => item.id !== id)
  }

  const updateQuantity = (id: number, quantity: number) => {
    const item = items.value.find(i => i.id === id)
    if (item) item.quantity = quantity
  }

  const clearCart = () => {
    items.value = []
  }

  const isInCart = (id: number) => computed(() => items.value.some(i => i.id === id))

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart
  }
}