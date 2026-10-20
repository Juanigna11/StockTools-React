import { useEffect, useState } from "react"
import { formatearPrecio, porcentajeDescuento, precioSinImpuestos } from "../utils/precios.js"
import { ENVIO_GRATIS_DESDE, POCAS_UNIDADES } from "../data/reglas.js"
import { useCarrito } from "../hooks/useCarrito.js"
import "../styles/components/ProductCard.css"

// =====================================================
// <ProductCard /> — la versión React de crearCard().
//
// ANTES (JS común):  crearCard(producto, { esFavorito, cantidad })
//                    devolvía un STRING de HTML que pegábamos con innerHTML.
// AHORA (React):     <ProductCard producto={...} esFavorito={...} onToggleFavorito={...} />
//                    Los datos entran como PROPS y la card devuelve JSX.
//
// Props:
//   producto          → el objeto del catálogo
//   esFavorito        → true / false (lo decide el componente padre)
//   onToggleFavorito  → función del padre para marcar / desmarcar
// =====================================================
export default function ProductCard({ producto, esFavorito, onToggleFavorito }) {
  // ===== Estado propio de cada card =====
  // Cada card tiene SU cantidad. Antes guardábamos todas en un objeto
  // { id: cantidad }; ahora React le da a cada card su propia "cajita".
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

  // Del carrito solo necesitamos la función agregar
  const { agregar: agregarAlCarrito } = useCarrito()

  // Cuando "agregado" pasa a true, a los 1,5 s lo volvemos a false.
  // La función que devuelve el efecto (cleanup) cancela el temporizador
  // si la card desaparece antes, para no actualizar algo que ya no existe.
  useEffect(() => {
    if (!agregado) return
    const temporizador = setTimeout(() => setAgregado(false), 1500)
    return () => clearTimeout(temporizador)
  }, [agregado])

  // ===== Datos calculados (no son estado: salen de las props) =====
  const tieneDescuento = Boolean(producto.precioAnterior)
  const envioGratis = producto.precio >= ENVIO_GRATIS_DESDE
  const quedanPocas = producto.stock <= POCAS_UNIDADES

  // ===== Acciones =====
  const sumar = () => setCantidad((c) => Math.min(producto.stock, c + 1))   // tope: el stock
  const restar = () => setCantidad((c) => Math.max(1, c - 1))

  function agregar() {
    agregarAlCarrito(producto, cantidad)
    setAgregado(true)
    setCantidad(1)
  }

  return (
    <article className="card">
      <div className="card-media">
        {/* Renderizado condicional con &&: si no hay cuotas, no se dibuja */}
        {producto.cuotas > 0 && (
          <span className="badge-cuotas">
            <small>Hasta</small>
            <strong>{producto.cuotas}</strong>
            <small>cuotas<br />sin interés</small>
          </span>
        )}

        <button
          className={`btn-favorito ${esFavorito ? "activo" : ""}`}
          onClick={() => onToggleFavorito(producto.id)}
          aria-label={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          aria-pressed={esFavorito}
        >
          {esFavorito ? "♥" : "♡"}
        </button>

        <img src={producto.imagen} alt={producto.nombre} loading="lazy" />

        {producto.etiqueta && <span className="badge-etiqueta">{producto.etiqueta}</span>}
      </div>

      <div className="card-info">
        <span className="categoria">{producto.categoria}</span>
        <p className="nombre">{producto.nombre}</p>
        <p className="marca">Marca <strong>{producto.marca}</strong></p>

        <div className="precio-anterior">
          {tieneDescuento && (
            <>
              <s>{formatearPrecio(producto.precioAnterior)}</s>
              <span className="off">{porcentajeDescuento(producto)}% OFF</span>
            </>
          )}
        </div>
        <p className="precio">{formatearPrecio(producto.precio)}</p>
        <p className="precio-sin-imp">
          Precio s/imp. nac. {formatearPrecio(precioSinImpuestos(producto.precio))}
        </p>

        <div className="card-chips">
          <span className="chip">¡Retiralo hoy!</span>
          {/* Ternario: muestra una cosa u otra */}
          {envioGratis
            ? <span className="chip chip-fuerte">Envío GRATIS</span>
            : <span className="chip">Envío en 48hs</span>}
          {quedanPocas && <span className="chip chip-alerta">¡Últimas {producto.stock}!</span>}
        </div>
      </div>

      <div className="card-acciones">
        <div className="selector-cantidad">
          <button onClick={restar} disabled={cantidad === 1} aria-label="Restar cantidad">−</button>
          <span className="cantidad">{cantidad}</span>
          <button onClick={sumar} disabled={cantidad === producto.stock} aria-label="Sumar cantidad">+</button>
        </div>
        <button className={`btn-carrito ${agregado ? "agregado" : ""}`} onClick={agregar}>
          {agregado ? "✓ Agregado" : "Agregar al carrito"}
        </button>
      </div>
    </article>
  )
}
