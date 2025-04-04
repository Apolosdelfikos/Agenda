document.addEventListener("DOMContentLoaded", cargarAgenda);

function guardarAgenda() {
    localStorage.setItem("agenda", document.getElementById("agenda").innerHTML);
}

function cargarAgenda() {
    const datosGuardados = localStorage.getItem("agenda");
    if (datosGuardados) {
        document.getElementById("agenda").innerHTML = datosGuardados;
        asignarEventos();
    }
}

function asignarEventos() {
    document.querySelectorAll(".eliminar-dia").forEach(boton => boton.onclick = () => eliminarDia(boton));
    document.querySelectorAll(".eliminar-actividad").forEach(boton => boton.onclick = () => eliminarActividad(boton));
    document.querySelectorAll(".agregar-actividad").forEach(boton => boton.onclick = () => agregarActividad(boton));
}

function agregarDia() {
    const fechaInput = document.getElementById("fecha");
    const fechaValor = fechaInput.value;
    if (!fechaValor) return;

    const agenda = document.getElementById("agenda");
    
    const diaDiv = document.createElement("div");
    diaDiv.classList.add("dia");
    diaDiv.innerHTML = `<h2>${fechaValor} <button class='eliminar-dia'>&#10003;</button></h2>
                        <input type='text' placeholder='Nueva actividad' />
                        <button class='agregar-actividad'>Añadir Actividad</button>
                        <ul></ul>`;
    
    agenda.appendChild(diaDiv);
    fechaInput.value = "";
    asignarEventos();
    guardarAgenda();
}

function agregarActividad(boton) {
    const input = boton.previousElementSibling;
    const texto = input.value.trim();
    if (!texto) return;

    const lista = boton.nextElementSibling;
    const actividad = document.createElement("li");
    actividad.innerHTML = `${texto} <button class='eliminar-actividad'>&#10003;</button>`;
    lista.appendChild(actividad);
    input.value = "";
    asignarEventos();
    guardarAgenda();
}

function eliminarActividad(boton) {
    boton.parentElement.remove();
    guardarAgenda();
}

function eliminarDia(boton) {
    boton.parentElement.parentElement.remove();
    guardarAgenda();
}
