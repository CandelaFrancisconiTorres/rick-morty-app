import { useFavoritos } from '../hooks/useFavoritos';
import TarjetaPersonaje from '../components/TarjetaPersonaje';
import { VacioFeedback } from '../components/EstadoFeedback';

export default function Favoritos() {
  const { favoritos, esFavorito, toggleFavorito } = useFavoritos();

  return (
    <section className="favoritos-seccion">
      <h2>Tus Personajes Favoritos</h2>
      {favoritos.length === 0 ? (
        <VacioFeedback mensaje="Aún no tenés personajes marcados como favoritos." />
      ) : (
        <div className="grilla-personajes">
          {favoritos.map((personaje) => (
            <TarjetaPersonaje
              key={personaje.id}
              personaje={personaje}
              esFavorito={esFavorito(personaje.id)}
              onToggleFavorito={toggleFavorito}
            />
          ))}
        </div>
      )}
    </section>
  );
}