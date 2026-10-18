import { useSearchParams } from "react-router"
import { productos } from "../data/productos.js"
import { formatearPrecio } from "../utils/precios.js"
import "../styles/pages/productos.css"

// Pasa a minúsculas y saca acentos: "medicion" encuentra "Medición"
const normalizar = (texto) =>
  texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")

export default function Productos() {
  // La búsqueda vive en la URL (?q=...). useSearchParams la lee y la escribe.
  // Ventaja: si recargás o compartís el link, la búsqueda se mantiene.
  const [searchParams, setSearchParams] = useSearchParams()
  const busqueda = searchParams.get("q") ?? ""

  function cambiarBusqueda(evento) {
    const texto = evento.target.value
    // replace: true → no llena el historial con una entrada por cada letra
    setSearchParams(texto ? { q: texto } : {}, { replace: true })
  }

  // No hace falta guardar "filtrados" en un estado: se CALCULA
  // a partir de la búsqueda cada vez que el componente se dibuja.
  const texto = normalizar(busqueda.trim())
  const filtrados = productos.filter((p) =>
    normalizar(p.nombre).includes(texto) ||
    normalizar(p.categoria).includes(texto) ||
    normalizar(p.marca).includes(texto)
  )

  return (
    <>
      <title>StockTools - Productos</title>

      <div className="productos-wrap">
        <div className="productos-encabezado">
          <h1 className="productos-titulo">Todos nuestros productos</h1>
          <div className="productos-busqueda">
            <input
              type="search"
              id="busqueda"
              placeholder="Buscar por nombre, marca o categoría…"
              aria-label="Buscar productos"
              value={busqueda}
              onChange={cambiarBusqueda}
            />
            <span className="productos-contador" aria-live="polite">
              {filtrados.length} {filtrados.length === 1 ? "producto" : "productos"}
            </span>
          </div>
        </div>

        {/* ⚠️ TEMPORAL: en el paso 4 esta lista se reemplaza por <ProductGrid /> con las cards */}
        {filtrados.length === 0 ? (
          <p className="sin-resultados">No se encontraron productos.</p>
        ) : (
          <ul className="lista-temporal">
            {filtrados.map((p) => (
              <li key={p.id}>
                <strong>{p.nombre}</strong> · {p.marca} · {formatearPrecio(p.precio)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
