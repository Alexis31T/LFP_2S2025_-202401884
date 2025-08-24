import CallRecord from "../models/callRecord.js";
export function parseLine(line){
    const parts = line.split(",");
    
    if (parts.length < 5) {
        return null;
    }

    // separar la columna de estrellas por ;
    const estrellasArray = parts[2].split(";");
    const estrellasCount = estrellasArray.filter(e => e.trim() === "x").length;


    return new CallRecord(
        parseInt(parts[0]),
        parts[1].trim(),
        estrellasCount,   // número entre 0 y 5
        parseInt(parts[3]),
        parts[4].trim()
    );
}