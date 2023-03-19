const mysql = require('mysql');
const Discord = require('discord.js');
const client = new Discord.Client();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'example',
  password: '', // an password can either have an password or not
  database: 'example'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.author.bot) return;
  if (message.content === '!stats') {
    const userId = message.author.id;
    connection.query(`SELECT * FROM stats WHERE username = '${userId}'`, (err, rows) => {
      if (err) throw err;

      if (rows.length === 0) {
        message.reply('Sorry, you are not registered in the database.');
      } else {
        const username = rows[0].username;
        const kills = rows[0].kills;
        const wins = rows[0].wins;

        message.reply(`The username is ${username} and the player have ${kills} kills.`);
      }
    });
  }
});

client.login('your bot token');
