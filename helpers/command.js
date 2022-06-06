const { Client, CommandInteraction } = require("discord.js");
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
const handleCommand = async (client, interaction) => {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    
        client.on('interactionCreate', async interaction => {
        if (!interaction.isSelectMenu()) return;
        console.log(interaction);
    
        if (interaction.customId === 'select') {
            await interaction.update({content: 'Le temps a été sélectionner', components: [] })
        }
    })

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "oula oula molo molo !", ephemeral: true })
    }
}

module.exports = handleCommand;
