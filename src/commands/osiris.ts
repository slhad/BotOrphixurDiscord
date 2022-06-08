import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName("osiris")
        .setDescription("Envoi un demande de OSIRIS"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Sélectionnez le temps ou l'heure de L'OSIRIS")
                .addOptions([
                    {
                        label: "dans",
                        description: "10m",
                        value: "dans 10 minute ?",
                        
                    },
                    {
                        label: "dans",
                        description: "30m",
                        value: "dans 30 minutes ?",
                        
                    },
                    {
                        label: "dans",
                        description: "1h00",
                        value: "dans 1h00 ?",
                    },
                    {
                        label: "ce",
                        description: "soir à 21h00",
                        value: "ce soir à 21h00 ?",
                    },
                    {
                        label: "ce",
                        description: "soir à 21h30 ou plus",
                        value: "ce soir à 21h30 ou plus ?",
                    },

                ])
        )
        const embed = new MessageEmbed()
            .setColor("#FFB200")
            .setAuthor({ name: "Sondage", iconURL: "https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_e35792b49b249ca5dcdb1e7657ca42b6.png" })
            .setDescription("<@&804813354493280276> \nVeuillez répondre à ce sondage par le biais de ces réactions :\n👍 ou 👎")
            .setThumbnail("https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_e35792b49b249ca5dcdb1e7657ca42b6.png")
            .setTitle("Qui veut faire de l'Osiris")

        const message = await interaction.reply({ embeds: [embed],components: [row], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")

    }
}
