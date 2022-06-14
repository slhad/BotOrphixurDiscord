import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js"
import { destinyIcons ,membresTeam, voter} from "../constantes"

export default {
    data: new SlashCommandBuilder()
        .setName("nuitnoire")
        .setDescription("Envoi un demande de NUIT NOIRE"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Sélectionnez le temps ou l'heure des NUITS NOIRE")
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
                        description: "40m",
                        value: "dans 1h00 ?",
                    },
                    {
                        label: "ce",
                        description: "soir à 21h00",
                        value: "ce soir à 21h00 ?",
                    },
                    {
                        label: "ce",
                        description: "soir à 21h30",
                        value: "ce soir à 21h30 ?",
                    },
                ])
        )
        const embed = new MessageEmbed()
            .setColor("#FFFFFF")
            .setAuthor({ name: "Sondage", iconURL: `${destinyIcons}/DestinyActivityModeDefinition_234e7e18549d5eae2ddb012f2bcb203a.png`})
            .setDescription(`${membresTeam} ${voter}`)
            .setThumbnail(`${destinyIcons}/DestinyActivityModeDefinition_234e7e18549d5eae2ddb012f2bcb203a.png`)
            .setTitle("Qui veut faire des nuit noire")

        const message = await interaction.reply({embeds: [embed], components: [row], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")

    }
}
