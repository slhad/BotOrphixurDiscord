import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageEmbed } from "discord.js"


export default {
    data: new SlashCommandBuilder()
        .setName("donjon")
        .setDescription("Envoi un demande quelle DONJON ils veulent faire"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {

        const embed = new MessageEmbed()
            .setColor("#FF00F3")
            .setAuthor({ name: "Sondage", iconURL: "https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_f20ebb76bee675ca429e470cec58cc7b.png" })
            .setDescription("<@&804813354493280276> \nVeuillez répondre à ce sondage par le biais de ces réactions :\n--------------------------------------------------------------------")
            .setThumbnail("https://titles.trackercdn.com/destiny/common/destiny2_content/icons/DestinyActivityModeDefinition_f20ebb76bee675ca429e470cec58cc7b.png")
            .setTitle("Qui veut faire un Donjon ?")
            .addFields(
                { name: "Dualité", value: "Votez avec : 🤬", inline: true },
                { name: "Fosse de l’hérésie", value: "Votez avec : 🤯", inline: true },
                { name: "Le trône brisé", value: "Votez avec : 🤪", inline: true },
                { name: "Emprise de l’avarice", value: "Votez avec : 😱", inline: true },
                { name: "Prophétie", value: "Votez avec : 🤤", inline: true },
            )

        const message = await interaction.reply({ embeds: [embed], fetchReply: true }) as Message
        message.react("🤬")
        message.react("🤯")
        message.react("🤪")
        message.react("😱")
        message.react("🤤")

    }

}
