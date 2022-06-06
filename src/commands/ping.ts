import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message } from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Renvoie le nombre de ping"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction: CommandInteraction) {
        await interaction.reply("pong")

        const message = await interaction.fetchReply() as Message

        return interaction.editReply(`Le message a mis ${message.createdTimestamp - interaction.createdTimestamp} ms.\nTon pin est de ${interaction.client.ws.ping} ms.`)
    }
}