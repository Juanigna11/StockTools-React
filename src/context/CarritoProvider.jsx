import { useEffect, useState } from "react"
import { CarritoContext } from "./CarritoContext.js"

const CLAVE_CARRITO = "stocktools-carrito"

// Lee el carrito guardado. Si no hay nada, o el texto está roto,
// o el navegador bloquea localStorage, arranca vacío.
function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO)
    return guardado ? JSON.parse(guardado) : []
  } catch {
    return []
  }
}

// =====================================================
// <CarritoProvider> envuelve toda la app (en main.jsx).
// Acá vive el ESTADO del carrito y las funciones para cambiarlo.
// Es lo mismo que hacía carrito.js, pero con useState:
// cada vez que cambia "items", React redibuja todo lo que lo usa
// (el contador del header, el panel, etc.). No hay que llamar a
// actualizarCarritoUI() a mano.
// =====================================================
export function CarritoProvider({ children }) {
  // Pasarle una FUNCIÓN a useState hace que se ejecute una sola vez,
  // al arrancar (no en cada render).
  const [items, setItems] = useState(leerCarritoGuardado)
  const [abierto, setAbierto] = useState(false)
  const [aviso, setAviso] = useState(null)

  // Cada vez que cambian los items, los guardamos en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items))
    } catch {
      // si no se puede guardar, el carrito igual funciona mientras la página esté abierta
    }
  }, [items])

  // Si el carrito cambia en OTRA pestaña, nos sincronizamos
  useEffect(() => {
    function sincronizar(evento) {
      if (evento.key === CLAVE_CARRITO) setItems(leerCarritoGuardado())
    }
    window.addEventListener("storage", sincronizar)
    return () => window.removeEventListener("storage", sincronizar)
  }, [])

  // El aviso flotante se borra solo a los 2,5 s
  useEffect(() => {
    if (!aviso) return
    const temporizador = setTimeout(() => setAviso(null), 2500)
    return () => clearTimeout(temporizador)
  }, [aviso])

  // ===== Acciones =====
  // Nunca modificamos "items" directamente: siempre creamos un array nuevo
  // (con map, filter o [...]) y se lo pasamos a setItems.
  function agregar(producto, cantidad = 1) {
    setItems((actuales) => {
      const existe = actuales.some((item) => item.id === producto.id)
      if (existe) {
        return actuales.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        )
      }
      const { id, nombre, precio, imagen } = producto
      return [...actuales, { id, nombre, precio, imagen, cantidad }]
    })
    setAviso(`${cantidad} × ${producto.nombre} agregado al carrito`)
  }

  function cambiarCantidad(id, diferencia) {
    setItems((actuales) =>
      actuales
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + diferencia } : item))
        .filter((item) => item.cantidad > 0)   // si llega a 0, se va
    )
  }

  const quitar = (id) => setItems((actuales) => actuales.filter((item) => item.id !== id))
  const vaciar = () => setItems([])

  // ===== Datos calculados =====
  const unidades = items.reduce((total, item) => total + item.cantidad, 0)
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  // Todo lo que ponemos en "value" queda disponible con useCarrito()
  const value = {
    items, unidades, total,
    agregar, cambiarCantidad, quitar, vaciar,
    abierto, abrir: () => setAbierto(true), cerrar: () => setAbierto(false),
    aviso,
  }

  // En React 19 el Context se usa directamente como componente (sin .Provider)
  return <CarritoContext value={value}>{children}</CarritoContext>
}
