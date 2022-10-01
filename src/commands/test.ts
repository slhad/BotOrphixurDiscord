import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandInteraction} from "discord.js"
import db from "../index"
import { bungieAuthedFetch } from "../helpers/api"
import { getVendors } from "bungie-api-ts/destiny2/api"
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
              
                const accessToken:string = data.Token
                const members:string = data.UserB
                const ShipT:number = data.shipsT
                const character:string= data.Character

                const getVendorS = async() => {
                  return getVendors(bungieAuthedFetch(accessToken), {
                    characterId:character,
                    membershipType:ShipT,
                    destinyMembershipId:members,
                    components:[DestinyComponentType.Vendors]
                  }
                  )
                 
                }
                const response2 = await getVendorS()
                const test = response2.Response
              console.log(test)



        await interaction.reply({ fetchReply: true })
        }
    )}
  }
