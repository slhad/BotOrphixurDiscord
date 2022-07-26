import { SlashCommandBuilder } from "@discordjs/builders"
import { Message, MessageEmbed} from "discord.js"
import { buttonsPagination } from "../helpers/buttonPagination"





export default {
    data: new SlashCommandBuilder()
        .setName("button")
        .setDescription("test button"),

    async execute(msg:Message) {

        const page1 = new MessageEmbed()
            .setTitle("page 1")
            .setDescription("test page 1")

        const page2 = new MessageEmbed()
            .setTitle("page 2")
            .setDescription("test page 2")

        const page3 = new MessageEmbed()
            .setTitle("page 3")
            .setDescription("test page 3")

        const page4 = new MessageEmbed()
            .setTitle("page 4")
            .setDescription("test page 4")

        const pages = [ page1, page2, page3, page4]

        const time = 30000


        buttonsPagination(msg,pages,time) 
       
       

    }
}
