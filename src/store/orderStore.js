import { create } from "zustand"

export const useOrderStore = create((set) => ({
  // Initial products
  products: [
    { id: 1, name: "Huile d'Olive Extra Vierge", price: 150, category: "Huile" },
    { id: 2, name: "Huile d'Olive Vierge", price: 100, category: "Huile" },
    { id: 3, name: "Olives Noires", price: 80, category: "Olives" },
    { id: 4, name: "Olives Vertes", price: 70, category: "Olives" },
    { id: 5, name: "Savon à l'Huile d'Olive", price: 50, category: "Savon" },
  ],

  // Initial orders
  orders: [
    {
      id: 1,
      customerName: "Ahmed Hassan",
      phone: "0612345678",
      items: [
        { productId: 1, quantity: 2, price: 150 },
        { productId: 3, quantity: 1, price: 80 },
      ],
      status: "Pending",
      date: new Date().toISOString(),
    },
  ],

  // Add new order
  addOrder: (order) =>
    set((state) => ({
      orders: [
        ...state.orders,
        {
          ...order,
          id: Math.max(...state.orders.map((o) => o.id), 0) + 1,
          date: new Date().toISOString(),
        },
      ],
    })),

  // Update order status
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) => (order.id === orderId ? { ...order, status } : order)),
    })),

  // Delete order
  deleteOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== orderId),
    })),

  // Add product
  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        {
          ...product,
          id: Math.max(...state.products.map((p) => p.id), 0) + 1,
        },
      ],
    })),

  // Update product
  updateProduct: (productId, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, ...updatedProduct } : product,
      ),
    })),

  // Delete product
  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),

  // Get order by ID
  getOrderById: (orderId) =>
    set((state) => {
      const order = state.orders.find((o) => o.id === Number.parseInt(orderId))
      return { currentOrder: order }
    }),
}))
