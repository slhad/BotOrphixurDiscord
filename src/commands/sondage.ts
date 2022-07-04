import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction, Message, MessageEmbed } from "discord.js"
import { destinyIcons, voter, membresTeam } from "../constantes"


export default {
    data: new SlashCommandBuilder()
        .setName("sondage")
        .setDescription("Crée un sondage pour une activité")
        .addStringOption(option => 
            option.setName("titre")
            .setDescription("Ajoutez le titre du sondage")
            .setRequired(true)
            ),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * 
     * 
     */
    async execute(interaction: CommandInteraction) {
        
        const string = interaction.options.getString("titre")

        const embed = new MessageEmbed()
        .setColor("#FF00D8")
        .setAuthor({ name: "Orphi Xur",iconURL:`${destinyIcons}/DestinyActivityModeDefinition_922ae83203f6134bae00937d12eab3a2.png`})
        .setDescription(`${membresTeam} ${voter}`)
        .setThumbnail(`${destinyIcons}/DestinyActivityModeDefinition_922ae83203f6134bae00937d12eab3a2.png`)
        .setTitle(`${string}`)
 
        const message = await interaction.reply({embeds: [embed], fetchReply: true }) as Message
        message.react("👍")
        message.react("👎")
        }
    }
