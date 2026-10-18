import { Link } from "react-router"
import { links } from "../data/navegacion.js"

export default function Footer() {
  return (
    <footer>
      <ul className="footer-nav">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>{link.texto}</Link>
          </li>
        ))}
      </ul>
      <div className="footer-social">
        {/* Links externos: siguen siendo <a>, porque salen del sitio */}
        <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
        <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
      </div>
    </footer>
  )
}
