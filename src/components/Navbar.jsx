import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  const isActive = (path) => location.pathname === path ? 'activo' : '';

  return (
    <nav className="navbar">
      <h1>Explorador de Rick and Morty</h1>
      <div className="navbar-links">
        <Link to="/" className={isActive('/')}>Portada</Link>
        <Link to="/personajes" className={isActive('/personajes')}>Listado</Link>
        <Link to="/favoritos" className={isActive('/favoritos')}>Favoritos</Link>
        
        {user ? (
          <button onClick={handleLogout} className="btn-accion">
            Cerrar Sesión ({user.email?.split('@')[0]})
          </button>
        ) : (
          <Link to="/login" className={isActive('/login')}>Ingresar</Link>
        )}
      </div>
    </nav>
  );
}