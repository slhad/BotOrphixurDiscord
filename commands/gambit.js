const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction, MessageEmbed, Integration, ReactionEmoji, MessageReaction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gambit')
        .setDescription('Envoi un demande de GAMBIT'),
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
    async execute(interaction) {
        const embed = new MessageEmbed()
        .setColor('#00FF08')
        .setAuthor({name: 'Sondage', iconURL:'https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_96f7e9009d4f26e30cfd60564021925e.png'})
        .setDescription(`<@&804813354493280276> \nVeuillez répondre à ce sondage pas le biais de ces réaction :\n👍 ou 👎`)
        .setThumbnail('https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_96f7e9009d4f26e30cfd60564021925e.png')
        .setTitle('Qui veut faire du Gambit ?')

        const message = await interaction.reply({embeds: [embed], fetchReply: true});
            message.react('👍')
            message.react('👎')
        
    }
}