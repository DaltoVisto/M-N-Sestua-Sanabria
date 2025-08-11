// JS para login y registro de múltiples usuarios

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('login-form');
  const toggleBtn = document.getElementById('toggle-btn');
  const formTitle = document.getElementById('form-title');
  const loginBtn = document.getElementById('login-btn');
  let modoRegistro = false;

  toggleBtn.addEventListener('click', () => {
    modoRegistro = !modoRegistro;
    if (modoRegistro) {
      formTitle.textContent = "Registrarse";
      loginBtn.textContent = "Registrarse";
      toggleBtn.textContent = "¿Ya tienes cuenta? Inicia sesión";
    } else {
      formTitle.textContent = "Iniciar Sesión";
      loginBtn.textContent = "Ingresar";
      toggleBtn.textContent = "¿No tienes cuenta? Registrate";
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    // Recupera usuarios existentes o crea array vacío
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (modoRegistro) {
      // Verifica si el usuario ya existe
      if (usuarios.some(u => u.usuario === usuario)) {
        alert('El usuario ya existe. Elige otro nombre.');
        return;
      }
      // Agrega nuevo usuario
      usuarios.push({ usuario, password });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      alert('¡Registro exitoso! Ahora inicia sesión.');
      toggleBtn.click();
      form.reset();
    } else {
      // Busca usuario y verifica contraseña
      const encontrado = usuarios.find(u => u.usuario === usuario && u.password === password);
      if (encontrado) {
        alert('¡Bienvenido!');
        window.location.href = "index.html";
      } else {
        alert('Usuario o contraseña incorrectos.');
      }
    }
  });
});