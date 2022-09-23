const {
  Client,
  GatewayIntentBits,
  ApplicationCommandOptionType,
  Embed,
} = require("discord.js");
require("dotenv/config");

const { request } = require("undici");

async function getJSONResponse(body) {
  let fullBody = "";

  for await (const data of body) {
    fullBody += data.toString();
  }

  return JSON.parse(fullBody);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("The bot is ready");

  commands = client.application?.commands;

  commands?.create({
    name: "ping",
    description: "Replies with pong",
  });

  commands?.create({
    name: "add",
    description: "Adds two numbers",
    options: [
      {
        name: "num1",
        description: "The first number",
        required: true,
        type: ApplicationCommandOptionType.Number,
      },
      {
        name: "num2",
        description: "The second number",
        required: true,
        type: ApplicationCommandOptionType.Number,
      },
    ],
  });

  commands?.create({
    name: "movie",
    description: "Displays a random movie thumbnail",
  });

  commands?.create({
    name: "face",
    description: "Displays a random person's face",
  });

  commands?.create({
    name: "pizza",
    description: "Displays a random pizza photo",
  });

  commands?.create({
    name: "burger",
    description: "Displays a random burger photo",
  });

  commands?.create({
    name: "quote",
    description: "Generate a random quote",
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName, options } = interaction;

  if (commandName === "ping") {
    interaction.reply({
      content: "pong",
      ephemeral: true,
    });
  } else if (commandName === "add") {
    const num1 = options.getNumber("num1");
    const num2 = options.getNumber("num2");

    interaction.reply({
      content: `The sum is ${num1 + num2}`,
    });
  } else if (commandName === "movie") {
    const exampleEmbed = {
      color: 0x0099ff,
      title: "Random Movies",
      url: "https://discord.js.org",
      author: {
        name: "Studious Spoon Inc.",
        icon_url:
          "https://cdn.discordapp.com/app-icons/1022083760180699136/ab36aed5ae12bc0a99ad54205d868be9.png",
        url: "https://google.com",
      },
      description: "Here's a random movie thumbnail :)",
      image: {
        url:
          "https://api.lorem.space/image/movie?w=150&h=220&rand=" +
          Math.random().toString(),
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: "Random Movie API",
      },
    };
    interaction.reply({
      embeds: [exampleEmbed],
    });
  } else if (commandName === "face") {
    const exampleEmbed = {
      color: 0x0099ff,
      title: "Random Faces",
      url: "https://discord.js.org",
      author: {
        name: "Studious Spoon Inc.",
        icon_url:
          "https://cdn.discordapp.com/app-icons/1022083760180699136/ab36aed5ae12bc0a99ad54205d868be9.png",
        url: "https://google.com",
      },
      description: "Here's a random person's face :)",
      image: {
        url:
          "https://api.lorem.space/image/face?w=150&h=150&rand=" +
          Math.random().toString(),
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: "Random Face API",
      },
    };
    interaction.reply({
      embeds: [exampleEmbed],
    });
  } else if (commandName === "pizza") {
    const exampleEmbed = {
      color: 0x0099ff,
      title: "Random Pizzas",
      url: "https://discord.js.org",
      author: {
        name: "Studious Spoon Inc.",
        icon_url:
          "https://cdn.discordapp.com/app-icons/1022083760180699136/ab36aed5ae12bc0a99ad54205d868be9.png",
        url: "https://google.com",
      },
      description: "Here's a random photo of a pizza",
      image: {
        url:
          "https://api.lorem.space/image/pizza?w=150&h=150&rand=" +
          Math.random().toString(),
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: "Random Pizza API",
      },
    };
    interaction.reply({
      embeds: [exampleEmbed],
    });
  } else if (commandName === "burger") {
    const exampleEmbed = {
      color: 0x0099ff,
      title: "Random Burgers",
      url: "https://discord.js.org",
      author: {
        name: "Studious Spoon Inc.",
        icon_url:
          "https://cdn.discordapp.com/app-icons/1022083760180699136/ab36aed5ae12bc0a99ad54205d868be9.png",
        url: "https://google.com",
      },
      description: "Here's a random photo of a burger",
      image: {
        url:
          "https://api.lorem.space/image/burger?w=150&h=150&rand=" +
          Math.random().toString(),
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: "Random Burger API",
      },
    };
    interaction.reply({
      embeds: [exampleEmbed],
    });
  } else if (commandName === "quote") {
    const catResult = await request("https://zenquotes.io/api/random");
    const response = await getJSONResponse(catResult.body);
    const { q, a } = response[0];

    const exampleEmbed = {
      color: 0x0099ff,
      title: "Random Quotes",
      url: "https://discord.js.org",
      author: {
        name: "Studious Spoon Inc.",
        icon_url:
          "https://cdn.discordapp.com/app-icons/1022083760180699136/ab36aed5ae12bc0a99ad54205d868be9.png",
        url: "https://google.com",
      },
      fields: [
        {
          name: '"' + q + '"',
          value: "By " + a,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Random Quote API",
      },
    };
    interaction.reply({
      embeds: [exampleEmbed],
    });
  }
});

client.login(process.env.TOKEN);
