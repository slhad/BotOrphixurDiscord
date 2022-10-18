import { SlashCommandBuilder } from "@discordjs/builders"
import { MessageEmbed, CommandInteraction } from "discord.js"
import { sendPaginatedEmbeds } from "discord.js-embed-pagination"
import { destinyBasePath } from "../constantes"
import { getRefreshA } from "../helpers/refresh"
import { getVendorDetailX } from "../helpers/vendor"
import { open } from "sqlite"
import sqlite3 from "sqlite3"

export default {
    data: new SlashCommandBuilder()
        .setName("xur")
        .setDescription("information sur les article vendue par xur"),
    /**
    * 
    * @param {CommandInteraction} interaction 
    */
    async execute(interaction: CommandInteraction) {
        const user = interaction.user.id
        const discordId = (JSON.stringify(user)).replaceAll("\"", "")

        async function getuser() {
            const user = interaction.user.id
            const discordId = (JSON.stringify(user)).replaceAll("\"", "")
            const db1 = await open({
                filename: "main.db",
                driver: sqlite3.Database
            })
            const UserD = await db1.get(`SELECT userD FROM Discord WHERE userD = "${discordId}"`)
            return { userD: UserD }
        }

        await interaction.deferReply()
        const User = await getuser()

        if (User.userD == undefined) {

            return interaction.editReply("Tu n'es pas enregister fait la commande **/register** pour t'enregister")

        } else {

            await getRefreshA(discordId)
            const Response = await getVendorDetailX()

            const titles: {
                title: string, img: string, thumbnail: string, des: string, footer?: string,
                fields_1?: { name: string, value: string }[],
                fields_2?: { name: string, value: string }[],
                fields_3?: { name: string, value: string }[],
                fields_4?: { name: string, value: string }[],
                fields_5?: { name: string, value: string }[],
                fields_6?: { name: string, value: string }[],
                fields_7?: { name: string, value: string }[],
                fields_8?: { name: string, value: string }[],
                fields_9?: { name: string, value: string }[],
                fields_10?: { name: string, value: string }[],
                fields_11?: { name: string, value: string }[],
                fields_12?: { name: string, value: string }[]
            }[] = [{
                title: Response?.vendeur.name,
                thumbnail: `${destinyBasePath}${Response?.vendeur.originalIcon}`,
                des: `Je suis à ${Response?.destination}\n\u200B` + "" + `\n\u200B${Response?.vendeur.description}`,
                img: `${destinyBasePath}${Response?.vendeur.largeIcon}`,
            }]

            for (const arme_1 of Response?.armes_1 || []) {
                titles.push({
                    title: arme_1.name,
                    thumbnail: `${destinyBasePath}${Response?.display_Item_1.displayProperties.icon}`,
                    des: arme_1.description,
                    fields_1: arme_1.fields_1,
                    img: ""
                })
            }

            for (const arme_2 of Response?.armes_2 || []) {
                titles.push({
                    title: arme_2.name,
                    thumbnail: `${destinyBasePath}${Response?.display_Item_2.displayProperties.icon}`,
                    des: arme_2.description,
                    fields_2: arme_2.fields_2,
                    img: ""
                })
            }

            for (const arme_3 of Response?.armes_3 || []) {
                titles.push({
                    title: arme_3.name,
                    thumbnail: `${destinyBasePath}${Response?.display_Item_3.displayProperties.icon}`,
                    des: arme_3.description,
                    fields_3: arme_3.fields_3,
                    img: ""
                })
            }

            for (const arme_4 of Response?.armes_4 || []) {
                titles.push({
                    title: arme_4.name,
                    thumbnail: `${destinyBasePath}${Response?.display_Item_4.displayProperties.icon}`,
                    des: arme_4.description,
                    fields_4: arme_4.fields_4,
                    img: ""
                })
            }

            for (const arme_5 of Response?.armes_5 || []) {
                titles.push({
                    title: arme_5.name,
                    thumbnail: `${destinyBasePath}${Response?.display_Item_5.displayProperties.icon}`,
                    des: arme_5.description,
                    fields_5: arme_5.fields_5,
                    img: ""
                })
            }

            for (const arme_6 of Response?.armes_6 || []) {
                titles.push({
                    title: arme_6.name,
                    thumbnail: `${destinyBasePath}${Response?.display_Item_6.displayProperties.icon}`,
                    des: arme_6.description,
                    fields_6: arme_6.fields_6,
                    img: ""
                })
            }

            for (const arme_7 of Response?.armes_7 || []) {
                titles.push({
                    title: arme_7.name,
                    thumbnail: `${destinyBasePath}${Response?.display_Item_7.displayProperties.icon}`,
                    des: arme_7.description,
                    fields_7: arme_7.fields_7,
                    img: ""
                })
            }

            for (const arme_8 of Response?.armes_8 || []) {
                titles.push({
                    title: arme_8.name,
                    thumbnail: `${destinyBasePath}${Response?.display_Item_8.displayProperties.icon}`,
                    des: arme_8.description,
                    fields_8: arme_8.fields_8,
                    img: ""
                })
            }

            for (const arme_9 of Response?.armes_9 || []) {
                titles.push({
                    title: arme_9.name,
                    thumbnail: `${destinyBasePath}${Response?.display_Item_9.displayProperties.icon}`,
                    des: arme_9.description,
                    fields_9: arme_9.fields_9,
                    img: ""
                })
            }

            for (const arme_10 of Response?.armes_10 || []) {
                titles.push({
                    title: arme_10.name,
                    thumbnail: `${destinyBasePath}${Response?.display_Item_10.displayProperties.icon}`,
                    des: arme_10.description,
                    fields_10: arme_10.fields_10,
                    img: ""
                })
            }

            for (const arme_11 of Response?.armes_11 || []) {
                titles.push({
                    title: arme_11.name,
                    thumbnail: `${destinyBasePath}${Response?.display_Item_11.displayProperties.icon}`,
                    des: arme_11.description,
                    fields_11: arme_11.fields_11,
                    img: ""
                })
            }

            for (const arme_12 of Response?.armes_12 || []) {
                titles.push({
                    title: arme_12.name,
                    thumbnail: `${destinyBasePath}${Response?.display_Item_12.displayProperties.icon}`,
                    des: arme_12.description,
                    fields_6: arme_12.fields_12,
                    img: ""
                })
            }
            const embeds = titles.map(title => {
                const msg = new MessageEmbed()
                    .setTitle(title.title)
                    .setDescription(`${title.des}`)
                    .setImage(`${title.img}`)

                if (title.thumbnail) {
                    msg.setThumbnail(title.thumbnail)
                }
                for (const field of title.fields_1 || []) {
                    msg.addField(field.name, field.value, false)
                }
                for (const field of title.fields_2 || []) {
                    msg.addField(field.name, field.value, false)
                }
                for (const field of title.fields_3 || []) {
                    msg.addField(field.name, field.value, false)
                }
                for (const field of title.fields_4 || []) {
                    msg.addField(field.name, field.value, false)
                }
                for (const field of title.fields_5 || []) {
                    msg.addField(field.name, field.value, false)
                }
                for (const field of title.fields_6 || []) {
                    msg.addField(field.name, field.value, false)
                }
                for (const field of title.fields_7 || []) {
                    msg.addField(field.name, field.value, false)
                }
                for (const field of title.fields_8 || []) {
                    msg.addField(field.name, field.value, false)
                }
                for (const field of title.fields_9 || []) {
                    msg.addField(field.name, field.value, false)
                }
                for (const field of title.fields_10 || []) {
                    msg.addField(field.name, field.value, false)
                }
                for (const field of title.fields_11 || []) {
                    msg.addField(field.name, field.value, false)
                }
                for (const field of title.fields_12 || []) {
                    msg.addField(field.name, field.value, false)
                }
                return msg
            })
            await sendPaginatedEmbeds(interaction, embeds)
        }
    }
}
