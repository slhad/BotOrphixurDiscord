import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageEmbed } from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName("osiris")
        .setDescription("Envoi un demande de OSIRIS"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        const embed = new MessageEmbed()
            .setColor("#FFB200")
            .setAuthor({ name: "Sondage", iconURL: "https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_e35792b49b249ca5dcdb1e7657ca42b6.png" })
            .setDescription("<@&804813354493280276> \nVeuillez répondre à ce sondage par le biais de ces réactions :\n👍 ou 👎")
            .setThumbnail("https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_e35792b49b249ca5dcdb1e7657ca42b6.png")
            .setTitle("Qui veut faire du Osiris ?")

        const message = await interaction.reply({ embeds: [embed], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")

    }
}
