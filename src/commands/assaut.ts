import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName("assaut")
        .setDescription("Envoi un demande de D'ASSAUT"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Sélectionnez l'heure de L'ASSAUT")
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
            .setAuthor({ name: "Sondage", iconURL: "https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_38e26baf417d26bb3548d97bf4872b54.png" })
            .setDescription("<@&804813354493280276> \nVeuillez répondre à ce sondage par le biais de ces réactions :\n👍 ou 👎")
            .setThumbnail("https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_38e26baf417d26bb3548d97bf4872b54.png")
            .setTitle("Qui veut faire des assauts dans")

        const message = await interaction.reply({embeds: [embed], components: [row], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")

    }
}
