import readline from "readline";
import { loadCallRecords } from "./fileService.js";
import { 
    mostrarHistorialConsola,
    generarHistorialHTML,
    generarOperadoresHTML,
    generarClientesHTML,
    generarRendimientoHTML,
    porcentajeClasificacion,
    llamadasPorEstrellas
} from "./reportService.js"; 

export function startMenu() {
    let records = []; // Array para almacenar los registros de llamadas

    const rl = readline.createInterface({ // Crear interfaz de lectura
        input: process.stdin, // Entrada estándar
        output: process.stdout // Salida estándar
    });

    function showMenu() {
        console.log("\n--- Menú de Opciones ---");
        console.log("1. Cargar registros de llamadas");
        console.log("2. Mostrar historial en consola");
        console.log("3. Exportar historial en HTML");
        console.log("4. Listado de Operadores");
        console.log("5. Listado de Clientes");
        console.log("6. Rendimiento de Operadores");
        console.log("7. Porcentaje de Clasificación");
        console.log("8. Llamadas por Calificación");
        console.log("9. Salir");

        rl.question("Seleccione una opción: ", handleMenuOption);
    }

    function handleMenuOption(option) {
        switch(option) {
            case '1':
               rl.question("Ingrese la ruta del archivo CSV (ej: ./data/llamadas.csv): ", (ruta) => { // Solicitar ruta del archivo CSV
                    records = loadCallRecords(ruta); // Cargar registros desde el archivo CSV
                    if (records.length > 0) { // Verificar si se cargaron registros
                        console.log(`Se cargaron ${records.length} registros desde ${ruta}`); 
                    }
                    showMenu();
                });
                return; // Finalizar la función
            case '2':
            mostrarHistorialConsola(records);
                break;
            case '3':
            generarHistorialHTML(records);
                break;
            case '4':
            generarOperadoresHTML(records);
                break;
            case '5':
            generarClientesHTML(records);
                break;
            case '6':
            generarRendimientoHTML(records);
                 break;
            case '7':
                porcentajeClasificacion(records);
                break;
            case '8':
                llamadasPorEstrellas(records);
                break;
            case '9':
                console.log("Saliendo... ¡Adiosito!");
                rl.close();
                return;
            default:
                console.log("Opción no válida. Intente de nuevo.");
        }
        showMenu();
    }

    showMenu();
}