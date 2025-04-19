/*CMD
  command: /setOrChangeWallet2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: main menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

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

// Set wallet address
let wallet = message.trim()
User.setProperty("wallet", wallet, "string")

let currency = Bot.getProperty("currency") || "USD"
let successText = 
  "<b>👝 Your</b> <code>" + currency + "</code> <b>wallet set to:</b> <code>" + wallet + "</code>"

// Edit message if available, otherwise send a new one
if (request.message) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: successText,
    parse_mode: "html"
  })
} else {
  Api.sendMessage({
    text: successText,
    parse_mode: "html"
  })
}

// Return to main menu
Bot.runCommand("/mainMenu")

