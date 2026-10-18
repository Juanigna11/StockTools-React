// =====================================================
// Catálogo de StockTools.
// Es el mismo array que en catalogo.js, pero ahora se EXPORTA:
// cualquier componente que lo necesite hace
//   import { productos } from "../data/productos"
//
// Las imágenes están en /public/assets, por eso las rutas
// empiezan con "/assets/...".
//
// precioAnterior: si existe, se muestra tachado con el % de descuento
// cuotas:         cuotas sin interés (0 = no ofrece)
// etiqueta:       cartelito opcional sobre la imagen
// stock:          unidades disponibles
// destacado:      true = aparece en el inicio
// =====================================================

export const productos = [
  { id: 1,  nombre: "Taladro percutor 700w",                 marca: "Bosch",        precio:  85000, precioAnterior:  95000, cuotas: 6,  stock: 24, categoria: "Taladros",      imagen: "/assets/taladro bosch.png", etiqueta: "Más vendido", destacado: true },
  { id: 2,  nombre: 'Amoladora angular 9" 2000w',            marca: "Bosch",        precio:  72000, precioAnterior:  84000, cuotas: 6,  stock: 15, categoria: "Amoladoras",    imagen: "/assets/7863051-1-amoladora-angular-bosch-9-pulgadas-gws-20-230-2000w-02f5c21ff429ed893715955344651538-640-0.jpg", destacado: true },
  { id: 3,  nombre: "Llave de impacto inalámbrica 380Nm con valija", marca: "Barovo", precio:  91000,                          cuotas: 12, stock: 4,  categoria: "Llaves",        imagen: "/assets/60765545_tmpmcrssycc.jpg.1600x0_q85_crop-smart.jpg", etiqueta: "Nuevo", destacado: true },
  { id: 4,  nombre: "Carro de herramientas 198 piezas",      marca: "Barovo",       precio:  64000, precioAnterior:  72000, cuotas: 12, stock: 9,  categoria: "Sets",          imagen: "/assets/dgpi-167p-11-49a292b5a152198ecf16845835143387-480-0.webp" },
  { id: 5,  nombre: "Set de puntas y mechas X-Line 33 piezas", marca: "Bosch",      precio:  18000,                          cuotas: 3,  stock: 60, categoria: "Accesorios",    imagen: "/assets/taladro-bosch-3.png" },
  { id: 6,  nombre: "Sierra circular 1400w",                 marca: "Makita",       precio:  97000,                          cuotas: 12, stock: 7,  categoria: "Sierras",       imagen: "/assets/taladro bosch.png" },
  { id: 7,  nombre: "Nivel láser autonivelante",             marca: "Bosch",        precio:  43000,                          cuotas: 6,  stock: 12, categoria: "Medición",      imagen: "/assets/taladro bosch.png" },
  { id: 8,  nombre: "Lijadora orbital 300w",                 marca: "Black+Decker", precio:  38000, precioAnterior:  42000, cuotas: 3,  stock: 18, categoria: "Lijadoras",     imagen: "/assets/taladro bosch.png" },
  { id: 9,  nombre: "Cutter profesional 18mm",               marca: "Total",        precio:   9500,                          cuotas: 0,  stock: 80, categoria: "Accesorios",    imagen: "/assets/taladro bosch.png" },
  { id: 10, nombre: "Compresor 50L 2HP",                     marca: "Ronix",        precio: 130000, precioAnterior: 149000, cuotas: 12, stock: 3,  categoria: "Compresores",   imagen: "/assets/taladro bosch.png" },
  { id: 11, nombre: "Martillo demoledor 1500w",              marca: "DeWalt",       precio: 115000,                          cuotas: 12, stock: 5,  categoria: "Demolición",    imagen: "/assets/taladro bosch.png" },
  { id: 12, nombre: "Cinta métrica 8m",                      marca: "Stanley",      precio:   7200,                          cuotas: 0,  stock: 95, categoria: "Medición",      imagen: "/assets/taladro bosch.png" },
  { id: 13, nombre: "Taladro atornillador inalámbrico con valija", marca: "Total",  precio:  79000, precioAnterior:  89000, cuotas: 6,  stock: 11, categoria: "Taladros",      imagen: "/assets/images (6).jpeg", destacado: true },
  { id: 14, nombre: "Maletín de herramientas 120 piezas",    marca: "Total",        precio:  56000,                          cuotas: 6,  stock: 14, categoria: "Sets",          imagen: "/assets/images (5).jpeg" },
  { id: 15, nombre: "Juego de llaves combinadas 8 piezas",   marca: "Total",        precio:  21000,                          cuotas: 3,  stock: 40, categoria: "Llaves",        imagen: "/assets/images (7).jpeg" },
  { id: 16, nombre: "Amoladora inalámbrica M18 Fuel",        marca: "Milwaukee",    precio: 189000,                          cuotas: 12, stock: 2,  categoria: "Amoladoras",    imagen: "/assets/images (4).jpeg", etiqueta: "Profesional" },
  { id: 17, nombre: "Organizador Packout con ruedas",        marca: "Milwaukee",    precio: 145000,                          cuotas: 12, stock: 6,  categoria: "Organizadores", imagen: "/assets/images (2).jpeg" },
]
