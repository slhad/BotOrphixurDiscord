import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageEmbed } from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName("gambit")
        .setDescription("Envoi un demande de GAMBIT"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        const embed = new MessageEmbed()
            .setColor("#00FF08")
            .setAuthor({ name: "Sondage", iconURL: "https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_96f7e9009d4f26e30cfd60564021925e.png" })
            .setDescription("<@&804813354493280276> \nVeuillez répondre à ce sondage par le biais de ces réactions :\n👍 ou 👎")
            .setThumbnail("https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_96f7e9009d4f26e30cfd60564021925e.png")
            .setTitle("Qui veut faire du Gambit ?")

        const message = await interaction.reply({ embeds: [embed], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")

    }
}
