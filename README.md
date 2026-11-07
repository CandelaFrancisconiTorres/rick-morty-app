# 🛸 Rick & Morty App - Parcial 2

Aplicación mobile adaptada a web desarrollada en React + Vite para la gestión y filtrado de personajes de la serie, con persistencia en la nube y uso de APIs del dispositivo.



## 📋 Resumen del Proyecto 

* **Servicio y Opción Elegida:** **Supabase** (Base de datos PostgreSQL en la nube, autenticación de usuarios y **Row Level Security (RLS)** para el aislamiento de favoritos por cuenta).
* **API del Dispositivo Utilizada:** **Notification API** (API nativa del navegador y dispositivos móviles). Implementada para disparar alertas visuales al interactuar con el sistema de favoritos bajo un manejo estricto de permisos.
* **Ejecución:** El proyecto se instala mediante `npm install` y se levanta localmente con `npm run dev`.



## 🛠️ Qué hay integrado hasta el momento

### 1. Autenticación y Backend (Supabase + RLS)
* **Login y Registro:** Sistema funcional de autenticación de usuarios conectado a Supabase Auth.
* **Aislamiento de Datos (RLS):** Políticas de seguridad a nivel de filas configuradas en la base de datos para que cada usuario autenticado gestione exclusivamente su propia lista de favoritos.

### 2. Funcionalidad de Favoritos y Notificaciones
* **Gestión de Favoritos:** Sincronización en tiempo real con la base de datos de Supabase al marcar o desmarcar personajes.
* **Notificaciones Nativas:** Integración de la Notification API. Al agregar un favorito, la app solicita los permisos necesarios (`granted`/`denied`) y muestra una notificación local del sistema, manejando excepciones en caso de que el usuario rechace o bloquee el permiso.

### 3. Diseño Adaptativo y Maquetación
* **CSS Container Queries:** Implementación de consultas de contenedor (`@container`) en las tarjetas para ajustar dinámicamente su estructura y diseño según el espacio disponible individual.
* **Deploy y Enrutamiento:** Aplicación desplegada en Vercel con soporte para HTTPS (requisito clave para las APIs del dispositivo en celulares) y configuración SPA (`vercel.json`) para evitar errores 404 al recargar.



## 🚀 Cómo armar el proyecto desde cero

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd <nombre-de-la-carpeta>
