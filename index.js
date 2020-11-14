const axios = require("axios");
const Discord = require("discord.js");
const BOT_TOKEN = process.env.BOT_TOKEN || require("./config.json").BOT_TOKEN;
const TENOR_API_KEY =
  process.env.TENOR_API_KEY || require("./config.json").TENOR_API_KEY;
const client = new Discord.Client();

client.on("message", function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith("weeb")) return;
  const query = message.content.replace("weeb ", "");

  //message.reply(message.content);
  const giphyURL =
    "https://api.tenor.com/v1/search?key=" + TENOR_API_KEY + "&q=" + query;
  console.log(giphyURL);
  axios.get(giphyURL).then(function (response) {
    console.log(response.data.results[0].media[0].gif.url);
    const attachment = new Discord.MessageAttachment(
      response.data.results[0].media[0].mediumgif.url
    );
    message.channel.send(attachment);
  });
});

client.login(BOT_TOKEN);
