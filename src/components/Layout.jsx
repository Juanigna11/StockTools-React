import { Outlet } from "react-router"
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"
import ScrollToTop from "./ScrollToTop.jsx"

// Antes: el mismo <header> y <footer> copiados en 4 archivos HTML.
// Ahora: se escriben UNA vez acá, y <Outlet /> es el "hueco"
// donde React Router pone la página de la ruta actual.
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
