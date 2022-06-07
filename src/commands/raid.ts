import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName("raid")
        .setDescription("Envoi un demande de RAID"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Sélectionnez l'heure du RAID")
                .addOptions([
                    {
                        label: "À",
                        description: "21h00",
                        value: "21h00 ?",
                        
                    },
                  
                    {
                        label: "À",
                        description: "21h30",
                        value: "21h30 ?",
                    },
                    {
                        label: "À",
                        description: "22h00",
                        value: "22h00",
                        
                    },
                  
                    {
                        label: "À",
                        description: "22h30",
                        value: "22h30",
                    },
                ])
        )
        const embed = new MessageEmbed()
            .setColor("#0017FF")
            .setAuthor({ name: "Sondage", iconURL: "https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_bfe80e3dafe6686a9dc42df0606bdc9b.png" })
            .setDescription("<@&804813354493280276> \nVeuillez répondre à ce sondage par le biais de ces réactions :\n👍 ou 👎")
            .setThumbnail("https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_bfe80e3dafe6686a9dc42df0606bdc9b.png")
            .setTitle("Qui veut faire un raid à")

        const message = await interaction.reply({embeds: [embed], components: [row], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")

    }
}
