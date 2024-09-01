const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde con pong'),
    async execute(interaction) {
        await interaction.reply({ content: "Mensaje enviado en el canal", ephemeral: true });
        await interaction.channel.send({ content: '¡Pong!' });
    }
};
