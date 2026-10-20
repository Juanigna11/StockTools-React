import { useEffect, useRef } from "react"
import { Link } from "react-router"
import { useCarrito } from "../hooks/useCarrito.js"
import { formatearPrecio } from "../utils/precios.js"
import { crearLinkWhatsapp } from "../utils/whatsapp.js"
import "../styles/pages/carrito.css"

// =====================================================
// <CartDrawer /> — el panel lateral del carrito.
// Usa <dialog>: el navegador ya trae el fondo oscuro, cerrar con Esc
// y mantener el foco adentro.
// =====================================================
export default function CartDrawer() {
  const { items, total, abierto, cerrar, cambiarCantidad, quitar, vaciar } = useCarrito()

  // useRef nos da acceso al elemento <dialog> real del DOM,
  // porque showModal() y close() son métodos del navegador, no de React.
  const dialogRef = useRef(null)

  // Sincronizamos el estado "abierto" con el <dialog>
  useEffect(() => {
    const dialog = dialogRef.current
    if (abierto && !dialog.open) dialog.showModal()
    if (!abierto && dialog.open) dialog.close()
  }, [abierto])

  // Clic en el fondo oscuro (fuera del contenido) → cerrar
  function clicEnDialog(evento) {
    if (evento.target === dialogRef.current) cerrar()
  }

  return (
    <dialog
      ref={dialogRef}
      className="carrito-panel"
      aria-labelledby="carritoTitulo"
      onClose={cerrar}          // se dispara también al cerrar con Esc
      onClick={clicEnDialog}
    >
      <div className="carrito-cabecera">
        <h2 id="carritoTitulo">Tu carrito</h2>
        <button className="carrito-cerrar" onClick={cerrar} aria-label="Cerrar carrito">✕</button>
      </div>

      <div className="carrito-lista">
        {items.length === 0 ? (
          <div className="carrito-vacio">
            <p>Tu carrito está vacío.</p>
            <Link to="/productos" className="btn btn-accent" onClick={cerrar}>Ver productos</Link>
          </div>
        ) : (
          items.map((item) => (
            <article className="carrito-item" key={item.id}>
              <img src={item.imagen} alt="" />
              <div className="carrito-item-info">
                <p className="carrito-item-nombre">{item.nombre}</p>
                <p className="carrito-item-precio">{formatearPrecio(item.precio * item.cantidad)}</p>
                <div className="carrito-item-cantidad">
                  <button onClick={() => cambiarCantidad(item.id, -1)} aria-label="Restar uno">−</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => cambiarCantidad(item.id, +1)} aria-label="Sumar uno">+</button>
                </div>
              </div>
              <button className="carrito-item-quitar" onClick={() => quitar(item.id)} aria-label={`Quitar ${item.nombre}`}>
                Quitar
              </button>
            </article>
          ))
        )}
      </div>

      {/* El pie solo aparece si hay productos */}
      {items.length > 0 && (
        <div className="carrito-pie">
          <div className="carrito-total">
            <span>Total</span>
            <strong>{formatearPrecio(total)}</strong>
          </div>
          <a className="carrito-whatsapp" href={crearLinkWhatsapp(items, total)} target="_blank" rel="noopener noreferrer">
            Enviar pedido por WhatsApp
          </a>
          <button className="carrito-vaciar" onClick={vaciar}>Vaciar carrito</button>
        </div>
      )}
    </dialog>
  )
}
