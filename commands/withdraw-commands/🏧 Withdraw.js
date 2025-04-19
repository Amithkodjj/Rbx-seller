/*CMD
  command: 🏧 Withdraw
  help: 
  need_reply: false
  auto_retry_time: 
  folder: withdraw-commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /withdraw1
  group: 
CMD*/

let channels = Bot.getProperty("channels") || []

if (channels.length > 0 && User.getProperty("joined") !== "Yes") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text:
      "<i>🔐 Access Denied! You must subscribe to our channels to continue using this bot.</i>",
    parse_mode: "html"
  })
  Bot.runCommand("/start")
  return
}

if (Bot.getProperty(user.telegramid) === "Ban") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text:
      "<i>⛔ You’ve been restricted from using this bot. Please contact support for assistance.</i>",
    parse_mode: "html"
  })
  return
}

if (Bot.getProperty("maintenanceStatus") === "On") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text:
      "<i>🧰 The bot is currently undergoing maintenance. Kindly check back later!</i>",
    parse_mode: "html"
  })
  Bot.runCommand("/mainMenu")
  return
}
if (Bot.getProperty("withdrawalStatus") === "Off") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text:
      "<i>🧰 Withdrawal Is Currently Off. Kindly check back later!</i>",
    parse_mode: "html"
  })
  Bot.runCommand("/mainMenu")
  return
}
let wallet = User.getProperty("wallet")
if (!wallet) {
  let undefinedText =
    "<i>💼 Wallet Not Set! Please configure your wallet address before making a withdrawal.</i>"

  Api.editMessageText({
    message_id: request.message.message_id,
    text: undefinedText,
    parse_mode: "html"
  })

  Bot.runCommand("👝 Wallet")
  return
}

let balance = Libs.ResourcesLib.userRes("balance")
let minimumWithdrawal = parseFloat(Bot.getProperty("minimumWithdrawal") || 0)
let currency = Bot.getProperty("currency") || "USD"

if (balance.value() < minimumWithdrawal) {
  let lessText =
    "<i>🚫 You must have at least</i> <code>" +
    minimumWithdrawal +
    " " +
    currency +
    "</code> <i>in your balance to request a withdrawal.</i>"

  Api.editMessageText({
    message_id: request.message.message_id,
    text: lessText,
    parse_mode: "html"
  })
  Bot.runCommand("/mainMenu")
  return
}

let text = "*💳 Please enter the amount you would like to withdraw below.*"

let keyboard = [[{ text: "❌ Cancel", callback_data: "/mainMenu" }]]
Api.editMessageText({
  message_id: request.message.message_id,
  text: text,
  reply_markup: { inline_keyboard: keyboard },
  parse_mode: "markdown"
})
Bot.runCommand("/withdraw")

