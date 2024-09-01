const { Events, EmbedBuilder } = require("discord.js");
const config = require('../config');

module.exports = {
    name: Events.MessageCreate,

    async execute(message, client, interaction) {
        if (message.author.bot) return;
        if (message.content.includes(`<@${client.user.id}>`))  {
        
        const commands = client.commands;
        const commandList = commands.map((command) => `> **/${command.data.name}**: ${command.data.description}`).join('\n');
        
        const pingEmbed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} ${client.config.devBy}`})
            .setTitle(`¡Hola! Soy ${client.user.username}, ¡mira mis comandos a continuación!`)
            .setDescription(`${commandList}`)
            .setColor(config.embedColor)
            .setFooter({ text: `Supervisando ${client.commands.size} comandos.`})
            .setTimestamp();

        return message.reply({ content: `¡Hola, <@${message.author.id}> me mencionó!`, embeds: [pingEmbed]});
        
        }
    },
};
