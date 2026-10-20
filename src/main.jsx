import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import App from "./App.jsx"
import { CarritoProvider } from "./context/CarritoProvider.jsx"
import "./styles/general.css"

// <BrowserRouter> envuelve toda la app para que funcionen
// las rutas, <Link>, <NavLink> y los hooks como useNavigate().
// <CarritoProvider> pone el carrito a disposición de TODOS los componentes.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </BrowserRouter>
  </StrictMode>,
)
