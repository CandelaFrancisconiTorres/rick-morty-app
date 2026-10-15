import { useState, useEffect } from 'react';

export function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    // Validación previa si el navegador está offline
    if (!navigator.onLine) {
      setError('No hay conexión a internet. Verificá tu red para cargar los datos.');
      setLoading(false);
      return;
    }

    fetchFunction(controller.signal)
      .then((resultado) => {
        setData(resultado);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          // Si falla la red o no hay conexión
          if (!navigator.onLine || err.message === 'Failed to fetch') {
            setError('Estás offline. Comprobá tu conexión a internet.');
          } else {
            setError(err.message);
          }
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, dependencies);

  return { data, loading, error };
}