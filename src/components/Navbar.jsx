import { Link, NavLink } from "react-router"
import { links } from "../data/navegacion.js"
import { useCarrito } from "../hooks/useCarrito.js"

// <Link> y <NavLink> reemplazan a <a href>: cambian de página
// SIN recargar el sitio. NavLink además le pone la clase "active"
// al link de la página actual (en general.css lo pintamos de verde).
export default function Navbar() {
  // Leemos del Context: cuando el carrito cambia, el Navbar se redibuja solo
  const { unidades, abrir } = useCarrito()

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src="/assets/logo.png" alt="StockTools - Inicio" />
        </Link>

        <ul className="nav-links">
          {links.map((link) => (
            // key: React la necesita para identificar cada elemento de una lista
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"}>
                {link.texto}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="btn-carrito-header"
          type="button"
          onClick={abrir}
          aria-label={`Abrir carrito (${unidades} ${unidades === 1 ? "unidad" : "unidades"})`}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path fill="currentColor" d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM1 2h3.27l.94 2H21a1 1 0 0 1 .96 1.27l-2.5 8.5A2 2 0 0 1 17.54 15H8.1l-1.1 2H19v2H7a2 2 0 0 1-1.75-2.97L6.6 13.6 3 4H1V2Zm6.16 4 2.18 7h8.2l2.06-7H7.16Z" />
          </svg>
          {/* El globito solo aparece si hay al menos una unidad */}
          {unidades > 0 && <span className="carrito-contador">{unidades}</span>}
        </button>

        <button className="iniciar-sesion" type="button">Iniciar sesión</button>
      </nav>
    </header>
  )
}
