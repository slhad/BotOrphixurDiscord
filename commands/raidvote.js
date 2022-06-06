const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction, MessageEmbed, Integration, ReactionEmoji, MessageReaction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('raidvote')
        .setDescription('Envoi un demande quelle RAID ils veulent faire'),
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
    async execute(interaction) {
        const embed = new MessageEmbed()
        .setColor('#0017FF')
        .setAuthor({name: 'Sondage', iconURL:'https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_bfe80e3dafe6686a9dc42df0606bdc9b.png'})
        .setDescription(`<@&804813354493280276> \nVeuillez répondre à ce sondage pas le biais de ces réaction :\n--------------------------------------------------------------------`)
        .setThumbnail('https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_bfe80e3dafe6686a9dc42df0606bdc9b.png')
        .setTitle('On fait quelle RAID ?')
        .addFields(
            {name: 'Jardin du salut', value: 'Votez avec : 🤬', inline: true},
            {name: 'Dernier voeux', value: 'Votez avec : 🤯', inline: true},
            {name: 'Crypte de la pierre', value: 'Votez avec : 🤪', inline: true},
            {name: 'Serment du disciple', value: 'Votez avec : 😱', inline: true},
            {name: 'Caveau de verre', value: 'Votez avec : 🤤', inline: true},
        )

        const message = await interaction.reply({embeds: [embed], fetchReply: true});
        message.react('🤬')
        message.react('🤯') 
        message.react('🤪') 
        message.react('😱')
        message.react('🤤')      
    }
    
}