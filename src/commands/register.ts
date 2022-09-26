import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction,  MessageEmbed } from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName("register")
        .setDescription("Enregistre toi"), 
    /**
     * 
     * @param {CommandInteraction} interaction 
     * 
     * 
     */
    async execute(interaction: CommandInteraction) {
        
            const GetIdD = interaction.member
            const JsonGetIdD = (JSON.stringify(GetIdD?.user.id))
            const discordId = JsonGetIdD.replace("\"","").replace("\"","")

            

        const embed = new MessageEmbed()
        .setColor("#FF00D8")
        .setAuthor({ name: "Orphi Xur",iconURL:"https://cdn.discordapp.com/app-icons/980069176561516604/46897437315f9176ef65d5aedc2a7697.png?size=256"})
        .setDescription(`Connecte toi :  \n  [ICI](https://localhost:8000/register-start?discordId=${discordId})`)
        .setThumbnail("https://cdn.discordapp.com/app-icons/980069176561516604/46897437315f9176ef65d5aedc2a7697.png?size=256")
        .setTitle("Connect toi et approuve moi !")

        await interaction.reply({ embeds: [embed], fetchReply: true })
        }
    }
