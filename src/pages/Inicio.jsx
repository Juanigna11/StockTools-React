import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { productos } from "../data/productos.js"
import { marcas } from "../data/marcas.js"
import ProductGrid from "../components/ProductGrid.jsx"
import { useCarrito } from "../hooks/useCarrito.js"
import { formatearPrecio, porcentajeDescuento } from "../utils/precios.js"
import "../styles/pages/hero.css"
import "../styles/pages/hero2.css"
import "../styles/pages/inicio.css"

// ===== Datos de la página =====
// En vez de repetir el HTML de cada ítem, armamos un array
// y lo recorremos con .map() en el JSX.
const sugerencias = ["Taladros", "Amoladoras", "Llaves", "Medición"]

const estadisticas = [
  { valor: "+3.200", texto: "productos" },
  { valor: "48hs",   texto: "entrega CABA/GBA" },
  { valor: "+600",   texto: "ferreterías clientas" },
]

const beneficios = [
  { icono: "fa-truck-fast",    titulo: "Envío gratis",     texto: "en compras desde $50.000" },
  { icono: "fa-credit-card",   titulo: "Hasta 12 cuotas",  texto: "sin interés con tarjeta" },
  { icono: "fa-shield-halved", titulo: "Garantía oficial", texto: "la gestionamos nosotros" },
  { icono: "fa-headset",       titulo: "Asesor asignado",  texto: "para cuentas mayoristas" },
]

const imagenesCategorias = {
  Taladros:      "/assets/taladro bosch.png",
  Amoladoras:    "/assets/images (4).jpeg",
  Llaves:        "/assets/images (7).jpeg",
  Sets:          "/assets/images (5).jpeg",
  Accesorios:    "/assets/taladro-bosch-3.png",
  Organizadores: "/assets/images (2).jpeg",
}

const beneficiosMayoristas = [
  "Lista de precios mayorista actualizada mensualmente",
  "Reposición programada de tu stock crítico",
  "Asesor comercial asignado a tu cuenta",
  "Facturación y logística para envíos recurrentes",
]

// ===== Cálculos (se hacen una vez, fuera del componente) =====
// Oferta de la semana: el producto con mayor % de descuento
const oferta = productos
  .filter((p) => p.precioAnterior)
  .sort((a, b) => porcentajeDescuento(b) - porcentajeDescuento(a))[0]

// Destacados: los productos marcados con destacado: true
const destacados = productos.filter((p) => p.destacado)

const contarPorCategoria = (categoria) =>
  productos.filter((p) => p.categoria === categoria).length

