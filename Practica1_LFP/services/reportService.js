import fs from "fs";

// 1. Historial en consola

export function mostrarHistorialConsola(records){
    console.log("\n=== Historial de Llamadas ===");
    console.log("ID Operador | Nombre Operador | Estrellas | ID Cliente | Nombre Cliente");
    console.log("---------------------------------------------------------------");

    records.forEach(r => { //Imprimir cada registro
        console.log(`${r.idOperador} | ${r.nombreOperador} | ${r.estrellas} | ${r.idCliente} | ${r.nombreCliente}`);
    });

    if (!records || records.length === 0) {
        console.log("No hay registros para mostrar. Cargue un archivo primero.");
        return;
    }

}


// 2. Exportar historial a HTML
export function generarHistorialHTML(records){
    let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Historial de Llamadas</title>
            <style>
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>Historial de Llamadas</h1>
            <table>
                <tr>
                    <th>ID Operador</th>
                    <th>Nombre Operador</th>
                    <th>Estrellas</th>
                    <th>ID Cliente</th>
                    <th>Nombre Cliente</th>
                </tr>
        `;

    records.forEach(r => {
        html += `
            <tr>
                <td>${r.idOperador}</td>
                <td>${r.nombreOperador}</td>
                <td>${r.estrellas}</td>
                <td>${r.idCliente}</td>
                <td>${r.nombreCliente}</td>
            </tr>
        `;
    });

    html += `
            </table>
        </body>
        </html>
    `;
    
    if (!fs.existsSync("./reportes")) {
        fs.mkdirSync("./reportes");
    }

    fs.writeFileSync("./reportes/historial.html", html);
    console.log("Reporte HTML generado en /reportes/historial.html");
}

// 3. Exportar listado de Operadores
export function generarOperadoresHTML(records){
    let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Listado de Operadores</title>
            <style>
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>Listado de Operadores</h1>
            <table>
                <tr><th>ID Operador</th><th>Nombre Operador</th></tr>
    `;

    const operadores = {};
    records.forEach(r => operadores[r.idOperador] = r.nombreOperador);

    Object.entries(operadores).forEach(([id, nombre]) => {
        html += `<tr><td>${id}</td><td>${nombre}</td></tr>`;
    });

    html += `</table></body></html>`;

    if (!fs.existsSync("./reportes")) fs.mkdirSync("./reportes");
    fs.writeFileSync("./reportes/operadores.html", html);
    console.log("Reporte generado en /reportes/operadores.html");
}

// 4. Exportar listado de Clientes
export function generarClientesHTML(records){
    let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Listado de Clientes</title>
            <style>
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>Listado de Clientes</h1>
            <table>
                <tr><th>ID Cliente</th><th>Nombre Cliente</th></tr>
    `;

    const clientes = {};
    records.forEach(r => clientes[r.idCliente] = r.nombreCliente);

    Object.entries(clientes).forEach(([id, nombre]) => {
        html += `<tr><td>${id}</td><td>${nombre}</td></tr>`;
    });

    html += `</table></body></html>`;

    if (!fs.existsSync("./reportes")) fs.mkdirSync("./reportes");
    fs.writeFileSync("./reportes/clientes.html", html);
    console.log("Reporte generado en /reportes/clientes.html");
}

// 5. Exportar rendimiento de operadores
export function generarRendimientoHTML(records){
    const total = records.length;
    const conteo = {};

    records.forEach(r => {
        if (!conteo[r.idOperador]) conteo[r.idOperador] = { nombre: r.nombreOperador, llamadas: 0 };
        conteo[r.idOperador].llamadas++;
    });

    let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Rendimiento de Operadores</title>
            <style>
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>Rendimiento de Operadores</h1>
            <table>
                <tr><th>ID Operador</th><th>Nombre Operador</th><th>Llamadas</th><th>Porcentaje</th></tr>
    `;

    Object.entries(conteo).forEach(([id, info]) => {
        const porcentaje = ((info.llamadas / total) * 100).toFixed(2);
        html += `<tr><td>${id}</td><td>${info.nombre}</td><td>${info.llamadas}</td><td>${porcentaje}%</td></tr>`;
    });

    html += `</table></body></html>`;

    if (!fs.existsSync("./reportes")) fs.mkdirSync("./reportes");
    fs.writeFileSync("./reportes/rendimiento.html", html);
    console.log("Reporte generado en /reportes/rendimiento.html");
}


 // 6. Porcentaje de clasificación
export function porcentajeClasificacion(records) {
    let buenas = 0, medias = 0, malas = 0; // Contadores para cada tipo de clasificación
    records.forEach(r => { // Iterar sobre los registros
        if (r.estrellas >= 4) buenas++; // Contar buenas
        else if (r.estrellas >= 2) medias++; // Contar medias
        else malas++; // Contar malas
    });

    const total = records.length; // Total de registros
    console.log("\n=== Porcentaje de Clasificación ===");
    console.log(`Buenas: ${(buenas / total * 100).toFixed(2)}%`); // Calcular porcentaje de buenas
    console.log(`Medias: ${(medias / total * 100).toFixed(2)}%`); // Calcular porcentaje de medias
    console.log(`Malas: ${(malas / total * 100).toFixed(2)}%`); // Calcular porcentaje de malas
}

// 7. Llamadas por calificación
export function llamadasPorEstrellas(records){
    const conteo = [0, 0, 0, 0, 0, 0];
    records.forEach(r => conteo[r.estrellas]++); // Iterar sobre los registros
    console.log("\n=== Llamadas por Estrellas ===");
    for(let i = 1; i <= 5; i++){ // Iterar sobre las posibles calificaciones
        console.log(`${i} estrellas: ${conteo[i]}`); // Imprimir el conteo de llamadas por calificación
    }
}


