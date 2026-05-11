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
  if (message.content.startsWith('!test')) {
    
    // ดึงข้อมูลผู้ส่ง
    const userId = message.author.id;
    const username = message.author.username;
    const roles = message.member?.roles.cache.map(r => r.name); // ['Admin', 'Member', ...]
    const args = message.content.split(' ');
    const message = args[1];

    try {
      const res = await fetch('https://lastopus-discord-service-production.up.railway.app/equip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roles, message }) // ส่งไปกับ request ด้วยได้
      });
    
      const data = await res.text();
      message.reply(`${data}`);
    } catch (err) {
      console.error(err);
      message.reply('Error');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);