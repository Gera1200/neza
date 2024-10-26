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

function calcularAntiguedad() {
    fetch('/antiguedad', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registros)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("resultadoTexto").textContent = 
            `Años: ${data.years}, Meses: ${data.months}, Días: ${data.days}`;
    })
    .catch(error => console.error('Error:', error));
}
