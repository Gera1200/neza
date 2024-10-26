// script.js

let registros = [];

function agregarRegistro() {
    const terminacionClave = document.getElementById("terminacionClave").value;
    const fechaIngreso = document.getElementById("fechaIngreso").value;
    const fechaEgreso = document.getElementById("fechaEgreso").value;
    const tipo = document.getElementById("tipo").value;

    if (terminacionClave && fechaIngreso && fechaEgreso && tipo) {
        registros.push({
            terminacionClave,
            fechaIngreso,
            fechaEgreso,
            tipo
        });

        actualizarTabla();
        limpiarFormulario();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

function actualizarTabla() {
    const tabla = document.getElementById("tablaRegistros");
    tabla.innerHTML = `<tr>
        <th>Terminación Clave</th>
        <th>Fecha de Ingreso</th>
        <th>Fecha de Egreso</th>
        <th>Tipo</th>
    </tr>`;

    registros.forEach(registro => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${registro.terminacionClave}</td>
            <td>${registro.fechaIngreso}</td>
            <td>${registro.fechaEgreso}</td>
            <td>${registro.tipo === "1" ? "Activo" : "Licencia"}</td>
        `;
        tabla.appendChild(row);
    });
}

function limpiarFormulario() {
    document.getElementById("terminacionClave").value = "";
    document.getElementById("fechaIngreso").value = "";
    document.getElementById("fechaEgreso").value = "";
    document.getElementById("tipo").value = "1";
}

// Función para calcular años, meses y días de antigüedad considerando años bisiestos
function calcularAntiguedad() {
    let totalDias = 0;
    let totalDiasLicencia = 0;

    registros.forEach(registro => {
        const fechaInicio = new Date(registro.fechaIngreso);
        const fechaFin = new Date(registro.fechaEgreso);
        const diasDiferencia = calcularDiasDiferencia(fechaInicio, fechaFin);

        if (registro.tipo === "1") {
            totalDias += diasDiferencia;
        } else {
            totalDiasLicencia += diasDiferencia;
        }
    });

    const antiguedad = calcularAniosMesesDias(totalDias);
    const licencia = calcularAniosMesesDias(totalDiasLicencia);

    document.getElementById("resultadoTexto").textContent = 
        `Antigüedad: ${antiguedad.years} años, ${antiguedad.months} meses, ${antiguedad.days} días | 
        Licencia: ${licencia.years} años, ${licencia.months} meses, ${licencia.days} días`;
}

// Función para calcular la diferencia en días entre dos fechas y considerar años bisiestos
function calcularDiasDiferencia(fechaInicio, fechaFin) {
    const unDia = 24 * 60 * 60 * 1000;
    let diasDiferencia = Math.round((fechaFin - fechaInicio) / unDia);

    for (let year = fechaInicio.getFullYear(); year <= fechaFin.getFullYear(); year++) {
        if (esBisiesto(year)) {
            diasDiferencia++; // Agrega un día por cada año bisiesto entre las fechas
        }
    }

    return diasDiferencia;
}

// Función para validar si un año es bisiesto
function esBisiesto(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Convierte el total de días en años, meses y días
function calcularAniosMesesDias(totalDias) {
    const diasPorMes = 30;
    const diasPorAnio = 365;

    const years = Math.floor(totalDias / diasPorAnio);
    totalDias %= diasPorAnio;

    const months = Math.floor(totalDias / diasPorMes);
    const days = totalDias % diasPorMes;

    return { years, months, days };
}
