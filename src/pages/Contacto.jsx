import { useState } from "react"
import "../styles/pages/contacto.css"

const datosContacto = [
  { titulo: "📍 Depósito central",   texto: "Ruta 5, Km 34 — Córdoba, Argentina" },
  { titulo: "🕒 Atención",           texto: "Lun a Vie, 8 a 18 h" },
  { titulo: "💬 WhatsApp mayorista", texto: "+54 9 351 000-0000" },
]

export default function Contacto() {
  // Guardamos si el formulario ya se envió, para mostrar el mensaje de gracias.
  const [enviado, setEnviado] = useState(false)

  function enviar(evento) {
    evento.preventDefault()
    const datos = Object.fromEntries(new FormData(evento.target))
    console.log("submit contacto:", datos)
    // Más adelante acá se mandarían los datos a un servidor (fetch).
    setEnviado(true)
    evento.target.reset()   // limpia los campos
  }

  return (
    <>
      <title>StockTools - Contacto</title>

      <section className="contacto">
        <div className="wrap contacto-grid">
          <div>
            <h2>Hablemos</h2>
            <p className="section-sub">
              Contanos qué necesita tu ferretería y te armamos un presupuesto a medida.
            </p>

            <form className="contact-form" onSubmit={enviar}>
             <div className="form-row">
  <input name="ferreteria" type="text" placeholder="Nombre de la ferretería" required />
  <input name="nombre" type="text" placeholder="Tu nombre" required />
</div>
<div className="form-row">
  <input name="email" type="email" placeholder="Email" required />
  <input name="telefono" type="tel" placeholder="Teléfono / WhatsApp" />
</div>
<textarea name="mensaje" placeholder="¿Qué productos estás buscando?" rows="4"></textarea>
              <button type="submit" className="btn btn-accent">Enviar consulta</button>

              {/* Renderizado condicional: solo aparece si enviado es true */}
              {enviado && (
                <p className="form-ok" role="status">¡Gracias! Te contactamos a la brevedad.</p>
              )}
            </form>
          </div>

          <div className="contact-info">
            {datosContacto.map((d) => (
              <div className="info-card" key={d.titulo}>
                <strong>{d.titulo}</strong>
                <span>{d.texto}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
