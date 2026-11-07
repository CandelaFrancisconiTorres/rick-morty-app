import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export function Navbar({ session }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
    } else {
      // Redirigir al Home tras cerrar sesión
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🛸 Rick & Morty</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        {session && <Link to="/favoritos">Favoritos</Link>}
        
        {session ? (
          <button onClick={handleLogout} className="btn-logout">
            Cerrar Sesión
          </button>
        ) : (
          <Link to="/login" className="btn-login">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;