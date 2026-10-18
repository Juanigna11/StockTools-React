import { Link } from "react-router"

// Se muestra cuando la dirección no coincide con ninguna ruta (path="*")
export default function NoEncontrada() {
  return (
    <>
      <title>StockTools - Página no encontrada</title>
      <section className="no-encontrada wrap">
        <span className="eyebrow">Error 404</span>
        <h1>Esta página no está en stock</h1>
        <p>Puede que el link esté mal escrito o que la página ya no exista.</p>
        <Link to="/" className="btn btn-accent">Volver al inicio</Link>
      </section>
    </>
  )
}
