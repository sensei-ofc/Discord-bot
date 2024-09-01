module.exports = (db) => {

    // Ctrl + C
    process.on('SIGINT', () => {
        console.log();
        error('SIGINT: Saliendo...');
        process.exit();
    });

    // Error estándar
    process.on('uncaughtException', (err) => {
        error(`EXCEPCIÓN NO CONTROLADA: ${err.stack}`);
    });

    // Proceso terminado
    process.on('SIGTERM', () => {
        error('SIGTERM: Cerrando la base de datos y saliendo...');
        process.exit();
    });

    // Rechazo no manejado
    process.on('unhandledRejection', (err) => {
        error(`RECHAZO NO MANEJADO: ${err.stack}`);
    });

    // Advertencias de deprecación
    process.on('warning', (warning) => {
        warn(warning);
    });

    // Errores de referencia
    process.on('uncaughtReferenceError', (err) => {
        error(err.stack);
    });

};

const client = require('../index')

client.logs = require('../utils/logs')

function error(message) {
    client.logs.error(`[ERROR] ${message}`);
}

function warn(message) {
    client.logs.warn(`[ADVERTENCIA] ${message}`);
}

client.logs.success(`[PROCESO] Controladores de proceso cargados.`);
