import { useParams, useNavigate } from 'react-router';
import { obtenerPersonajePorId } from '../api/rickandmorty';
import { useFetch } from '../hooks/useFetch';
import { useFavoritos } from '../hooks/useFavoritos';
import { Cargando } from '../components/EstadoFeedback';
import NoEncontrado from './NoEncontrado';

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favoritos, esFavorito, toggleFavorito } = useFavoritos();

  // Intentamos buscar el personaje en los favoritos locales por si estamos offline
  const personajeEnFavoritos = favoritos.find((p) => p.id === Number(id));

  const { data: personajeApi, loading, error } = useFetch(
    (signal) => obtenerPersonajePorId(id, signal),
    [id]
  );

  // Si estamos offline o hay error, pero el personaje está en favoritos, usamos ese.
  // De lo contrario, usamos el que vino de la API.
  const personaje = personajeApi || personajeEnFavoritos;

  if (loading && !personajeEnFavoritos) return <Cargando />;

  // Si hay error de red o no existe el personaje y tampoco está en favoritos, mostramos el 404 o aviso offline
  if ((error || !personaje) && !personajeEnFavoritos) {
    if (!navigator.onLine) {
      return (
        <section className="detalle-seccion" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <h2>🔌 Estás sin conexión</h2>
          <p style={{ margin: '1rem 0', color: '#94a3b8' }}>
            No se pudo cargar la información en línea de este personaje. Si lo tenés guardado en favoritos, podrás verlo desde tu sección de favoritos.
          </p>
          <button onClick={() => navigate(-1)} className="btn-accion">
            ← Volver atrás
          </button>
        </section>
      );
    }
    return <NoEncontrado />;
  }

  const favoritoActivo = personaje ? esFavorito(personaje.id) : false;

  return (
    <section className="detalle-seccion">
      <button onClick={() => navigate(-1)} className="btn-accion btn-volver" style={{ marginBottom: '1.5rem' }}>
        ← Volver atrás
      </button>

      {personaje && (
        <div className="detalle-card">
          <img src={personaje.image} alt={`Imagen de ${personaje.name}`} />
          <div className="detalle-info">
            <h2>{personaje.name}</h2>
            <ul>
              <li><strong>Estado:</strong> {personaje.status}</li>
              <li><strong>Especie:</strong> {personaje.species}</li>
              <li><strong>Género:</strong> {personaje.gender || 'Desconocido'}</li>
              <li><strong>Origen:</strong> {personaje.origin?.name || personaje.origin || 'Desconocido'}</li>
              <li><strong>Ubicación actual:</strong> {personaje.location?.name || personaje.location || 'Desconocida'}</li>
              <li><strong>Episodios:</strong> {personaje.episode?.length || 'N/D'}</li>
            </ul>
            <button
              type="button"
              className={`btn-favorito-detalle ${favoritoActivo ? 'activo' : ''}`}
              onClick={() => toggleFavorito(personaje)}
              aria-pressed={favoritoActivo}
              style={{ marginTop: '1rem' }}
            >
              {favoritoActivo ? '★ Quitar de Favoritos' : '☆ Marcar como Favorito'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}