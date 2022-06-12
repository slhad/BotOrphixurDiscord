import { CommandInteraction} from "discord.js"
import { ClientHack } from ".."

/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
export const handleCommand = async (client: ClientHack, interaction: CommandInteraction) => {
    const command = client.commands.get(interaction.commandName)

    if (!command) return

    try {
        await (command as any).execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: "oula oula molo molo !", ephemeral: true })
    }
}
