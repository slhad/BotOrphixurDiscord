import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageActionRow, MessageEmbed,MessageSelectMenu} from "discord.js"
import { destinyIcons, membresTeam, voter} from "../constantes"

export default {
    data: new SlashCommandBuilder()
        .setName("donjon")
        .setDescription("Envoi un demande quelle DONJON ils veulent faire"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Sélectionnez le temps ou l'heure des DONJONS")
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
            .setColor("#FF00F3")
            .setAuthor({ name: "Sondage", iconURL: `${destinyIcons}/DestinyActivityModeDefinition_f20ebb76bee675ca429e470cec58cc7b.png`})
            .setDescription(`${membresTeam} ${voter}`)
            .setThumbnail(`${destinyIcons}/DestinyActivityModeDefinition_f20ebb76bee675ca429e470cec58cc7b.png`)
            .setTitle("Qui veut faire des Donjons")
            .addFields(
                { name: "Dualité", value: "Votez avec : 🤬", inline: true },
                { name: "Fosse de l’hérésie", value: "Votez avec : 🤯", inline: true },
                { name: "Le trône brisé", value: "Votez avec : 🤪", inline: true },
                { name: "Emprise de l’avarice", value: "Votez avec : 😱", inline: true },
                { name: "Prophétie", value: "Votez avec : 🤤", inline: true },
            )
            

        const message = await interaction.reply({ embeds: [embed],components: [row], fetchReply: true }) as Message 
        message.react("🤬")
        message.react("🤯")
        message.react("🤪")
        message.react("😱")
        message.react("🤤")
        
               
    }
}

