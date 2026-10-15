import { Link } from 'react-router';

export default function Portada() {
  return (
    <section className="portada">
      <div className="portada-contenido">
        <h2>Bienvenido al Explorador Oficial</h2>
        <p>
          Explorá el universo de Rick and Morty, filtrá personajes, consultá detalles específicos
          y gestioná tus favoritos con persistencia local.
        </p>
        <Link to="/personajes" className="btn-principal">
          Ver Listado de Personajes
        </Link>
      </div>
    </section>
  );
}