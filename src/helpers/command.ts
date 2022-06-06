import { CommandInteraction } from "discord.js"
import { ClientHack } from ".."
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
export const handleCommand = async (client: ClientHack, interaction: CommandInteraction) => {
    const command = client.commands.get(interaction.commandName)

    if (!command) return

    client.on("interactionCreate", async interaction => {
        if (!interaction.isSelectMenu()) return
        console.log(interaction)

        if (interaction.customId === "select") {
            await interaction.update({ content: "Le temps a été sélectionné", components: [] })
        }
    })

    try {
        await (command as any).execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: "oula oula molo molo !", ephemeral: true })
    }
}

