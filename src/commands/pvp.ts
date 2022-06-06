import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageEmbed } from "discord.js"


export default {
    data: new SlashCommandBuilder()
        .setName("pvp")
        .setDescription("Envoi un demande de PVP"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        const embed = new MessageEmbed()
            .setColor("#CC0000")
            .setAuthor({ name: "Sondage", iconURL: "https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_fb3e9149c43f7a2e8f8b66cbea7845fe.png" })
            .setDescription("<@&804813354493280276> \nVeuillez répondre à ce sondage pas le biais de ces réaction :\n👍 ou 👎")
            .setThumbnail("https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_fb3e9149c43f7a2e8f8b66cbea7845fe.png")
            .setTitle("Qui veut faire du PVP ?")

        const message = await interaction.reply({ embeds: [embed], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")

    }
}