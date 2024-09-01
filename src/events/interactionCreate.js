const { Interaction, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

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

        const command = client.commands.get(interaction.commandName);

        if (!command) return;
        
        try {
            await command.execute(interaction, client);
        } catch (error) {

            console.error(`${color.red}[${getTimestamp()}] [INTERACTION_CREATE] Error al ejecutar el comando. \n${color.red}[${getTimestamp()}] [INTERACTION_CREATE] Por favor, verifica que estás usando el método correcto de ejecución: "async execute(interaction, client)":`, error);

            const embed = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`¡Hubo un error al ejecutar este comando!\n\`\`\`${error}\`\`\``);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } 
    },
};
