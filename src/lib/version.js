const axios = require('axios');

const color = {
    red: '\x1b[31m',
    orange: '\x1b[38;5;202m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    pink: '\x1b[38;5;213m',
    torquise: '\x1b[38;5;45m',
    reset: '\x1b[0m'
}

function getTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function getLatestVersion() {
    try {
        const response = await axios.get('https://api.github.com/repos/Kkkermit/DiscordBotV14-template/releases/latest');
        const latestVersion = response.data.tag_name;
        return latestVersion;
    } catch (error) {
        console.error(`${color.torquise}[${getTimestamp()}] [ULTIMA_VERSIÓN] Error al recuperar la última versión, ${color.reset}`, error);
        return null;
    }
}

function checkVersion(currentVersion) {
    getLatestVersion().then((latestVersion) => {
        if (currentVersion < latestVersion) {
            console.log(`${color.torquise}[${getTimestamp()}] [ULTIMA_VERSIÓN] Atención, hay una nueva actualización disponible, por favor instálala - https://github.com/Kkkermit/DiscordBotV14-template`);
        } else {
            console.log(`${color.torquise}[${getTimestamp()}] [ULTIMA_VERSIÓN] Tienes la última versión del código.`);
        }
    });
}

module.exports = { getLatestVersion, checkVersion };
