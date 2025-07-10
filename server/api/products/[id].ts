export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  return {
    id,
    name: 'Kaos Oversize Premium',
    description: 'Kaos cotton combed 30s. Nyaman, adem, dan cocok untuk aktivitas sehari-hari.',
    image: '/kaos.jpg',
    price: 129000,
    variants: ['M', 'L', 'XL']
  }
})
