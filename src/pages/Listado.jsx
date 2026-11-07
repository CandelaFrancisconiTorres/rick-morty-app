import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { obtenerPersonajes } from '../api/rickandmorty';
import { useFetch } from '../hooks/useFetch';
import { useFavoritos } from '../hooks/useFavoritos';
import TarjetaPersonaje from '../components/TarjetaPersonaje';
import { Cargando, ErrorFeedback, VacioFeedback } from '../components/EstadoFeedback';

export default function Listado() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const nombreQuery = searchParams.get('name') || '';
  const estadoQuery = searchParams.get('status') || '';
  const generoQuery = searchParams.get('gender') || '';
  const paginaQuery = parseInt(searchParams.get('page') || '1', 10);

  const [nombreInput, setNombreInput] = useState(nombreQuery);

  useEffect(() => {
    setNombreInput(nombreQuery);
  }, [nombreQuery]);

  const { data, loading, error } = useFetch(
    (signal) => obtenerPersonajes({ 
      name: nombreQuery, 
      status: estadoQuery, 
      gender: generoQuery, 
      page: paginaQuery 
    }, signal),
    [nombreQuery, estadoQuery, generoQuery, paginaQuery]
  );

  const { esFavorito, toggleFavorito } = useFavoritos();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const nuevosParams = new URLSearchParams(searchParams);
    if (nombreInput.trim()) {
      nuevosParams.set('name', nombreInput.trim());
    } else {
      nuevosParams.delete('name');
    }
    nuevosParams.set('page', '1');
    setSearchParams(nuevosParams);
  };

  const handleStatusChange = (e) => {
    const nuevoEstado = e.target.value;
    const nuevosParams = new URLSearchParams(searchParams);
    if (nuevoEstado) {
      nuevosParams.set('status', nuevoEstado);
    } else {
      nuevosParams.delete('status');
    }
    nuevosParams.set('page', '1');
    setSearchParams(nuevosParams);
  };

  const handleGenderChange = (e) => {
    const nuevoGenero = e.target.value;
    const nuevosParams = new URLSearchParams(searchParams);
    if (nuevoGenero) {
      nuevosParams.set('gender', nuevoGenero);
    } else {
      nuevosParams.delete('gender');
    }
    nuevosParams.set('page', '1');
    setSearchParams(nuevosParams);
  };

  const cambiarPagina = (nuevaPagina) => {
    const nuevosParams = new URLSearchParams(searchParams);
    nuevosParams.set('page', nuevaPagina);
    setSearchParams(nuevosParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="listado-seccion">
      <h2>Listado de Personajes</h2>

      <div className="controles-busqueda">
        <form onSubmit={handleSearchSubmit} className="form-busqueda">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={nombreInput}
            onChange={(e) => setNombreInput(e.target.value)}
            aria-label="Buscar personajes por nombre"
          />
          <button type="submit" className="btn-accion">Buscar</button>
        </form>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="filtro-estado" style={{ flex: 1, minWidth: '140px' }}>
            <label htmlFor="status-select" style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem' }}>Estado:</label>
            <select id="status-select" value={estadoQuery} onChange={handleStatusChange} style={{ width: '100%' }}>
              <option value="">Todos</option>
              <option value="alive">Vivo</option>
              <option value="dead">Muerto</option>
              <option value="unknown">Desconocido</option>
            </select>
          </div>

          <div className="filtro-estado" style={{ flex: 1, minWidth: '140px' }}>
            <label htmlFor="gender-select" style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem' }}>Género:</label>
            <select id="gender-select" value={generoQuery} onChange={handleGenderChange} style={{ width: '100%' }}>
              <option value="">Todos</option>
              <option value="female">Femenino</option>
              <option value="male">Masculino</option>
              <option value="genderless">Sin género</option>
              <option value="unknown">Desconocido</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <Cargando />}
      {error && <ErrorFeedback mensaje={error} />}

      {!loading && !error && data?.results?.length === 0 && (
        <VacioFeedback mensaje="No se encontraron personajes con los filtros seleccionados." />
      )}

      {!loading && !error && data?.results?.length > 0 && (
        <>
          <div className="grilla-personajes">
            {data.results.map((personaje) => (
              <TarjetaPersonaje
                key={personaje.id}
                personaje={personaje}
                esFavorito={esFavorito(personaje.id)}
                onToggleFavorito={toggleFavorito}
              />
            ))}
          </div>

          <div className="paginacion">
            <button
              onClick={() => cambiarPagina(paginaQuery - 1)}
              disabled={paginaQuery <= 1}
              className="btn-accion"
            >
              Anterior
            </button>
            <span>Página {paginaQuery} de {data.info?.pages || 1}</span>
            <button
              onClick={() => cambiarPagina(paginaQuery + 1)}
              disabled={paginaQuery >= (data.info?.pages || 1)}
              className="btn-accion"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </section>
  );
}