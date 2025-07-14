let productodetalle = JSON.parse(localStorage.getItem("productoseleccionado"));

let cantidad = 0;

function cargarproducto() {
  const contenedor = document.getElementById("producto");

  let parrafo = document.createElement("div");
  parrafo.className = "detalle-container";
  parrafo.innerHTML = `
    <img src="${productodetalle.imagen || 'img/placeholder.jpg'}" alt="${productodetalle.nombre}">
    <div class="detalle-info">
        <h3>${productodetalle.nombre}</h3>
        <p><strong>Precio:</strong> $${productodetalle.precio.toLocaleString()}</p>
        <p><strong>Stock disponible:</strong> ${productodetalle.stock}</p>

        <div class="cantidad-control">
            <button onclick="restarproducto()">-</button>
            <span id="cantidad">0</span>
            <button onclick="sumarproducto()">+</button>
        </div>

        <button class="btn-agregar" onclick="cargarcarrito()">Agregar al carrito</button>
    </div>
  `;
  contenedor.appendChild(parrafo);
}

function sumarproducto() {
  if (cantidad < productodetalle.stock) {
    cantidad++;
    document.getElementById("cantidad").innerText = cantidad;
  } else {
    alert("No hay suficiente stock disponible.");
  }
}

function restarproducto() {
  if (cantidad > 0) {
    cantidad--;
    document.getElementById("cantidad").innerText = cantidad;
  }
}

function cargarcarrito() {
  if (cantidad > 0) {
    // Recuperar carrito actual o crear uno vacío
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si el producto ya está en el carrito
    let index = carrito.findIndex(p => p.id === productodetalle.id);

    if (index === -1) {
      // No existe, agrego el producto con cantidad
      carrito.push({
        ...productodetalle,
        cantidad: cantidad
      });
    } else {
      // Ya existe, sumo la cantidad y controlo stock
      carrito[index].cantidad += cantidad;
      if (carrito[index].cantidad > productodetalle.stock) {
        carrito[index].cantidad = productodetalle.stock;
        alert("Cantidad ajustada al stock disponible.");
      }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.href = "carrito.html";
  } else {
    alert("Seleccioná al menos 1 unidad para continuar.");
  }
}

cargarproducto();
