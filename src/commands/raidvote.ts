import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageActionRow, MessageEmbed, MessageSelectMenu } from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName("raidvote")
        .setDescription("Envoi un demande quelle RAID ils veulent faire"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Sélectionnez le temps ou l'heure du RAID")
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
            .setColor("#0017FF")
            .setAuthor({ name: "Sondage", iconURL: "https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_bfe80e3dafe6686a9dc42df0606bdc9b.png" })
            .setDescription("<@&804813354493280276> \nVeuillez répondre à ce sondage par le biais de ces réactions :\n--------------------------------------------------------------------")
            .setThumbnail("https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_bfe80e3dafe6686a9dc42df0606bdc9b.png")
            .setTitle("On fait quelle RAID")
            .addFields(
                { name: "Jardin du salut", value: "Votez avec : 🤬", inline: true },
                { name: "Dernier voeux", value: "Votez avec : 🤯", inline: true },
                { name: "Crypte de la pierre", value: "Votez avec : 🤪", inline: true },
                { name: "Serment du disciple", value: "Votez avec : 😱", inline: true },
                { name: "Caveau de verre", value: "Votez avec : 🤤", inline: true },
            )

        const message = await interaction.reply({embeds: [embed], components: [row], fetchReply: true }) as Message
        message.react("🤬")
        message.react("🤯")
        message.react("🤪")
        message.react("😱")
        message.react("🤤")
    }

}
