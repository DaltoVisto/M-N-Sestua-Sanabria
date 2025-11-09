import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

/* Firebase config (usa la que ya tenías en app-5.js) */
const firebaseConfig = {
  apiKey: "AIzaSyCbKFUKJa1zGFEdUUoyR8hk_imqQY_-QJA",
  authDomain: "carritodecom.firebaseapp.com",
  projectId: "carritodecom",
  storageBucket: "carritodecom.firebasestorage.app",
  messagingSenderId: "279401952248",
  appId: "1:279401952248:web:b01740db6f87560b935c0d",
  measurementId: "G-DRHVSD1WNY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

/* DOM */
const btnIngresar = document.querySelector("#boxpanelingresar button");
const inpProducto = document.getElementById("inpproducto");
const inpDescripcion = document.getElementById("inpdescripcion");
const inpPrecio = document.getElementById("inpprecio");
const inpStock = document.getElementById("inpstock");
const inpImagen = document.getElementById("inpimagen");
const tbodyProductos = document.getElementById("productos-tbody");

/* Subir producto (imagen + documento) */
btnIngresar.addEventListener("click", async () => {
  try {
    const nombre = (inpProducto.value || "").trim();
    const detalle = (inpDescripcion.value || "").trim();
    const precio = parseFloat(inpPrecio.value) || 0;
    const stock = parseInt(inpStock.value, 10) || 0;
    const file = inpImagen.files[0];

    if (!nombre) return alert("Ingrese nombre del producto.");
    if (!file) return alert("Seleccione una imagen.");
    if (precio <= 0) return alert("Ingrese un precio válido.");
    if (stock < 0) return alert("Ingrese stock válido.");

    const filename = Date.now() + "_" + file.name.replace(/\s+/g, "_");
    const storagePath = `productos/${filename}`;
    const storageRef = ref(storage, storagePath);

    // Subir imagen
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    // Guardar documento con ruta de la imagen y URL
    const producto = {
      nombre,
      detalle,
      precio,
      stock,
      imagen: imageUrl,
      imagenPath: storagePath,
      createdAt: Date.now()
    };

    await addDoc(collection(db, "Productos"), producto);

    // limpiar formulario
    inpProducto.value = "";
    inpDescripcion.value = "";
    inpPrecio.value = "";
    inpStock.value = "";
    inpImagen.value = "";

    alert("Producto agregado correctamente.");
    cargarProductos();
  } catch (error) {
    console.error("Error al subir producto:", error);
    alert("Error al subir producto. Revisa la consola.");
  }
});

/* Cargar productos desde Firestore y mostrarlos en la tabla */
async function cargarProductos() {
  try {
    tbodyProductos.innerHTML = "";
    const snapshot = await getDocs(collection(db, "Productos"));
    snapshot.forEach((d) => {
      const p = d.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="${p.imagen || 'img/placeholder.jpg'}" alt="${p.nombre || ''}" style="width:60px; height:auto;"></td>
        <td>${p.nombre || ""}</td>
        <td>$${(p.precio || 0).toLocaleString()}</td>
        <td>${p.stock ?? ""}</td>
        <td>
          <button data-id="${d.id}" data-path="${p.imagenPath || ''}" class="btn-eliminar">Eliminar</button>
        </td>
      `;
      tbodyProductos.appendChild(tr);
    });

    // Delegación de eventos para eliminar
    tbodyProductos.querySelectorAll(".btn-eliminar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const path = btn.getAttribute("data-path");
        eliminarProducto(id, path);
      });
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    alert("Error al cargar productos.");
  }
}

/* Eliminar producto: borra documento y archivo de Storage */
async function eliminarProducto(docId, imagenPath) {
  if (!confirm("¿Eliminar este producto?")) return;
  try {
    // Eliminar documento
    await deleteDoc(doc(db, "Productos", docId));

    // Eliminar archivo en Storage si tenemos la ruta
    if (imagenPath) {
      const imageRef = ref(storage, imagenPath);
      await deleteObject(imageRef).catch((err) => {
        // si falla eliminar el objeto (ej. ya borrado), no rompe el flujo
        console.warn("No se pudo eliminar imagen en Storage:", err);
      });
    }

    alert("Producto eliminado.");
    cargarProductos();
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    alert("Error al eliminar producto. Revisa la consola.");
  }
}

/* Exponer función por si se requiere desde HTML globalmente */
window.cargarProductos = cargarProductos;
window.eliminarProducto = eliminarProducto;

/* Inicializar lista al cargar la página */
document.addEventListener("DOMContentLoaded", cargarProductos);