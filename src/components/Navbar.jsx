import { NavLink } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h1>{import.meta.env.VITE_TITULO || 'Rick & Morty'}</h1>
      </div>
      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'activo' : '')}>Portada</NavLink>
        <NavLink to="/personajes" className={({ isActive }) => (isActive ? 'activo' : '')}>Listado</NavLink>
        <NavLink to="/favoritos" className={({ isActive }) => (isActive ? 'activo' : '')}>Favoritos</NavLink>

        {user ? (
          <button onClick={signOut} className="btn-accion" style={{ padding: '0.3rem 0.8rem', fontSize: '0.85rem' }}>
            Cerrar Sesión ({user.email.split('@')[0]})
          </button>
        ) : (
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'activo' : '')}>Ingresar</NavLink>
        )}
      </nav>
    </header>
  );
}