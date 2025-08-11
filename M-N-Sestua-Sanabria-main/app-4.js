function actualizarContadorCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let totalCantidad = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  const contador = document.getElementById("cart-count");
  if (contador) {
    contador.textContent = totalCantidad;

    contador.style.display = totalCantidad > 0 ? "inline-block" : "none";
  }
}

actualizarContadorCarrito();