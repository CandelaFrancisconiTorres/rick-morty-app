import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

export default function Login() {
  const [isRegistro, setIsRegistro] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensajeExito(null);
    setLoading(true);

    try {
      if (isRegistro) {
        const { error } = await signUp(email, password);
        if (error) throw error;
        setMensajeExito('¡Registro exitoso! Ya podés iniciar sesión (o revisá tu email si Supabase requiere confirmación).');
        setIsRegistro(false);
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate('/favoritos'); // Redirigir a favoritos o al inicio tras loguearse
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-seccion" style={{ maxWidth: '400px', margin: '3rem auto', padding: '2rem', background: 'var(--color-superficie)', borderRadius: '12px', border: '1px solid var(--color-borde)' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-primario)' }}>
        {isRegistro ? 'Crear Cuenta 🚀' : 'Iniciar Sesión 🛸'}
      </h2>

      {error && <div style={{ background: '#ef444422', border: '1px solid #ef4444', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>⚠️ {error}</div>}
      {mensajeExito && <div style={{ background: '#10b98122', border: '1px solid #10b981', color: '#10b981', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>✅ {mensajeExito}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Correo electrónico</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu_email@ejemplo.com"
            style={{ width: '100%', padding: '0.6rem 1rem', background: 'var(--color-fondo)', border: '1px solid var(--color-borde)', color: 'var(--color-texto)', borderRadius: '8px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Contraseña</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: '100%', padding: '0.6rem 1rem', background: 'var(--color-fondo)', border: '1px solid var(--color-borde)', color: 'var(--color-texto)', borderRadius: '8px' }}
          />
        </div>

        <button type="submit" disabled={loading} className="btn-accion" style={{ width: '100%', marginTop: '0.5rem' }}>
          {loading ? 'Procesando...' : (isRegistro ? 'Registrarse' : 'Ingresar')}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
        {isRegistro ? '¿Ya tenés cuenta?' : '¿No tenés cuenta todavía?'} {' '}
        <button
          type="button"
          onClick={() => { setIsRegistro(!isRegistro); setError(null); setMensajeExito(null); }}
          style={{ background: 'none', border: 'none', color: 'var(--color-primario)', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline', padding: 0, minHeight: 'auto', minWidth: 'auto' }}
        >
          {isRegistro ? 'Iniciá sesión acá' : 'Registrate gratis'}
        </button>
      </p>
    </section>
  );
}