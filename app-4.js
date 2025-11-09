// JS para login y registro de múltiples usuarios

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('login-form');
  const toggleBtn = document.getElementById('toggle-btn');
  const formTitle = document.getElementById('form-title');
  const loginBtn = document.getElementById('login-btn');
  const passwordRepeatLabel = document.querySelector('label[for="passwordrepeat"]');
  const passwordRepeatInput = document.getElementById('passwordrepeat');
  let modoRegistro = false;

  // Oculta el campo "Repetir Contraseña" al iniciar
  passwordRepeatLabel.style.display = "none";
  passwordRepeatInput.style.display = "none";

 toggleBtn.addEventListener('click', () => {
  modoRegistro = !modoRegistro;
  if (modoRegistro) {
    formTitle.textContent = "Registrarse";
    loginBtn.textContent = "Registrarse";
    toggleBtn.textContent = "¿Ya tienes cuenta? Inicia sesión";
    passwordRepeatLabel.style.display = "";
    passwordRepeatInput.style.display = "";
    passwordRepeatInput.required = true; // ✅ se activa en modo registro
  } else {
    formTitle.textContent = "Iniciar Sesión";
    loginBtn.textContent = "Ingresar";
    toggleBtn.textContent = "¿No tienes cuenta? Registrate";
    passwordRepeatLabel.style.display = "none";
    passwordRepeatInput.style.display = "none";
    passwordRepeatInput.required = false; // ✅ se desactiva en modo login
  }
});

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    const passwordrepeat = document.getElementById('passwordrepeat').value;

    // Recupera usuarios existentes o crea array vacío
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (modoRegistro) {
      // Verifica si el usuario ya existe
      if (usuarios.some(u => u.usuario === usuario)) {
        alert('El usuario ya existe. Elige otro nombre.');
        return;
      }
      // Verifica que las contraseñas coincidan
      if (password !== passwordrepeat) {
        alert('Las contraseñas no coinciden.');
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
document.getElementById('show-passwords').addEventListener('change', function() {
    const pass = document.getElementById('password');
    const passRepeat = document.getElementById('passwordrepeat');
    const type = this.checked ? 'text' : 'password';
    pass.type = type;
    passRepeat.type = type;
})