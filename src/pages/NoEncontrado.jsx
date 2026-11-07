import { Link } from 'react-router';

export default function NoEncontrado() {
  return (
    <section className="no-encontrado-seccion" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h2>¡404! Portal equivocado 🛸</h2>
      <p style={{ margin: '1rem 0', color: '#94a3b8' }}>
        La página o el personaje que buscás no existe o fue abducido por otra dimensión.
      </p>
      <Link to="/" className="btn-accion" style={{ display: 'inline-block', marginTop: '1rem' }}>
        Volver al inicio
      </Link>
    </section>
  );
}