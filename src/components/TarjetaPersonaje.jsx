import { Link } from 'react-router';

export default function TarjetaPersonaje({ personaje, esFavorito, onToggleFavorito }) {
  return (
    <article className="tarjeta-personaje">
      <Link to={`/personajes/${personaje.id}`} className="tarjeta-link">
        <img src={personaje.image} alt={`Retrato de ${personaje.name}`} loading="lazy" />
        <div className="tarjeta-info">
          <h3>{personaje.name}</h3>
          <p className="estado-item">
            <span className={`status-dot ${personaje.status.toLowerCase()}`}></span>
            {personaje.status} - {personaje.species}
          </p>
        </div>
      </Link>
      <button
        type="button"
        className={`btn-favorito ${esFavorito ? 'activo' : ''}`}
        onClick={() => onToggleFavorito(personaje)}
        aria-pressed={esFavorito}
        aria-label={esFavorito ? `Quitar a ${personaje.name} de favoritos` : `Marcar a ${personaje.name} como favorito`}
      >
        {esFavorito ? '★' : '☆'}
      </button>
    </article>
  );
}