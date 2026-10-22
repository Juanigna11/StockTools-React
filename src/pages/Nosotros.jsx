import { Link } from "react-router"
import { marcas } from "../data/marcas.js"
import Gallery from "../components/Gallery.jsx"
import "../styles/pages/nosotros.css"

// ===== Datos de la página =====
const estadisticas = [
  { valor: "+3.200", texto: "productos en catálogo" },
  { valor: "+600",   texto: "ferreterías clientas" },
  { valor: "8",      texto: "marcas líderes" },
  { valor: "48hs",   texto: "entrega CABA/GBA" },
]

const soluciones = [
  { icono: "fa-boxes-stacked",     titulo: "Venta mayorista y minorista", texto: "Listas de precios por volumen, actualizadas todos los meses, y compras chicas cuando solo necesitás reponer." },
  { icono: "fa-screwdriver-wrench", titulo: "Asesoramiento técnico",      texto: "Te ayudamos a elegir la herramienta, el accesorio o el consumible correcto para cada trabajo y cada cliente." },
  { icono: "fa-arrows-rotate",     titulo: "Reposición programada",       texto: "Definimos juntos tu stock crítico (mechas, discos, fijaciones) y lo reponemos antes de que se note el faltante." },
  { icono: "fa-truck-fast",        titulo: "Envíos a todo el país",       texto: "Entrega en 48hs en CABA y GBA, y despachos por transporte al resto del país con seguimiento." },
  { icono: "fa-shield-halved",     titulo: "Garantía y postventa",        texto: "Si algo falla, lo gestionamos nosotros con la marca. Vos no perdés tiempo ni al cliente." },
  { icono: "fa-store",             titulo: "Armado de surtido",           texto: "Te sugerimos qué exhibir según tu zona y tu público, para que el mostrador venda solo." },
]

const pasos = [
  { titulo: "Te escuchamos",          texto: "Nos contás qué vendés, a qué público y cuáles son los productos que más te piden." },
  { titulo: "Analizamos tu rotación", texto: "Revisamos qué se mueve y qué queda parado, para que tu plata no esté inmovilizada en stock." },
  { titulo: "Armamos la propuesta",   texto: "Un presupuesto a medida, con marcas y precios según tu margen y tu tipo de cliente." },
  { titulo: "Te acompañamos",         texto: "Reposición, novedades de las marcas y seguimiento: seguimos ahí después de la primera compra." },
]

const galeria = [
  { src: "/assets/7863051-1-amoladora-angular-bosch-9-pulgadas-gws-20-230-2000w-02f5c21ff429ed893715955344651538-640-0.jpg", alt: "Amoladora angular Bosch" },
  { src: "/assets/638434286704555462.webp", alt: "Línea de herramientas Ronix" },
  { src: "/assets/images (5).jpeg", alt: "Set de herramientas Total" },
  { src: "/assets/images (2).jpeg", alt: "Organizadores Milwaukee Packout" },
  { src: "/assets/images (4).jpeg", alt: "Amoladora inalámbrica Milwaukee" },
  { src: "/assets/images (6).jpeg", alt: "Taladro inalámbrico Total" },
  { src: "/assets/images (7).jpeg", alt: "Juego de llaves combinadas Total" },
  { src: "/assets/images (1).jpeg", alt: "Herramienta Barovo" },
]

export default function Nosotros() {
  return (
    <>
      <title>StockTools - Nosotros</title>

      {/* 1. Quiénes somos */}
      <section className="nos-section">
        <div className="wrap">
          <div className="nos-intro">
            <div>
              <span className="eyebrow">Nosotros</span>
              <h1>No vendemos cajas. <span className="accent">Resolvemos tu mostrador.</span></h1>
              <p>
                StockTools nació para que las ferreterías y corralones tengan un proveedor que
                entienda su negocio: qué rota, qué se pide por temporada y qué no puede faltar
                nunca en la góndola.
              </p>
              <p>
                Trabajamos con marcas profesionales, te acercamos las novedades y respaldamos
                cada venta con garantía. Desde una caja de tornillos hasta el equipamiento
                completo de un local.
              </p>
            </div>
            <div className="nos-intro-img">
              <img src="/assets/images (3).jpeg" alt="Exhibición de herramientas y organizadores" />
            </div>
          </div>
          <div className="nos-stats">
            {estadisticas.map((e) => (
              <div key={e.texto}><strong>{e.valor}</strong><span>{e.texto}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Marcas: el mismo array que usa el Inicio */}
      <section className="nos-section nos-marcas">
        <div className="wrap">
          <span className="eyebrow">Marcas que trabajamos</span>
          <h2 className="nos-titulo">De la línea industrial a la de uso hogareño</h2>
          <p className="nos-sub">
            Elegimos marcas con repuestos, service y garantía, para que lo que vendés no te
            vuelva como reclamo. Tenemos opciones para el profesional que usa la herramienta
            todos los días y para el cliente que la necesita un fin de semana.
          </p>
          <div className="marcas-grid">
            {marcas.map((m) => (
              <div className="marcas" key={m.nombre}><img src={m.logo} alt={m.nombre} /></div>
            ))}
          </div>
          <p className="marcas-nota">// ¿Buscás una marca que no ves acá? Consultanos: la conseguimos.</p>
        </div>
      </section>

      {/* 3. Soluciones */}
      <section className="nos-section">
        <div className="wrap">
          <span className="eyebrow">Soluciones</span>
          <h2 className="nos-titulo">Todo lo que tu ferretería necesita, en un solo proveedor</h2>
          <div className="soluciones-grid">
            {soluciones.map((s) => (
              <article className="solucion" key={s.titulo}>
                <i className={`fa-solid ${s.icono}`}></i>
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Asesoramiento */}
      <section className="nos-section nos-asesoria">
        <div className="wrap asesoria-grid">
          <div>
            <span className="eyebrow">Asesoramiento</span>
            <h2 className="nos-titulo">Un asesor comercial que conoce tu negocio</h2>
            <p className="nos-sub">
              Cada cuenta tiene una persona asignada. No hablás con un bot ni con un call center:
              hablás con alguien que sabe qué compraste el mes pasado y qué te conviene ahora.
            </p>
            <div className="asesor-card">
              <p>
                "Nos ayudaron a ordenar el surtido de accesorios. Sacamos lo que no rotaba y
                sumamos lo que la gente venía a pedir."
              </p>
              <span>— Ferretería cliente, zona oeste</span>
            </div>
          </div>
          <ol className="pasos">
            {pasos.map((p) => (
              <li key={p.titulo}>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Galería */}
      <section className="nos-section">
        <div className="wrap">
          <span className="eyebrow">Catálogo</span>
          <h2 className="nos-titulo">Parte de lo que tenemos en stock</h2>
          {/* La galería ahora es un componente: le pasamos la lista por props */}
          <Gallery imagenes={galeria} />
        </div>
      </section>

      {/* 6. Llamado a la acción */}
      <section className="nos-cta">
        <div className="wrap">
          <h2>¿Querés que tu ferretería no se quede nunca sin stock?</h2>
          <div className="acciones">
            <Link to="/contacto" className="btn btn-dark">Hablar con un asesor</Link>
            <Link to="/productos" className="btn btn-light">Ver productos</Link>
          </div>
        </div>
      </section>
    </>
  )
}
