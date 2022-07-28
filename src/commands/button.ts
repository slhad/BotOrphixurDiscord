import { SlashCommandBuilder } from "@discordjs/builders"
import { MessageEmbed, CommandInteraction} from "discord.js"
import { sendPaginatedEmbeds } from "discord.js-embed-pagination"


export default {
    data: new SlashCommandBuilder()
        .setName("banshee")
        .setDescription("information sur les article vendue par banshee"),

        /**
        * 
        * @param {CommandInteraction} interaction 
        */
         async execute(interaction: CommandInteraction)  {

               const titles = [{
                    title: "Titre 1",
                    thumbnail: "https://www.light.gg/Content/Images/lost-sector-icon.png",
                    des: "Description 1",
                    fieldsN: "Fieds 1",
                    fieldsV: "value 1"
                },{
                    title: "Titre 2",
                    thumbnail: "https://www.light.gg/Content/Images/nightfall-small-billboard-icon.png",
                    des: "Description 2",
                    fieldsN: "Fieds 2",
                    fieldsV: "value 2"
                },{
                    title: "Titre 3",
                    thumbnail: "https://www.light.gg/Content/Images/ada-icon.png",
                    des: "Description 3",
                    fieldsN: "Fieds 3",
                    fieldsV: "value 3"
                },{
                    title: "Titre 4",
                    thumbnail: "https://www.light.gg/Content/Images/banshee-icon.png",
                    des: "Description 4",
                    fieldsN: "Fieds 4",
                    fieldsV: "value 4"
                }]


            const embeds =  titles.map(title => new MessageEmbed().setTitle(title.title)
            .setThumbnail(title.thumbnail)
            .setDescription(title.des)
            .addFields({name: title.fieldsN, value:title.fieldsV, inline: true})
            )

            await sendPaginatedEmbeds(interaction, embeds)
            }
    }
}
