const config = require('../config');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const mongodbURL = process.env.mongodb;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        client.logs.info(`[SCHEMAS] Iniciando la carga de esquemas...`);

        if (!mongodbURL) return;

        mongoose.set("strictQuery", false);
        await mongoose.connect(mongodbURL || ``, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        const color = {
            red: '\x1b[31m',
            orange: '\x1b[38;5;202m',
            yellow: '\x1b[33m',
            green: '\x1b[32m',
            blue: '\x1b[34m',
            pink: '\x1b[38;5;213m',
            torquise: '\x1b[38;5;45m',
            purple: '\x1b[38;5;57m',
            reset: '\x1b[0m'
        };
        
        function getTimestamp() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        if (mongoose.connect) {
            client.logs.success('[DATABASE] Conectado a MongoDB con éxito.')

            const schemaFolder = path.join(__dirname, '../schemas'); 
            fs.readdir(schemaFolder, (err, files) => {
                if (err) {
                    client.logs.error('[ERROR] Error al leer la carpeta de esquemas:', err);
                    return;
                }
                client.logs.success(`[SCHEMAS] Cargados ${files.length} archivos de esquemas.`);
            });
        }

        console.log(`${color.pink}[${getTimestamp()}] =========================================================================================================`);
        console.log(`${color.pink}[${getTimestamp()}] ██████╗ ███████╗██╗   ██╗    ██████╗ ██╗   ██╗    ██╗  ██╗██╗  ██╗███████╗██████╗ ███╗   ███╗██╗████████╗`);
        console.log(`${color.pink}[${getTimestamp()}] ██╔══██╗██╔════╝██║   ██║    ██╔══██╗╚██╗ ██╔╝    ██║ ██╔╝██║ ██╔╝██╔════╝██╔══██╗████╗ ████║██║╚══██╔══╝`);
        console.log(`${color.pink}[${getTimestamp()}] ██║  ██║█████╗  ██║   ██║    ██████╔╝ ╚████╔╝     █████╔╝ █████╔╝ █████╗  ██████╔╝██╔████╔██║██║   ██║   `);
        console.log(`${color.pink}[${getTimestamp()}] ██║  ██║██╔══╝  ╚██╗ ██╔╝    ██╔══██╗  ╚██╔╝      ██╔═██╗ ██╔═██╗ ██╔══╝  ██╔══██╗██║╚██╔╝██║██║   ██║   `);
        console.log(`${color.pink}[${getTimestamp()}] ██████╔╝███████╗ ╚████╔╝     ██████╔╝   ██║       ██║  ██╗██║  ██╗███████╗██║  ██║██║ ╚═╝ ██║██║   ██║   `);
        console.log(`${color.pink}[${getTimestamp()}] ╚═════╝ ╚══════╝  ╚═══╝      ╚═════╝    ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝   `);
        console.log(`${color.pink}[${getTimestamp()}] =========================================================================================================`);

        client.logs.logging(`[BOT] ¡${client.user.username} ha sido lanzado!`);
        client.logs.info(`[EVENTS] Iniciando la carga de eventos...`)
        client.logs.success(`[EVENTS] Cargados ${client.eventNames().length} eventos.`);
        
        const triggerFolder = path.join(__dirname, '../triggers'); 
        fs.readdir(triggerFolder, (err, files) => {
            if (err) {
                client.logs.error('Error al leer la carpeta de triggers:', err);
                return;
            }
            client.logs.info(`[TRIGGERS] Iniciando la carga de triggers...`);
            client.logs.success(`[TRIGGERS] Cargados ${files.length} archivos de triggers.`);
        });

        require('events').EventEmitter.defaultMaxListeners = config.eventListeners;
    },
};
