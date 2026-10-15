export function Cargando() {
  return (
    <div className="feedback-container" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <p>Cargando información...</p>
    </div>
  );
}

export function ErrorFeedback({ mensaje }) {
  return (
    <div className="feedback-container error" role="alert">
      <p>⚠️ Ocurrió un error: {mensaje}</p>
    </div>
  );
}

export function VacioFeedback({ mensaje = "No se encontraron elementos." }) {
  return (
    <div className="feedback-container vacio">
      <p>🔍 {mensaje}</p>
    </div>
  );
}