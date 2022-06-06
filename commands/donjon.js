const { SlashCommandBuilder, roleMention, UnsafeEmbedBuilder } = require('@discordjs/builders');
const { Client, CommandInteraction, MessageEmbed, Integration, ReactionEmoji, MessageReaction } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('donjon')
        .setDescription('Envoi un demande quelle DONJON ils veulent faire'),
        /**
         * 
         * @param {CommandInteraction} interaction 
         */
    async execute(interaction) {
        const choice = interaction.options.getString('choice')

        const embed = new MessageEmbed()
        .setColor('#FF00F3')
        .setAuthor({name: 'Sondage', iconURL:'https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_f20ebb76bee675ca429e470cec58cc7b.png'})
        .setDescription(`<@&804813354493280276> \nVeuillez répondre à ce sondage pas le biais de ces réaction :\n--------------------------------------------------------------------`)
        .setThumbnail('https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_f20ebb76bee675ca429e470cec58cc7b.png')
        .setTitle('Qui veut faire un Donjon ?')
        .addFields(
            {name: 'Dualité', value: 'Votez avec : 🤬', inline: true},
            {name: 'Fosse de l’hérésie', value: 'Votez avec : 🤯', inline: true},
            {name: 'Le trône brisé', value: 'Votez avec : 🤪', inline: true},
            {name: 'Emprise de l’avarice', value: 'Votez avec : 😱', inline: true},
            {name: 'Prophétie', value: 'Votez avec : 🤤', inline: true},
        )

        const message = await interaction.reply({embeds: [embed], fetchReply: true});
        message.react('🤬')
        message.react('🤯') 
        message.react('🤪') 
        message.react('😱')
        message.react('🤤')  
        
    }
    
}