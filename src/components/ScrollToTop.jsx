import { useEffect } from "react"
import { useLocation } from "react-router"

// En una SPA el navegador no recarga la página al cambiar de ruta,
// así que el scroll queda donde estaba. Este componente vuelve
// arriba cada vez que cambia la dirección (pathname).
// No dibuja nada: por eso devuelve null.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])   // se ejecuta solo cuando cambia pathname

  return null
}
