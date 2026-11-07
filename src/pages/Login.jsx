import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      // Redirigir al Home tras inicio de sesión exitoso
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      
      {errorMsg && <p className="error-message">{errorMsg}</p>}

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <p className="auth-switch">
        ¿No tenés cuenta? <Link to="/register">Registrate acá</Link>
      </p>
    </div>
  );
}

export default Login;