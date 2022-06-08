import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js"

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
                .setPlaceholder("Sélectionnez l'heure de la GRANDMASTER")
                .addOptions([
                    {
                        label: "dans",
                        description: "10m",
                        value: "10 minute ?",
                        
                    },
                  
                    {
                        label: "dans",
                        description: "20m",
                        value: "20 minute ?",
                    },
                    {
                        label: "dans",
                        description: "30m",
                        value: "30 minutes ?",
                        
                    },
                  
                    {
                        label: "dans",
                        description: "40m",
                        value: "40 minutes ?",
                    },
                ])
        )
        const embed = new MessageEmbed()
            .setColor("#0046FF")
            .setAuthor({ name: "Sondage", iconURL: "https://www.bungie.net/common/destiny2_content/icons/48dda413d9f412ca2b10fd56a35a2665.png" })
            .setDescription("<@&804813354493280276> \nVeuillez répondre à ce sondage par le biais de ces réactions :\n👍 ou 👎")
            .setThumbnail("https://www.bungie.net/common/destiny2_content/icons/48dda413d9f412ca2b10fd56a35a2665.png")
            .setTitle("Qui veut faire des GrandMaster dans")

        const message = await interaction.reply({embeds: [embed], components: [row], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")

    }
}
