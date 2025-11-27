function cargarproducto() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const tbody = document.getElementById("carritofilas");
  const totalFinalHTML = document.getElementById("total-final");

  tbody.innerHTML = ""; 

  let totalFinal = 0; // ⬅ acumulador

  carrito.forEach((producto, i) => {
    let fila = document.createElement("tr");

    // Subtotal de ese producto
    let subtotal = producto.precio * producto.cantidad;
    totalFinal += subtotal; // ⬅ sumamos al total final

    fila.innerHTML = `
      <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
      <td>${producto.cantidad}</td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toLocaleString()}</td>
      <td>$${subtotal.toLocaleString()}</td>
      <td><button class="eliminar" onclick="eliminarProducto(${i})">Eliminar</button></td>
    `;

    tbody.appendChild(fila);
  });

  // ⬅ Actualizar el total en el HTML
  if (totalFinalHTML) {
    totalFinalHTML.textContent = totalFinal.toLocaleString();
  }
}

function eliminarProducto(index) {
  if (confirm("¿Eliminar este producto del carrito?")) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1); 
    localStorage.setItem("carrito", JSON.stringify(carrito));

    cargarproducto(); 
    actualizarContadorCarrito();
  }
}

cargarproducto();