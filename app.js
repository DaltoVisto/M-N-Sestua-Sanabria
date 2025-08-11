const productos = [
  {
    id: 1,
    nombre: "Pantalón",
    imagen: "img/pantalon.jpg",
    precio: 30000,
    detalle: "Pantalón de algodón",
    stock: 6
  },
  {
    id: 2,
    nombre: "Chaleco",
    imagen: "img/chaleco.jpg",
    precio: 30000,
    detalle: "Chaleco rompeviento, ideal para invierno",
    stock: 5
  },
  {
    id: 3,
    nombre: "Campera",
    imagen: "img/campera.jpg",
    precio: 30000,
    detalle: "Campera abrigada con capucha",
    stock: 5
  },
  {
    id: 4,
    nombre: "Camisa a cuadros",
    imagen: "img/camisa.jpg",
    precio: 30000,
    detalle: "Camisa a cuadros estilo vintage",
    stock: 5
  },
  {
    id: 5,
    nombre: "Pantalón pijama",
    imagen: "img/pantalonpijama.jpg",
    precio: 30000,
    detalle: "Pantalón pijama con formas espaciales",
    stock: 5

  },
   {
    id: 6,
    nombre: "Pantalón Negro",
    imagen: "img/pantalon4.jpg",
    precio: 30000,
    detalle: "Pantalón negro clásico jogging",
    stock: 5

  },
   {
    id: 7,
    nombre: "Pantalón con cierre",
    imagen: "img/pantalon5.jpg",
    precio: 30000,
    detalle: "Pantalón jogging oscuro con cierre",
    stock: 5

  },
  {
    id: 8,
    nombre: "Pantalón Clasico",
    imagen: "img/pantalon5.jpg",
    precio: 30000,
    detalle: "Pantalón jogging oscuro clasico",
    stock: 5

  }

];

function cargarproducto() {
  const contenedor = document.getElementById("contenedor-productos");

  productos.forEach((producto) => {
    const card = document.createElement("article");
    card.classList.add("producto");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <p>${producto.nombre}</p>
      <span>$${producto.precio.toLocaleString()}</span>
      <button class="acarrito" onclick="verproducto(${producto.id})">
        <span class="material-symbols-outlined">shopping_cart</span>
      </button>
    `;

    contenedor.appendChild(card);
  });
}

function verproducto(idproducto) {
  const productoSeleccionado = productos.find(p => p.id === idproducto);
  if (productoSeleccionado) {
    localStorage.setItem("productoseleccionado", JSON.stringify(productoSeleccionado));
    window.location.href = "detalle.html";
  }
}

cargarproducto();




function mostrarProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";
  lista.forEach(producto => {
    const card = document.createElement("article");
    card.classList.add("producto");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <p>${producto.nombre}</p>
      <span>$${producto.precio.toLocaleString()}</span>
      <button class="acarrito" onclick="verproducto(${producto.id})">
        <span class="material-symbols-outlined">shopping_cart</span>
      </button>
    `;

    contenedor.appendChild(card);
  });
}

mostrarProductos(productos);

document.querySelector('#searchbar input[type="search"]').addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const texto = e.target.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    document.getElementById("hero").style.display = texto ? "none" : "";
    document.querySelector("#novedades h2").style.display = texto ? "none" : "";

    const filtrados = productos.filter(p =>
      p.nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(texto)
    );
    mostrarProductos(filtrados);
  }
});
