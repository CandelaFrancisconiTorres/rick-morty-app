import { NavLink } from 'react-router';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h1>{import.meta.env.VITE_TITULO || 'Rick & Morty'}</h1>
      </div>
      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'activo' : '')}>
          Portada
        </NavLink>
        <NavLink to="/personajes" className={({ isActive }) => (isActive ? 'activo' : '')}>
          Listado
        </NavLink>
        <NavLink to="/favoritos" className={({ isActive }) => (isActive ? 'activo' : '')}>
          Favoritos
        </NavLink>
      </nav>
    </header>
  );
}