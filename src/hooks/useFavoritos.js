import { useState, useEffect } from 'react';

const CLAVE_STORAGE = 'rick_morty_favoritos_v1';

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const guardados = localStorage.getItem(CLAVE_STORAGE);
      return guardados ? JSON.parse(guardados) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(favoritos));
    } catch (e) {
      console.error('Error al guardar favoritos', e);
    }
  }, [favoritos]);

  const toggleFavorito = (personaje) => {
    setFavoritos((prev) => {
      const existe = prev.some((p) => p.id === personaje.id);
      if (existe) {
        return prev.filter((p) => p.id !== personaje.id);
      } else {
        return [...prev, personaje];
      }
    });
  };

  const esFavorito = (id) => favoritos.some((p) => p.id === id);

  return { favoritos, toggleFavorito, esFavorito };
}