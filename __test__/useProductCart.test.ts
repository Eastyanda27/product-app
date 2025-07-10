/// <reference types="vitest" />
import { describe, it, expect, beforeEach } from 'vitest'
import { useProductCart } from '~/composables/useProductCart'

describe('useProductCart', () => {
  let cart: ReturnType<typeof useProductCart>

  beforeEach(() => {
    localStorage.clear()
    cart = useProductCart()
    cart.clearCart()
  })

  it('menambahkan item ke keranjang', () => {
    cart.addItem({ id: 1, name: 'Kaos', price: 100_000 }, 2)

    expect(cart.items.value.length).toBe(1)
    expect(cart.items.value[0].quantity).toBe(2)
  })

  it('menghitung total item dan harga dengan benar', () => {
    cart.addItem({ id: 1, name: 'Produk A', price: 100_000 }, 1)
    cart.addItem({ id: 2, name: 'Produk B', price: 50_000 }, 3)

    expect(cart.totalItems.value).toBe(4)
    expect(cart.totalPrice.value).toBe(250_000)
  })

  it('menghapus item dari keranjang', () => {
    cart.addItem({ id: 1, name: 'Topi', price: 80_000 })
    cart.removeItem(1)

    expect(cart.items.value.length).toBe(0)
  })

  it('update quantity item', () => {
    cart.addItem({ id: 2, name: 'Sepatu', price: 300_000 }, 1)
    cart.updateQuantity(2, 4)

    expect(cart.items.value[0].quantity).toBe(4)
  })

  it('cek item sudah ada di keranjang', () => {
    cart.addItem({ id: 3, name: 'Tas', price: 200_000 })
    expect(cart.isInCart(3).value).toBe(true)
    expect(cart.isInCart(999).value).toBe(false)
  })
})
