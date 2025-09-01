# M&N Sestua Sanabria

Tienda online de ropa desarrollada en JavaScript, HTML y CSS, con integración a Firebase para gestión de productos.

## Características

- **Catálogo de productos:** Visualización de productos con imágenes, precios y detalles.
- **Detalle de producto:** Página individual para cada producto, con control de cantidad y stock.
- **Carrito de compras:** Agrega productos al carrito y gestiona cantidades.
- **Búsqueda:** Filtra productos por nombre desde la barra de búsqueda.
- **Persistencia:** Uso de `localStorage` para carrito y producto seleccionado.
- **Firebase Firestore:** Productos cargados y leídos desde base de datos en la nube.

## Estructura de archivos y páginas

- `index.html` — Página principal con listado de productos.
- `detalle.html` — Página de detalle de producto.
- `carrito.html` — Página del carrito de compras.
- `usuario.html` — Login y registro de usuario.

### Archivos JavaScript

- `app.js` — Lógica de productos locales y búsqueda.
- `app-2.js` — Lógica de detalle de producto y carrito.
- `app-3.js` — Lógica de visualización y gestión del carrito de compras.
- `app-4.js` — Validación de usuario y autenticación
- `app-5.js` — Integración con Firebase Firestore.
- `style.css` — Estilos generales del sitio.

## Instalación y uso

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/DaltoVisto/M-N-Sestua-Sanabria.git
   cd M-N-Sestua-Sanabria
   ```

2. **Abre el proyecto en Visual Studio Code**  
   (o tu editor favorito).

3. **Configura Firebase:**  
   Si quieres usar tu propia base de datos, reemplaza la configuración en `app-5.js` por tus credenciales de Firebase.

4. **Abre `index.html` en tu navegador**  
   para ver la tienda en funcionamiento.

## Notas

- El carrito y el producto seleccionado se guardan en el navegador usando `localStorage`.
- Para que la integración con Firebase funcione, debes tener habilitada la base de datos Firestore y los permisos adecuados.
- Si tienes problemas de permisos con GitHub, revisa tus credenciales y permisos de colaborador.

## Créditos

Desarrollado por M&N Sestua Sanabria.

---
