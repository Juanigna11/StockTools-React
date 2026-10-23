import ContactForm from "../components/ContactForm.jsx"
import "../styles/pages/contacto.css"

const datosContacto = [
  { titulo: "📍 Depósito central",   texto: "Ruta 5, Km 34 — Córdoba, Argentina" },
  { titulo: "🕒 Atención",           texto: "Lun a Vie, 8 a 18 h" },
  { titulo: "💬 WhatsApp mayorista", texto: "+54 9 351 000-0000" },
]

// La página solo arma la estructura: título, formulario y datos de contacto.
// Toda la lógica del formulario (estado, validación, envío) está en <ContactForm />.
export default function Contacto() {
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
            <ContactForm />
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