export default function Inicio() {
  // ===== Estado =====
  // useState guarda lo que el usuario escribe en el buscador.
  // Cada vez que cambia, React vuelve a dibujar el componente.
  const [busqueda, setBusqueda] = useState("")
  const navigate = useNavigate()
  const { agregar } = useCarrito()

  function buscar(evento) {
    evento.preventDefault()   // evita que el form recargue la página
    console.log("submit buscador:", busqueda)
    navigate(`/productos?q=${encodeURIComponent(busqueda.trim())}`)
  }

  return (
    <>
      {/* En React 19 el <title> se puede poner en cualquier componente */}
      <title>StockTools - Inicio</title>

      {/* 1. Portada */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="banda">Stock permanente · Envíos a todo el país</span>
            <h1>
              Lo que tu ferretería necesita, <span className="accent">siempre en stock.</span>
            </h1>
            <p className="hero-texto">
              Herramientas, fijaciones e insumos al por mayor y menor. Precios de fábrica,
              entrega rápida y el catálogo completo a un clic.
            </p>

            {/* Input "controlado": su valor viene del estado y onChange lo actualiza */}
            <form className="search-bar" role="search" onSubmit={buscar}>
              <input
                type="search"
                placeholder="Buscar taladros, tornillos, sierras…"
                aria-label="Buscar productos"
                value={busqueda}
                onChange={(e) => {
                  console.log("input:", e.target.value)
                  setBusqueda(e.target.value)
                }}
              />
              <button type="submit">Buscar</button>
            </form>

            <p className="hero-sugerencias">
              Lo más buscado:
              {sugerencias.map((texto) => (
                <Link key={texto} to={`/productos?q=${texto.toLowerCase()}`}>{texto}</Link>
              ))}
            </p>

            <div className="hero-stats">
              {estadisticas.map((e) => (
                <div key={e.texto}>
                  <strong>{e.valor}</strong>
                  <span>{e.texto}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Si no hay oferta, no se dibuja nada (renderizado condicional con &&) */}
          {oferta && (
            <aside className="oferta-semana" aria-label="Oferta de la semana">
              <span className="oferta-etiqueta">Oferta de la semana</span>
              <img src={oferta.imagen} alt={oferta.nombre} />
              <p className="oferta-nombre">{oferta.nombre}</p>
              <div className="oferta-precios">
                <s>{formatearPrecio(oferta.precioAnterior)}</s>
                <span className="off">{porcentajeDescuento(oferta)}% OFF</span>
              </div>
              <p className="oferta-precio">{formatearPrecio(oferta.precio)}</p>
              <button className="btn btn-accent" onClick={() => agregar(oferta, 1)}>
                Agregar al carrito
              </button>
            </aside>
          )}
        </div>
      </section>

      {/* 2. Beneficios */}
      <section className="ini-beneficios">
        <div className="wrap ini-beneficios-grid">
          {beneficios.map((b) => (
            <div key={b.titulo}>
              <i className={`fa-solid ${b.icono}`}></i>
              <p>
                <strong>{b.titulo}</strong>
                <span>{b.texto}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Categorías: la cantidad se calcula del catálogo */}
      <section className="ini-seccion">
        <div className="wrap">
          <div className="ini-encabezado">
            <div>
              <span className="eyebrow">Categorías</span>
              <h2 className="ini-titulo">¿Qué estás buscando?</h2>
            </div>
            <Link to="/productos" className="ini-ver-todo">Ver todo el catálogo →</Link>
          </div>
          <div className="ini-categorias">
            {Object.entries(imagenesCategorias).map(([categoria, imagen]) => {
              const cantidad = contarPorCategoria(categoria)
              return (
                <Link key={categoria} className="ini-categoria" to={`/productos?q=${encodeURIComponent(categoria)}`}>
                  <img src={imagen} alt="" loading="lazy" />
                  <strong>{categoria}</strong>
                  <span>{cantidad} {cantidad === 1 ? "producto" : "productos"}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Destacados: la MISMA grilla que en Productos, con otra lista */}
      <section className="ini-seccion ini-destacados">
        <div className="wrap">
          <div className="ini-encabezado">
            <div>
              <span className="eyebrow">Destacados</span>
              <h2 className="ini-titulo">Los que más salen del mostrador</h2>
            </div>
            <Link to="/productos" className="ini-ver-todo">Ver todos los productos →</Link>
          </div>
          <ProductGrid productos={destacados} />
        </div>
      </section>

      {/* 5. Mayoristas */}
      <section className="mayoristas">
        <div className="wrap mayoristas-grid">
          <div>
            <span>Cuentas mayoristas</span>
            <h2>Precios especiales para ferreterías y corralones</h2>
            <ul className="benefit-list">
              {beneficiosMayoristas.map((texto) => <li key={texto}>{texto}</li>)}
            </ul>
            <Link to="/contacto" className="btn btn-light">Quiero ser cliente mayorista</Link>
          </div>
          <div className="quote-card">
            <p>
              "Desde que compramos con Stock Tools nunca más nos quedamos sin mecha ni disco de
              corte. La reposición llega antes de que se note el faltante."
            </p>
            <span>— Ferretería El Tornillo Feliz, Córdoba</span>
          </div>
        </div>
      </section>

      {/* 6. Marcas */}
      <section className="ini-marcas">
        <div className="wrap">
          <p className="ini-marcas-titulo">Trabajamos con las marcas que tus clientes piden</p>
          <div className="ini-marcas-fila">
            {marcas.map((m) => (
              <img key={m.nombre} src={m.logo} alt={m.nombre} loading="lazy" />
            ))}
          </div>
          <Link to="/nosotros" className="ini-ver-todo">Conocé más sobre nosotros →</Link>
        </div>
      </section>
    </>
  )
}
