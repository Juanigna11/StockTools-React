import { useState } from "react"
import "../styles/components/ContactForm.css"

// =====================================================
// <ContactForm /> — formulario de contacto con INPUTS CONTROLADOS.
//
// "Controlado" quiere decir que React es el dueño del valor:
//   - lo que se ve en cada input sale del estado  → value={form.nombre}
//   - cada tecla actualiza el estado              → onChange={actualizarCampo}
// Así en todo momento sabemos qué hay escrito, y podemos validar,
// contar caracteres o limpiar el formulario solo cambiando el estado.
// =====================================================

const VALORES_INICIALES = {
  ferreteria: "",
  nombre: "",
  email: "",
  telefono: "",
  mensaje: "",
}

const MAX_MENSAJE = 500

// Recibe los datos del formulario y devuelve un objeto con los errores.
// Si no hay errores, devuelve un objeto vacío {}.
function validar(form) {
  const errores = {}

  if (!form.ferreteria.trim()) errores.ferreteria = "Ingresá el nombre de la ferretería."
  if (!form.nombre.trim()) errores.nombre = "Ingresá tu nombre."

  if (!form.email.trim()) {
    errores.email = "Ingresá tu email."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errores.email = "El email no parece válido (ejemplo: nombre@correo.com)."
  }

  // El teléfono es opcional, pero si lo escriben tiene que tener al menos 8 números
  const soloNumeros = form.telefono.replace(/\D/g, "")
  if (form.telefono.trim() && soloNumeros.length < 8) {
    errores.telefono = "El teléfono tiene que tener al menos 8 números."
  }

  if (form.mensaje.trim().length < 10) {
    errores.mensaje = "Contanos un poco más (mínimo 10 caracteres)."
  }

  return errores
}

export default function ContactForm() {
  // ===== Estado =====
  const [form, setForm] = useState(VALORES_INICIALES)   // lo que hay escrito en cada campo
  const [errores, setErrores] = useState({})            // mensajes de error por campo
  const [enviado, setEnviado] = useState(false)         // para mostrar el "¡Gracias!"

  // Un solo manejador para TODOS los campos.
  // Usa el atributo "name" del input para saber qué propiedad actualizar:
  // [name]: value  →  si name es "email", queda { ...form, email: value }
  function actualizarCampo(evento) {
    const { name, value } = evento.target
    setForm((anterior) => ({ ...anterior, [name]: value }))

    // Si el campo tenía un error, lo borramos mientras el usuario lo corrige
    if (errores[name]) {
      setErrores((anteriores) => ({ ...anteriores, [name]: undefined }))
    }
    setEnviado(false)
  }

  function enviar(evento) {
    evento.preventDefault()

    const nuevosErrores = validar(form)
    setErrores(nuevosErrores)

    // Object.keys(...) devuelve los nombres de los campos con error
    if (Object.keys(nuevosErrores).length > 0) return

    console.log("submit contacto:", form)
    // Más adelante, acá se mandarían los datos a un servidor con fetch().
    setEnviado(true)
    setForm(VALORES_INICIALES)   // limpiar = volver al estado inicial
  }

  // Props comunes a cada campo, para no repetir lo mismo 5 veces
  const propsDeCampo = (name) => ({
    id: `contacto-${name}`,
    name,
    value: form[name],
    onChange: actualizarCampo,
    "aria-invalid": Boolean(errores[name]),
    "aria-describedby": errores[name] ? `error-${name}` : undefined,
  })

  // Muestra el error de un campo, si lo hay
  const mostrarError = (name) =>
    errores[name] && <p className="campo-error" id={`error-${name}`}>{errores[name]}</p>

  return (
    // noValidate: desactiva los globos del navegador; validamos nosotros con mensajes propios
    <form className="contact-form" onSubmit={enviar} noValidate>
      <div className="form-row">
        <div className="campo">
          <label htmlFor="contacto-ferreteria" className="visualmente-oculto">Nombre de la ferretería</label>
          <input {...propsDeCampo("ferreteria")} type="text" placeholder="Nombre de la ferretería *" autoComplete="organization" />
          {mostrarError("ferreteria")}
        </div>
        <div className="campo">
          <label htmlFor="contacto-nombre" className="visualmente-oculto">Tu nombre</label>
          <input {...propsDeCampo("nombre")} type="text" placeholder="Tu nombre *" autoComplete="name" />
          {mostrarError("nombre")}
        </div>
      </div>

      <div className="form-row">
        <div className="campo">
          <label htmlFor="contacto-email" className="visualmente-oculto">Email</label>
          <input {...propsDeCampo("email")} type="email" placeholder="Email *" autoComplete="email" />
          {mostrarError("email")}
        </div>
        <div className="campo">
          <label htmlFor="contacto-telefono" className="visualmente-oculto">Teléfono o WhatsApp</label>
          <input {...propsDeCampo("telefono")} type="tel" placeholder="Teléfono / WhatsApp" autoComplete="tel" />
          {mostrarError("telefono")}
        </div>
      </div>

      <div className="campo">
        <label htmlFor="contacto-mensaje" className="visualmente-oculto">¿Qué productos estás buscando?</label>
        <textarea {...propsDeCampo("mensaje")} placeholder="¿Qué productos estás buscando? *" rows="4" maxLength={MAX_MENSAJE} />
        {/* Contador en vivo: es posible porque el valor está en el estado */}
        <span className="campo-contador">{form.mensaje.length} / {MAX_MENSAJE}</span>
        {mostrarError("mensaje")}
      </div>

      <p className="campo-nota">* Campos obligatorios</p>

      <button type="submit" className="btn btn-accent">Enviar consulta</button>

      {/* Renderizado condicional: solo aparece si enviado es true */}
      {enviado && (
        <p className="form-ok" role="status">¡Gracias! Te contactamos a la brevedad.</p>
      )}
    </form>
  )
}
