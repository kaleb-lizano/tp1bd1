/* Dummies
   ========================================================= */
let empleados = [
  { id: 5, nombre: "Luis Chaves", salario: 200000 },
  { id: 3, nombre: "Juan Perez", salario: 150000 },
  { id: 7, nombre: "Ana Rojas", salario: 350000 }
];


/* Conexión con HTML
   ========================================================= */
const vistaPrincipal = document.getElementById("vista-principal");
const vistaFormulario = document.getElementById("vista-formulario");

const tablaEmpleados = document.getElementById("tabla-empleados");
const mensajePrincipal = document.getElementById("mensaje-principal");
const mensajeFormulario = document.getElementById("mensaje-formulario");

const btnMostrarFormulario = document.getElementById("btn-mostrar-formulario");
const btnRegresar = document.getElementById("btn-regresar");
const formEmpleado = document.getElementById("form-empleado");

const inputNombre = document.getElementById("nombre");
const inputSalario = document.getElementById("salario");


/* Funciones
   ========================================================= */

// Mostrar página principal
function mostrarVistaPrincipal() {
  vistaFormulario.classList.add("oculto");
  vistaPrincipal.classList.remove("oculto");
}

// Mostrar página formulario
function mostrarVistaFormulario() {
  vistaPrincipal.classList.add("oculto");
  vistaFormulario.classList.remove("oculto");
}

// Limpiar inputs
function limpiarFormulario() {
  formEmpleado.reset();
  mensajeFormulario.innerHTML = "";
}

// Mostrar mensajes
function mostrarMensaje(contenedor, texto, tipo) {
  contenedor.innerHTML = `<div class="mensaje ${tipo}">${texto}</div>`;
}

// Limpiar mensajes
function limpiarMensaje(contenedor) {
  contenedor.innerHTML = "";
}

// Formatear salario
function formatearSalario(valor) {
  return "₡ " + Number(valor).toLocaleString("es-CR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}


/* "Backend"
   ========================================================= */

// Ordenar empleados
async function obtenerEmpleadosDummy() {
  const copia = [...empleados];

  copia.sort((a, b) =>
    a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
  );

  return copia;
}

// Insertar empleado
async function insertarEmpleadoDummy(nuevoEmpleado) {

  const yaExiste = empleados.some(
    (emp) =>
      emp.nombre.trim().toLowerCase() ===
      nuevoEmpleado.nombre.trim().toLowerCase()
  );

  if (yaExiste) {
    throw new Error("Nombre de Empleado ya existe.");
  }

  const nuevoId =
    empleados.length > 0
      ? Math.max(...empleados.map((e) => e.id)) + 1
      : 1;

  empleados.push({
    id: nuevoId,
    nombre: nuevoEmpleado.nombre.trim(),
    salario: Number(nuevoEmpleado.salario)
  });

  return { ok: true };
}


/* Mostrar datos de la tabla
   ========================================================= */

async function cargarTabla() {
  limpiarMensaje(mensajePrincipal);
  tablaEmpleados.innerHTML = "";

  const lista = await obtenerEmpleadosDummy();

  if (lista.length === 0) {
    tablaEmpleados.innerHTML = `
      <tr>
        <td colspan="3">No hay empleados registrados.</td>
      </tr>
    `;
    return;
  }

  lista.forEach((empleado) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${empleado.id}</td>
      <td>${empleado.nombre}</td>
      <td>${formatearSalario(empleado.salario)}</td>
    `;

    tablaEmpleados.appendChild(fila);
  });
}


/* Validaciones
   ========================================================= */

// Validar nombre
function validarNombre(nombre) {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ -]+$/;
  return regex.test(nombre);
}

// Validar salario
function validarSalario(salario) {
  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(salario) && Number(salario) > 0;
}


/* Interacciones
   ========================================================= */

// Mostrar formulario
btnMostrarFormulario.addEventListener("click", () => {
  limpiarFormulario();
  mostrarVistaFormulario();
});

// Regresar a tabla
btnRegresar.addEventListener("click", () => {
  limpiarFormulario();
  mostrarVistaPrincipal();
});

// Envío del formulario
formEmpleado.addEventListener("submit", async (event) => {
  event.preventDefault();

  limpiarMensaje(mensajeFormulario);

  const nombre = inputNombre.value.trim();
  const salario = inputSalario.value.trim();

  // Validaciones (Interacciones)
  if (!nombre || !salario) {
    mostrarMensaje(
      mensajeFormulario,
      "Los campos nombre y salario no pueden estar vacíos.",
      "error"
    );
    return;
  }

  if (!validarNombre(nombre)) {
    mostrarMensaje(
      mensajeFormulario,
      "El nombre solo puede contener letras, espacios o guion.",
      "error"
    );
    return;
  }

  if (!validarSalario(salario)) {
    mostrarMensaje(
      mensajeFormulario,
      "El salario debe ser un valor válido.",
      "error"
    );
    return;
  }

  // Inserción
  try {
    await insertarEmpleadoDummy({ nombre, salario });

    limpiarFormulario();
    await cargarTabla();
    mostrarVistaPrincipal();

    mostrarMensaje(mensajePrincipal, "Inserción exitosa.", "success");

  } catch (error) {
    mostrarMensaje(mensajeFormulario, error.message, "error");
  }
});


/* Iniciar
   ========================================================= */
cargarTabla();