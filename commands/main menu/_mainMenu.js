/*CMD
  command: /mainMenu
  help: 
  need_reply: false
  auto_retry_time: 
  folder: main menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Check if user has joined channels
var joined = User.getProperty("joined")

if (!joined) {
  if (request.message) {
    Api.editMessageText({
      message_id: request.message.message_id,
      text:
        "⚠️ <b>You must join our required channels to use the bot.</b>\n\n📢 <i>Click the button below to verify your membership.</i>",
      parse_mode: "html",
      reply_markup: {
        inline_keyboard: [[{ text: "✅ Joined", callback_data: "/joined" }]]
      }
    })
  } else {
    Api.sendMessage({
      text:
        "⚠️ <b>You must join our required channels to use the bot.</b>\n\n📢 <i>Click the button below to verify your membership.</i>",
      parse_mode: "html",
      reply_markup: {
        inline_keyboard: [[{ text: "✅ Joined", callback_data: "/joined" }]]
      }
    })
  }
  return
}

// Check if user is banned
if (Bot.getProperty(user.telegramid) === "Ban") {
  if (request.message) {
    Api.editMessageText({
      message_id: request.message.message_id,
      text:
        "🚫 <b>You are banned from using this bot.</b>\n\n❌ <i>Contact support if you believe this is a mistake.</i>",
      parse_mode: "html"
    })
  } else {
    Api.sendMessage({
      text:
        "🚫 <b>You are banned from using this bot.</b>\n\n❌ <i>Contact support if you believe this is a mistake.</i>",
      parse_mode: "html"
    })
  }
  return
}

// Check if bot is under maintenance
if (Bot.getProperty("maintenanceStatus") === "On") {
  if (request.message) {
    Api.editMessageText({
      message_id: request.message.message_id,
      text:
        "🛠️ <b>The bot is currently under maintenance.</b>\n\n⏳ <i>Please try again later.</i>",
      parse_mode: "html"
    })
  } else {
    Api.sendMessage({
      text:
        "🛠️ <b>The bot is currently under maintenance.</b>\n\n⏳ <i>Please try again later.</i>",
      parse_mode: "html"
    })
  }
  return
}

// Handle referral bonus
if (!User.getProperty("referCount")) {
  let refUser = Libs.ReferralLib.getAttractedBy()
  if (refUser) {
    let refBalance = Libs.ResourcesLib.anotherUserRes(
      "balance",
      refUser.telegramid
    )
    let perRefer = parseFloat(Bot.getProperty("perRefer") || 0)
    refBalance.add(perRefer)

    let currency = Bot.getProperty("currency") || "USD"
    Api.sendMessage({
      chat_id: refUser.telegramid,
      text:
        "🎉 <b>Your referral just joined!</b>\n\n💰 <b>You earned:</b> <code>" +
        perRefer +
        " " +
        currency +
        "</code> 💵 added to your balance.",
      parse_mode: "html"
    })

    User.setProperty("referCount", 1, "integer")
    User.setProperty("referStatus", "valid", "string")
  }
}

// Show main menu using inline buttons
var userName = user.first_name
var botLink = "@" + bot.name
var welcomeText =
  "👋 <b>Welcome, " +
  userName +
  "!</b>\n\n🚀 <i>Explore the features below:</i>"

let buttons = [
  [{ text: "👤 My Profile", callback_data: "/account" }],

  [
    { text: "💼 Wallet", callback_data: "/wallet" },
    { text: "📈 Stats", callback_data: "/stats" }
  ],

  [{ text: "🏧 Withdraw", callback_data: "/withdraw1" }],

  [
    { text: "🤝 Refer", callback_data: "/refer" },
    { text: "🎁 Bonus", callback_data: "/bonus" }
  ],

  [
    { text: "📄 History", callback_data: "/history" },
    { text: "🛟 Support", callback_data: "/support" }
  ]
]

if (request.message) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: welcomeText,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "html"
  })
} else {
  Api.sendMessage({
    text: welcomeText,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "html"
  })
}

