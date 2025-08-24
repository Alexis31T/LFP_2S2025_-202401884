export default class callRecord{ // Clase para almacenar los registros de llamadas
    constructor(idOperador, nombreOperador, estrellas, idCliente, nombreCliente){ // Constructor de la clase
        this.idOperador = idOperador; // ID del operador
        this.nombreOperador = nombreOperador; // Nombre del operador
        this.estrellas = estrellas; // Estrellas del operador
        this.idCliente = idCliente; // ID del cliente
        this.nombreCliente = nombreCliente; // Nombre del cliente
    }
}