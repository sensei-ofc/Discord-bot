const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (
            message.author.bot || !message.guild || message.system || message.webhookId
        )
    return;

    if (!message.content.startsWith(client.config.prefix)) return;
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);

    const color = {
        red: '\x1b[31m',
        orange: '\x1b[38;5;202m',
        yellow: '\x1b[33m',
        green: '\x1b[32m',
        blue: '\x1b[34m',
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

    let cmd = args.shift().toLowerCase();
        if (cmd.length === 0) return;

    let command = client.pcommands.get(cmd);
        if (!command) command = client.pcommands.get(client.aliases.get(cmd));

        if (!command) {
            try {

                const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle(`Sistema de prefijos de ${client.user.username}`)
                .setDescription(`> El comando que intentaste usar **no existe**. \n> Para ver **todos** los comandos, usa \`\`${client.config.prefix}help\`\``);

                return message.reply({ embeds: [embed], ephemeral: true});
            } catch (error) {
                client.logs.error(`[PREFIX_ERROR] Error al enviar el embed de 'prefijo no encontrado'.`, error);
            };
        };

        if (!command) return;

        if (command.args && !args.length) {
            return message.reply(`No proporcionaste ningún \`\`argumento\`\`.`);
        }

        try {
            command.execute(message, client, args);
        } catch (error) {
            console.error(`${color.red}[${getTimestamp()}] [MESSAGE_CREATE] Error al ejecutar el comando. \n${color.red}[${getTimestamp()}] [MESSAGE_CREATE] Por favor, verifica que estás usando el método correcto de ejecución: "async execute(message, client, args)":`, error);

            const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`¡Hubo un error al ejecutar este comando!\n\`\`\`${error}\`\`\``)

            await message.reply({ embeds: [embed], ephemeral: true});
        }
    },
};
