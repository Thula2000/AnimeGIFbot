const axios = require("axios");
const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

client.on("message", function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith("weeb")) return;
  const query = message.content.replace("weeb ", "");

  //message.reply(message.content);
  const giphyURL =
    "https://api.giphy.com/v1/gifs/search?api_key=caFk4mAuVZoFmmM2HGj9sBKdJWgmx7rK&q=anime%20" +
    query;
  console.log(giphyURL);
  axios.get(giphyURL).then(function (response) {
    const attachment = new Discord.MessageAttachment(
      response.data.data[0].images.original.url
    );
    message.channel.send(attachment);
  });
});

client.login(config.BOT_TOKEN);
