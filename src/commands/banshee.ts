import { SlashCommandBuilder } from "@discordjs/builders"
import { MessageEmbed, CommandInteraction } from "discord.js"
import { sendPaginatedEmbeds } from "discord.js-embed-pagination"
import { destinyBasePath } from "../constantes"
import { getRefreshA } from "../helpers/refresh"
import { getVendorDetailB } from "../helpers/vendor"
import { open } from "sqlite"
import sqlite3 from "sqlite3"

export default {
    data: new SlashCommandBuilder()
        .setName("banshee")
        .setDescription("information sur les article vendue par banshee"),
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
        const Response = await getVendorDetailB()

        const titles: {
            title: string, img: string, thumbnail: string, des: string, footer?: string,
            fields_M1?: { name: string, value: string }[],
            fields_M2?: { name: string, value: string }[],
            fields_M3?: { name: string, value: string }[],
            fields_M4?: { name: string, value: string }[],
            fields_1?: { name: string, value: string }[],
            fields_2?: { name: string, value: string }[],
            fields_3?: { name: string, value: string }[],
            fields_4?: { name: string, value: string }[],
            fields_5?: { name: string, value: string }[],
            fields_6?: { name: string, value: string }[]
        }[] = [{
            title: Response?.vendeur.name,
            thumbnail: `${destinyBasePath}${Response?.vendeur.originalIcon}`,
            des: `Je suis à ${Response?.destination}\n\u200B`+ "" + `\n\u200B${Response?.vendeur.description}`,
            img: `${destinyBasePath}${Response?.vendeur.largeIcon}`,
        }]

        for (const mods_1 of Response?.mods_1 || []) {
            titles.push({
                title: mods_1.name,
                thumbnail: `${destinyBasePath}${Response?.mod_1.displayProperties.icon}`,
                des: mods_1.description,
                fields_M1: mods_1.fields_M1,
                img: ""
            })
        }

        for (const mods_2 of Response?.mods_2 || []) {
            titles.push({
                title: mods_2.name,
                thumbnail: `${destinyBasePath}${Response?.mod_2.displayProperties.icon}`,
                des: mods_2.description,
                fields_M2: mods_2.fields_M2,
                img: ""
            })
        }

        for (const mods_3 of Response?.mods_3 || []) {
            titles.push({
                title: mods_3.name,
                thumbnail: `${destinyBasePath}${Response?.mod_3.displayProperties.icon}`,
                des: mods_3.description,
                fields_M3: mods_3.fields_M3,
                img: ""
            })
        }

        for (const mods_4 of Response?.mods_4 || []) {
            titles.push({
                title: mods_4.name,
                thumbnail: `${destinyBasePath}${Response?.mod_4.displayProperties.icon}`,
                des: mods_4.description,
                fields_M4: mods_4.fields_M4,
                img: ""
            })
        }

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
        const embeds = titles.map(title => {
            const msg = new MessageEmbed()
                .setTitle(title.title)
                .setDescription(`${title.des}`)
                .setImage(`${title.img}`)

            if (title.thumbnail) {
                msg.setThumbnail(title.thumbnail)
            }
            for (const field of title.fields_M1 || []) {
                msg.addField(field.name, field.value, false)
            }
            for (const field of title.fields_M2 || []) {
                msg.addField(field.name, field.value, false)
            }
            for (const field of title.fields_M3 || []) {
                msg.addField(field.name, field.value, false)
            }
            for (const field of title.fields_M4 || []) {
                msg.addField(field.name, field.value, false)
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
            return msg
        })
        await sendPaginatedEmbeds(interaction, embeds)
        }
    }
}
