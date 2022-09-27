import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction,  MessageEmbed } from "discord.js"
import db from "../index"
import { bungieAuthedFetch } from "../helpers/api"
import { getProfile, getVendors } from "bungie-api-ts/destiny2/api"
import { DestinyComponentType } from "bungie-api-ts/destiny2"

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
    async execute(interaction: CommandInteraction,) {
        
        db.get ("SELECT * FROM Discord", async (err,data)=> {
            if(err)
                throw err
              
                const access_Token = data.Token
                const members:string = data.UserB
                const ShipT:number = data.shipsT

                 const getDestinyProfile = async () => {
                  return getProfile(bungieAuthedFetch(access_Token), {
                    membershipType: ShipT,
                    destinyMembershipId: members,
                    components: [DestinyComponentType.Characters,DestinyComponentType.Profiles]
                  })
                }
                const responce = await getDestinyProfile()
                const getIdCharter = responce.Response.profile.data?.characterIds[0]
                const MembersId = (JSON.stringify(getIdCharter)).replace("\"","").replace("\"","")
                console.log(MembersId)

                const getVendorS = async() =>{
                  return getVendors(bungieAuthedFetch(access_Token), {
                    characterId:MembersId,
                    membershipType:ShipT,
                    destinyMembershipId:members,
                    components:[DestinyComponentType.Vendors,DestinyComponentType.VendorSales]
                  })
                }
                const response2 = await getVendorS()
                const test = response2.Response
              console.log(test)

        const embed = new MessageEmbed()
        .setColor("#FF00D8")
        .setAuthor({ name: "Orphi Xur",iconURL:"https://cdn.discordapp.com/app-icons/980069176561516604/46897437315f9176ef65d5aedc2a7697.png?size=256"})
        .setDescription("Connecte toi :  \n  [ICI](https://localhost:8000/register-start?discordId=)")
        .setThumbnail("https://cdn.discordapp.com/app-icons/980069176561516604/46897437315f9176ef65d5aedc2a7697.png?size=256")
        .setTitle("Connect toi et approuve moi !")

        await interaction.reply({ embeds: [embed], fetchReply: true })
        }
    )}

  }
