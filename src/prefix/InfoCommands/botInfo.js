const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
    name: "bot-info",
    aliases: ["bi", "botinfo"],
    async execute(message, client) {

        let serverCount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        const embed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setTitle(`__Información del Bot ${client.user.username}__`)
            .setAuthor({ name: `Información del Bot ${client.config.devBy}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `Información más actualizada sobre ${client.user.username}`})
            .setTimestamp()
            .addFields({ name: 'Desarrollador', value: `> \`${client.config.dev}\`` })
            .addFields({ name: 'Número de Servidores', value: `> \`${client.guilds.cache.size}\`` })
            .addFields({ name: 'Número de Miembros', value: `> \`${serverCount}\`` })
            .addFields({ name: 'Prefijo', value: `> \`${client.config.prefix}\`` })
            .addFields({ name: 'Comandos', value: `> \`${client.pcommands.size}\`` })
            .addFields({ name: 'Alias', value: `> \`${client.aliases.size}\`` })
            .addFields({ name: 'Comandos Slash', value: `> \`${client.commands.size}\`` })
            .addFields({ name: 'Latencia', value: `> \`${Math.round(client.ws.ping)}ms\`` })
            .addFields({ name: 'Tiempo Activo', value: `> \`\`\`${uptime}\`\`\`` })

        const refresh = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('refresh')
                    .setLabel('Actualizar')
                    .setStyle(ButtonStyle.Primary)
            )

        const sentMessage = await message.reply({ embeds: [embed], components: [refresh] })

        const collector = sentMessage.createMessageComponentCollector()
        collector.on('collect', async message => {
            if (message.customId == 'refresh') {
                try {

                    let serverCount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);

                    let totalSeconds = (client.uptime / 1000);
                    let days = Math.floor(totalSeconds / 86400);
                    totalSeconds %= 86400;
                    let hours = Math.floor(totalSeconds / 3600);
                    totalSeconds %= 3600;
                    let minutes = Math.floor(totalSeconds / 60);
                    let seconds = Math.floor(totalSeconds % 60);

                    let uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

                    const refreshEmbed = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle(`__Información del Bot ${client.user.username}__`)
                        .setAuthor({ name: `Información del Bot ${client.config.devBy}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setFooter({ text: `Información más actualizada sobre ${client.user.username}`})
                        .setTimestamp()
                        .addFields({ name: 'Desarrollador', value: `> \`${client.config.dev}\`` })
                        .addFields({ name: 'Número de Servidores', value: `> \`${client.guilds.cache.size}\`` })
                        .addFields({ name: 'Número de Miembros', value: `> \`${serverCount}\`` })
                        .addFields({ name: 'Prefijo', value: `> \`${client.config.prefix}\`` })
                        .addFields({ name: 'Comandos', value: `> \`${client.pcommands.size}\`` })
                        .addFields({ name: 'Alias', value: `> \`${client.aliases.size}\`` })
                        .addFields({ name: 'Comandos Slash', value: `> \`${client.commands.size}\`` })
                        .addFields({ name: 'Latencia', value: `> \`${Math.round(client.ws.ping)}ms\`` })
                        .addFields({ name: 'Tiempo Activo', value: `> \`\`\`${uptime}\`\`\`` })

                    await message.update({ embeds: [refreshEmbed], components: [refresh] })
                } catch (error) {
                    client.logs.error(`[BOT_INFO] Error al generar la actualización.`, error)
                }
            }
        })
    }
}
