import { useState } from "react"
import ProductCard from "./ProductCard.jsx"

// =====================================================
// <ProductGrid /> — la versión React de crearGrillaProductos().
//
// Recibe la lista a mostrar y dibuja una <ProductCard /> por producto.
//
// Los FAVORITOS viven acá (en el padre) y no en cada card:
// si el buscador oculta una card y después vuelve a aparecer,
// la card se crea de nuevo y perdería su estado. La grilla, en cambio,
// sigue montada, así que acá el favorito se conserva.
// Esto en React se llama "levantar el estado" (lifting state up).
// =====================================================
export default function ProductGrid({ productos }) {
  // Set = conjunto de IDs marcados como favoritos
  const [favoritos, setFavoritos] = useState(new Set())

  function toggleFavorito(id) {
    // En React el estado NO se modifica directamente:
    // se crea una copia, se cambia la copia y se la pasa a setFavoritos.
    setFavoritos((anteriores) => {
      const nuevos = new Set(anteriores)
      nuevos.has(id) ? nuevos.delete(id) : nuevos.add(id)
      return nuevos
    })
  }

  if (productos.length === 0) {
    return <p className="sin-resultados">No se encontraron productos.</p>
  }

  return (
    <div className="grilla-productos">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          esFavorito={favoritos.has(producto.id)}
          onToggleFavorito={toggleFavorito}
        />
      ))}
    </div>
  )
}
