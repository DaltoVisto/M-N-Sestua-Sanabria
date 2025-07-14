function cargarproducto() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const tbody = document.getElementById("carritofilas");

  tbody.innerHTML = ""; 

  carrito.forEach((producto, i) => {
    let fila = document.createElement("tr");

    fila.innerHTML = `
      <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
      <td>${producto.cantidad}</td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toLocaleString()}</td>
      <td>$${(producto.precio * producto.cantidad).toLocaleString()}</td>
      <td><button class="eliminar" onclick="eliminarProducto(${i})">Eliminar</button></td>
    `;

    tbody.appendChild(fila);
  });
}

function eliminarProducto(index) {
  if (confirm("¿Eliminar este producto del carrito?")) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1); // Eliminar producto por índice
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarproducto(); 

        if (typeof actualizarContadorCarrito === "function") {
      actualizarContadorCarrito();
  }
}}

cargarproducto();
