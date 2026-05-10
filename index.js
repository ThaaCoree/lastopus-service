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

  if (message.content.startsWith('!dmg')) {

    const args = message.content.split(' ');
    const atk = parseInt(args[1]);
    const def = parseInt(args[2]);

    try {
      const res = await fetch('https://lastopus-discord-service-production.up.railway.app/api/damage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ atk, def })
      });

      const data = await res.json();

      message.reply(`Damage = ${data}`);
    } catch (err) {
      console.error(err);
      message.reply('Error');
    }
  }
});

client.login('process.env.DISCORD_TOKEN');