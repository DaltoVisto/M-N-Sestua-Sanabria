 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCbKFUKJa1zGFEdUUoyR8hk_imqQY_-QJA",
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

  async function leerDatos() {
    const basedeDatos = await getDocs(collection(db, "Productos"));
    basedeDatos.forEach((productos) => {
      const datos = productos.data();
      console.log(`Producto: ${datos.nombre}, Precio: ${datos.precio}, Detalle: ${datos.detalle}, Imagen: ${datos.imagen}`);
    })}
    leerDatos();

    async function subirProducto() {
      for(const producto of productos){
        await addDoc(collection(db, "Productos"), producto);
        console.log(`Producto ${producto.nombre} subido correctamente`);
      }
    }
    // subirProducto();
    

async function cargarProductosDesdeDB() {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = ""; // Limpia el contenedor antes de agregar productos

  const basedeDatos = await getDocs(collection(db, "Productos"));
  basedeDatos.forEach((doc) => {
    const producto = doc.data();

    const card = document.createElement("article");
    card.classList.add("producto");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <p>${producto.nombre}</p>
      <span>$${producto.precio.toLocaleString()}</span>
      <button class="acarrito" onclick="verproducto('${doc.id}')">
        <span class="material-symbols-outlined">shopping_cart</span>
      </button>
    `;

    contenedor.appendChild(card);
  });
}
cargarProductosDesdeDB();
// ...existing code...

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

// Haz la función global:
window.verproducto = verproducto;

// ...existing code...