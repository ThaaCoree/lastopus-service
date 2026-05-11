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

  if (message.content.startsWith('!equip')) {

    const args = message.content.split(' ');
    const equip_name = (args[1]);

    try {
      const res = await fetch('https://lastopus-discord-service-production.up.railway.app/equip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equip_name })
      });

      const data = await res.json();

      message.reply(`Damage = ${data}`);
    } catch (err) {
      console.error(err);
      message.reply('Error');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);