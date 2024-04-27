import { Product } from '@/payload-types'
import { create } from 'zustand'
import { getLocalStorage, updateLocalStorage } from '../utilities/updateLocalStorage'
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware'

export type CartItem = {
  product: Product
}

type CartState = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items:[],
      addItem: (product) =>
        set((state) => {
          // Agregar el nuevo item al estado
          const updatedItems = [...state.items, { product }]
          // Actualizar el local storage
          updateLocalStorage({ items: updatedItems })
          // Devolver el nuevo estado
          return { items: updatedItems }
        }),
      removeItem: (id) =>
        set((state) => {
          // Filtrar los items para remover el que coincide con el id
          const updatedItems = state.items.filter(
            (item) => item.product.id !== id
          )
          // Actualizar el local storage
          updateLocalStorage({ items: updatedItems })
          // Devolver el nuevo estado
          return { items: updatedItems }
        }),
      clearCart: () =>
        set(() => {
          // Limpiar el carrito
          const updatedItems: CartItem[] = []
          // Actualizar el local storage
          updateLocalStorage({ items: updatedItems })
          // Devolver el nuevo estado
          return { items: updatedItems }
        }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
