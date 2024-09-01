const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Comando de prueba'),
    async execute(interaction, client) {

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`Comando de prueba exitoso | ¡${client.user.username} está en línea!`)

        await interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [embed] });
    }
};
