import { useContext } from "react"
import { CarritoContext } from "../context/CarritoContext.js"

// Hook propio: cualquier componente hace
//   const { agregar, unidades } = useCarrito()
// y tiene acceso al carrito.
export function useCarrito() {
  const carrito = useContext(CarritoContext)
  if (!carrito) {
    throw new Error("useCarrito() tiene que usarse adentro de <CarritoProvider>")
  }
  return carrito
}
