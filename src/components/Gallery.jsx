import "../styles/components/Gallery.css"

// =====================================================
// <Gallery /> — galería de imágenes reutilizable.
//
// Antes la galería estaba escrita adentro de Nosotros.jsx.
// Ahora es un componente: recibe las imágenes por PROPS y se
// puede usar en cualquier página con otra lista distinta.
//
// Props:
//   imagenes → array de objetos { src, alt }
//
// Uso:
//   <Gallery imagenes={[{ src: "/assets/foto.jpg", alt: "Descripción" }]} />
// =====================================================
export default function Gallery({ imagenes = [] }) {
  // Si no llegan imágenes, no dibujamos nada
  if (imagenes.length === 0) return null

  return (
    <div className="gallery">
      {imagenes.map((imagen) => (
        // <figure> + <figcaption>: la forma semántica de una imagen con su descripción
        <figure className="gallery-item" key={imagen.src}>
          <img src={imagen.src} alt={imagen.alt} loading="lazy" />
          <figcaption>{imagen.alt}</figcaption>
        </figure>
      ))}
    </div>
  )
}
