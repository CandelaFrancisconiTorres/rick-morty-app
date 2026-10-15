import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Portada from '../pages/Portada';
import Listado from '../pages/Listado';
import Detalle from '../pages/Detalle';
import Favoritos from '../pages/Favoritos';
import NoEncontrado from '../pages/NoEncontrado';

function LayoutPrincipal() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="contenido-principal">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPrincipal />}>
          <Route path="/" element={<Portada />} />
          <Route path="/personajes" element={<Listado />} />
          <Route path="/personajes/:id" element={<Detalle />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}