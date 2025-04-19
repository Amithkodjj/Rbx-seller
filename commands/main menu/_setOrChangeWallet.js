/*CMD
  command: /setOrChangeWallet
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

// Delete previous message if request data exists
if (request.data) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  })
}

// Get list of channels (if any)
let channels = Bot.getProperty("channels") || []

// Check if user has joined all channels
if (channels.length > 0 && User.getProperty("joined") !== "Yes") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>⚠️ You must join our channels to use the bot.</i>",
    parse_mode: "html"
  })
  Bot.runCommand("/start")
  return
}

// Check if user is banned
if (Bot.getProperty(user.telegramid) === "Ban") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>🚫 You are banned from using this bot.</i>",
    parse_mode: "html"
  })
  return
}

// Check if bot is under maintenance
if (Bot.getProperty("maintenanceStatus") === "On") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>🛠️ Bot is currently under maintenance. Please try again later.</i>",
    parse_mode: "html"
  })
  return
}

// Ask user to set wallet address
let currency = Bot.getProperty("currency") || "USD"
let text = "*👝 Send your* `" + currency + "` *address to set.*"

// Inline keyboard with Cancel button triggering /mainMenu
let keyboard = [
  [{ text: "❌ Cancel", callback_data: "/mainMenu" }]
]

Api.sendMessage({
  text: text,
  reply_markup: {
    inline_keyboard: keyboard
  },
  parse_mode: "markdown"
})

// Proceed to next step
Bot.runCommand("/setOrChangeWallet2")

