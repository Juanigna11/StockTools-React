import { useCarrito } from "../hooks/useCarrito.js"

// Aviso flotante ("toast") que aparece al agregar un producto.
// role="status" hace que los lectores de pantalla lo anuncien.
export default function AvisoCarrito() {
  const { aviso } = useCarrito()
  return (
    <div className={`carrito-aviso ${aviso ? "visible" : ""}`} role="status">
      {aviso && `✓ ${aviso}`}
    </div>
  )
}
