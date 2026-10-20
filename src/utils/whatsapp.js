import { formatearPrecio } from "./precios.js"
import { TELEFONO_WHATSAPP } from "../data/reglas.js"

// Arma el texto del pedido y lo convierte en un link de WhatsApp.
// encodeURIComponent() pasa espacios, saltos de línea y símbolos a formato URL.
export function crearLinkWhatsapp(items, total) {
  const lineas = items.map(
    (i) => `• ${i.cantidad} × ${i.nombre} — ${formatearPrecio(i.precio * i.cantidad)}`
  )
  const mensaje = [
    "Hola muchachos y muchachas! Quiero hacer este pedido:",
    "",
    ...lineas,
    "",
    `Total: ${formatearPrecio(total)}`,
  ].join("\n")
  return `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`
}
