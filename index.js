const fs = require('fs');
const { Client, Collection, Interaction, ReactionEmoji, RoleManager} = require('discord.js');
const { Token } = require('./config.json');
const { Message, MessageEmbed } = require('discord.js');


const handleCommand = require('./helpers/command');
const { channel } = require('diagnostics_channel');
const { roleMention, channelMention } = require('@discordjs/builders');


const client = new Client({ intents: 65051 });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
};

client.once('ready', () => {
    console.log('Bot OK!');
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) handleCommand(client, interaction);
});

client.on('messageCreate', message => {
    if (message.channel.id === `882334455065374761`) {
        message.react('1️⃣');
    }
});

client.on('messageCreate', message => {
    if (message.channel.id === `882334455065374761`) {
        message.react('2️⃣');
    }
});

client.on('messageCreate', message => {
    if (message.channel.id === `882334455065374761`) {
        message.react('3️⃣');
    }
});

client.on('messageCreate', message => {
    if (message.channel.id === `882334455065374761`) {
        message.react('4️⃣');
    }
});

client.on('messageCreate', message => {
    if (message.channel.id === `882334455065374761`) {
        message.react('5️⃣');
    }
});


client.login(Token);