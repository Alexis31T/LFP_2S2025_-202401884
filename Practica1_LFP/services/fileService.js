import fs from "fs";
import {parseLine} from "../utils/parser.js";

export function loadCallRecords(filePath){
    try{
        const data = fs.readFileSync(filePath, "utf-8"); // Leer el archivo
        const lines = data.split("\n").map(l => l.trim()).filter(l => l.length > 0); // Eliminar líneas vacías
        lines.shift(); // Eliminar encabezado
        return lines.map(parseLine).filter(r => r !== null); // Analizar líneas y eliminar nulos
    }catch(error){ // Manejar errores
        console.error("Error al cargar el archivo:", error.message); // Imprimir error en consola
        return []; // Retornar arreglo vacío en caso de error
    }
}