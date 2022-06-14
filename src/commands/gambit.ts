import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js"
import { destinyIcons, membresTeam, voter } from "../constantes"

export default {
    data: new SlashCommandBuilder()
        .setName("gambit")
        .setDescription("Envoi un demande de GAMBIT"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Sélectionnez le temps ou l'heure du Gambit")
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
                        description: "soir à 21h30",
                        value: "ce soir à 21h30 ou plus ?",
                    },

                ])
        )
        const embed = new MessageEmbed()
            .setColor("#00FF08")
            .setAuthor({ name: "Sondage", iconURL: `${destinyIcons}/DestinyActivityModeDefinition_96f7e9009d4f26e30cfd60564021925e.png`})
            .setDescription(`${membresTeam} ${voter}`)
            .setThumbnail(`${destinyIcons}/DestinyActivityModeDefinition_96f7e9009d4f26e30cfd60564021925e.png`)
            .setTitle("Qui veut faire du Gambit ?")

        const message = await interaction.reply({ embeds: [embed],components: [row], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")

    }
}
