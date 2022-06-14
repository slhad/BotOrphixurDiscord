import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js"
import { destinyIcons2, membresTeam, voter } from "../constantes"

export default {
    data: new SlashCommandBuilder()
        .setName("master")
        .setDescription("Envoi un demande de GrandMaster"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Sélectionnez le temps ou l'heure des GRANDMASTER")
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
                        value: "ce soir à 21h30 ?",
                    },
                ])
        )
        const embed = new MessageEmbed()
            .setColor("#0046FF")
            .setAuthor({ name: "Sondage", iconURL: `${destinyIcons2}/48dda413d9f412ca2b10fd56a35a2665.png`})
            .setDescription(`${membresTeam} ${voter}`)
            .setThumbnail(`${destinyIcons2}/48dda413d9f412ca2b10fd56a35a2665.png`)
            .setTitle("Qui veut faire des GrandMaster ")

        const message = await interaction.reply({embeds: [embed], components: [row], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")

    }
}
