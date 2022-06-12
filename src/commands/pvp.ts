import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js"
import { destinyIcons ,membresTeam} from "../constantes"

export default {
    data: new SlashCommandBuilder()
        .setName("pvp")
        .setDescription("Envoi un demande de PVP"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Sélectionnez le temps ou l'heure du PVP")
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
            .setColor("#CC0000")
            .setAuthor({ name: "Sondage", iconURL: `${destinyIcons}/DestinyActivityModeDefinition_fb3e9149c43f7a2e8f8b66cbea7845fe.png`})
            .setDescription(`${membresTeam} \nVeuillez répondre à ce sondage par le biais de ces réactions :\n👍 ou 👎`)
            .setThumbnail(`${destinyIcons}/DestinyActivityModeDefinition_fb3e9149c43f7a2e8f8b66cbea7845fe.png`)
            .setTitle("Qui veut faire du PVP")

        const message = await interaction.reply({ embeds: [embed],components: [row], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")

    }
}
