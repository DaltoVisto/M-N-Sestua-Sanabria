function actualizarContadorCarrito() {
  const contador = document.getElementById("carrito-count");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  if (total > 0) {
    contador.style.display = "block";
    contador.textContent = total;
  } else {
    contador.style.display = "none";
  }
}

actualizarContadorCarrito();
