import { useState, useEffect } from 'react';
import { supabase } from '../api/supabaseClient';
import { useAuth } from '../context/AuthContext';

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loadingFavs, setLoadingFavs] = useState(true);
  const { user } = useAuth();

  // Función para manejar las notificaciones del navegador/dispositivo (API del teléfono - Requisito 3)
  const dispararNotificacion = (nombrePersonaje) => {
    if (!('Notification' in window)) {
      console.log('Este navegador no soporta notificaciones.');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification('¡Nuevo Favorito! 🌟', {
        body: `${nombrePersonaje} se guardó en tus favoritos de la nube.`,
        icon: '/favicon.ico'
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('¡Permiso concedido!', {
            body: `Ahora recibirás alertas cuando guardes a ${nombrePersonaje}.`
          });
        } else {
          // Mensaje claro si el usuario rechaza el permiso (exigencia del práctico)
          alert('Para recibir alertas de favoritos, necesitás habilitar las notificaciones en la configuración de tu navegador.');
        }
      });
    } else {
      // Si ya las había denegado previamente
      alert('Las notificaciones están bloqueadas. Habilítalas en el candado de la barra de direcciones para recibir alertas.');
    }
  };

  // Cargar favoritos desde Supabase cuando el usuario inicia sesión
  useEffect(() => {
    if (!user) {
      setFavoritos([]);
      setLoadingFavs(false);
      return;
    }

    async function cargarFavoritosNube() {
      try {
        setLoadingFavs(true);
        const { data, error } = await supabase
          .from('favoritos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const favsMapeados = (data || []).map((item) => ({
          id: item.character_id,
          name: item.name,
          status: item.status,
          species: item.species,
          image: item.image_url,
          supabaseId: item.id
        }));

        setFavoritos(favsMapeados);
      } catch (err) {
        console.error('Error al cargar favoritos de Supabase:', err.message);
      } finally {
        setLoadingFavs(false);
      }
    }

    cargarFavoritosNube();
  }, [user]);

  // Agregar o quitar un favorito sincronizándolo con Supabase
  const toggleFavorito = async (personaje) => {
    if (!user) {
      alert('Tenés que iniciar sesión para guardar favoritos en la nube.');
      return;
    }

    const existe = favoritos.some((p) => p.id === personaje.id);

    try {
      if (existe) {
        const { error } = await supabase
          .from('favoritos')
          .delete()
          .eq('character_id', personaje.id)
          .eq('user_id', user.id);

        if (error) throw error;

        setFavoritos((prev) => prev.filter((p) => p.id !== personaje.id));
      } else {
        const nuevoFav = {
          user_id: user.id,
          character_id: personaje.id,
          name: personaje.name,
          status: personaje.status,
          species: personaje.species,
          image_url: personaje.image
        };

        const { data, error } = await supabase
          .from('favoritos')
          .insert([nuevoFav])
          .select();

        if (error) throw error;

        const agregado = {
          id: personaje.id,
          name: personaje.name,
          status: personaje.status,
          species: personaje.species,
          image: personaje.image,
          supabaseId: data[0].id
        };

        setFavoritos((prev) => [...prev, agregado]);

        // Disparar la notificación nativa al agregar exitosamente a favoritos
        dispararNotificacion(personaje.name);
      }
    } catch (err) {
      console.error('Error al modificar favorito en Supabase:', err.message);
      alert('Hubo un error al actualizar tus favoritos en la nube.');
    }
  };

  const esFavorito = (id) => favoritos.some((p) => p.id === id);

  return { favoritos, toggleFavorito, esFavorito, loadingFavs };
}