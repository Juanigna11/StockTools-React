import { Routes, Route } from "react-router"
import Layout from "./components/Layout.jsx"
import Inicio from "./pages/Inicio.jsx"
import Nosotros from "./pages/Nosotros.jsx"
import Productos from "./pages/Productos.jsx"
import Contacto from "./pages/Contacto.jsx"
import NoEncontrada from "./pages/NoEncontrada.jsx"

// Mapa de rutas: qué componente se muestra para cada dirección.
// <Layout> no tiene path: es una "ruta de layout". Dibuja el header
// y el footer, y en el medio (<Outlet />) va la página que toque.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="productos" element={<Productos />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}
