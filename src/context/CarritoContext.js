import { createContext } from "react"

// El Context es como un "canal" que atraviesa toda la app.
// El Provider (CarritoProvider.jsx) pone los datos del carrito en el canal,
// y cualquier componente los puede leer con useCarrito(),
// sin tener que pasarlos de padre a hijo por props.
export const CarritoContext = createContext(null)
