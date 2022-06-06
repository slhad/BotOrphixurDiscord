import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageEmbed } from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName("raid")
        .setDescription("Envoi un demande de RAID"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        const embed = new MessageEmbed()
            .setColor("#0017FF")
            .setAuthor({ name: "Sondage", iconURL: "https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_bfe80e3dafe6686a9dc42df0606bdc9b.png" })
            .setDescription("<@&804813354493280276> \nVeuillez répondre à ce sondage pas le biais de ces réaction :\n👍 ou 👎")
            .setThumbnail("https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_bfe80e3dafe6686a9dc42df0606bdc9b.png")
            .setTitle("Qui veut faire un raid ?")

        const message = await interaction.reply({ embeds: [embed], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")

    }
}