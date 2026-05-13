const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  const BASE_URL = 'https://lastopus-discord-service.onrender.com';
  const commands = {
  '?equip': '/equip',
  '?unequip': '/unequip',
  '?give': '/give',
  '?buyrune': '/buyrune',
};

async function handleCommand(message, endpoint) {
  const roles = message.member?.roles.cache.map(r => r.name);
  const args = message.content.split(' ').slice(1); // ["@acheros", "banana", "30"]

  const mentionedUsers = await Promise.all(
    message.mentions.users.map(async user => {
      const member = await message.guild.members.fetch(user.id);
      return {
        id: user.id,
        username: user.username,
        roles: member.roles.cache.map(r => r.name)
      };
    })
  );

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roles, message: args.join(' '), args, mentionedUsers }) // ส่ง array ไปเลย
    });
    const data = await res.text();
    message.reply(data);
  } catch (err) {
    console.error(err);
    message.reply('Error');
  }
}

const command = Object.keys(commands).find(cmd => message.content.startsWith(cmd));
if (command) {
  handleCommand(message, commands[command]);
}

});

client.login(process.env.DISCORD_TOKEN);