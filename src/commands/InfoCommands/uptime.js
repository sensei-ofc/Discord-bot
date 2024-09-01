const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-uptime')
        .setDescription('Muestra el tiempo de actividad actual del bot.'),
    async execute(interaction, client) {

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
 
        let uptime = `**${days}**d **${hours}**h **${minutes}**m **${seconds}**s`;

        const uptimeEmbed = new EmbedBuilder()
            .setAuthor({ name: `Tiempo de actividad de ${client.user.username} ${client.config.devBy}`})
            .setColor(client.config.embedColor)
            .setTitle('⏳ **Tiempo de actividad actual**')
            .addFields({ name: "Tiempo de actividad", value: `> ${uptime}`})
            .setThumbnail(client.user.avatarURL())
            .setFooter({ text: 'Comando de tiempo de actividad' })
            .setTimestamp()

        await interaction.reply({ content: "Mensaje enviado en el canal", ephemeral: true });
        await interaction.channel.send({ embeds: [uptimeEmbed] });
    },
};
