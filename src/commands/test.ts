import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction,  MessageEmbed } from "discord.js"
import db from "../index"
import { getPublicVendors } from "bungie-api-ts/destiny2/api"
import { bungieAuthedFetch } from "../helpers/api"
import { DestinyComponentType } from "bungie-api-ts/destiny2/interfaces" 


export default {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("test"), 
    /**
     * 
     * @param {CommandInteraction} interaction 
     * 
     * 
     */
    async execute(interaction: CommandInteraction) {
        
        db.get ("SELECT * FROM Discord", async (err,data)=> {
            if(err)
                throw err
                const Tokent:string = data.Token
                
                
                const response = await getPublicVendors(bungieAuthedFetch(Tokent), {
                    components:[DestinyComponentType.Vendors,DestinyComponentType.VendorSales]
                     
                })
                const test = response.Response
            console.log(test)
            
           
              
                

                  })

        const embed = new MessageEmbed()
        .setColor("#FF00D8")
        .setAuthor({ name: "Orphi Xur",iconURL:"https://cdn.discordapp.com/app-icons/980069176561516604/46897437315f9176ef65d5aedc2a7697.png?size=256"})
        .setDescription("Connecte toi :  \n  [ICI](https://localhost:8000/register-start?discordId=)")
        .setThumbnail("https://cdn.discordapp.com/app-icons/980069176561516604/46897437315f9176ef65d5aedc2a7697.png?size=256")
        .setTitle("Connect toi et approuve moi !")

        await interaction.reply({ embeds: [embed], fetchReply: true })
        }
    }
