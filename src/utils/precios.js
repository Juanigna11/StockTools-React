// Funciones de precios. Son JavaScript común (no son componentes):
// reciben datos y devuelven un resultado.

export const IVA = 0.21

export const formatearPrecio = (n) =>
  n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })

// Precio sin impuestos nacionales (simplificado: solo IVA)
export const precioSinImpuestos = (precio) => Math.round(precio / (1 + IVA))

export const porcentajeDescuento = (producto) =>
  Math.round((1 - producto.precio / producto.precioAnterior) * 100)
