// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbKFUKJa1zGFEdUUoyR8hk_imqY_-QJA",
  authDomain: "carritodecom.firebaseapp.com",
  projectId: "carritodecom",
  storageBucket: "carritodecom.firebasestorage.app",
  messagingSenderId: "279401952248",
  appId: "1:279401952248:web:b01740db6f87560b935c0d",
  measurementId: "G-DRHVSD1WNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Leer todos los productos en consola
async function leerDatos() {
  const basedeDatos = await getDocs(collection(db, "Productos"));
  basedeDatos.forEach((productos) => {
    const datos = productos.data();
    console.log(`Producto: ${datos.nombre}, Precio: ${datos.precio}, Detalle: ${datos.detalle}, Imagen: ${datos.imagen}`);
  });
}
leerDatos();

// Subir productos (si lo necesitás)
async function subirProducto() {
  for (const producto of productos) {
    await addDoc(collection(db, "Productos"), producto);
    console.log(`Producto ${producto.nombre} subido correctamente`);
  }
}
// subirProducto();


// ======================
// CARGAR PRODUCTOS EN LA PÁGINA
// ======================
async function cargarProductosDesdeDB() {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = ""; // Limpia el contenedor

  const basedeDatos = await getDocs(collection(db, "Productos"));
  basedeDatos.forEach((doc) => {
    const producto = doc.data();

    // Evita error si no tiene precio o está undefined
    const precioSeguro = Number(producto.precio) || 0;

    const card = document.createElement("article");
    card.classList.add("producto");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <p>${producto.nombre}</p>
      <span>$${precioSeguro.toLocaleString()}</span>
      <button class="acarrito" onclick="verproducto('${doc.id}')">
        <span class="material-symbols-outlined">shopping_cart</span>
      </button>
    `;

    contenedor.appendChild(card);
  });
}

cargarProductosDesdeDB();

// ======================
// VER PRODUCTO
// ======================
async function verproducto(idproducto) {
  const docRef = collection(db, "Productos");
  const docs = await getDocs(docRef);
  let productoSeleccionado = null;

  docs.forEach((doc) => {
    if (doc.id === idproducto) {
      productoSeleccionado = doc.data();
    }
  });

  if (productoSeleccionado) {
    localStorage.setItem("productoseleccionado", JSON.stringify(productoSeleccionado));
    window.location.href = "detalle.html";
  }
}

// Hacer la función global
window.verproducto = verproducto;
