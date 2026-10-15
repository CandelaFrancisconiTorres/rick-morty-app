const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerPersonajes(params = {}, signal) {
  const urlParams = new URLSearchParams();
  if (params.page) urlParams.append('page', params.page);
  if (params.name) urlParams.append('name', params.name);
  if (params.status) urlParams.append('status', params.status);

  const response = await fetch(`${API_URL}/character/?${urlParams.toString()}`, { signal });
  
  if (!response.ok) {
    if (response.status === 404) {
      return { results: [], info: { pages: 0 } };
    }
    throw new Error(`Error en la API: ${response.status}`);
  }
  
  return await response.json();
}

export async function obtenerPersonajePorId(id, signal) {
  const response = await fetch(`${API_URL}/character/${id}`, { signal });
  
  if (!response.ok) {
    const error = new Error('Personaje no encontrado');
    error.status = response.status;
    throw error;
  }
  
  return await response.json();
}