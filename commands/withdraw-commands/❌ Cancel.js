/*CMD
  command: ❌ Cancel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: withdraw-commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /cancel
  group: 
CMD*/

if (request.data) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  })
}

let channels = Bot.getProperty("channels") || []

if (channels.length > 0 && User.getProperty("joined") !== "Yes") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>🔔 Please join all the required channels to continue using this bot.</i>",
    parse_mode: "html"
  })
  Bot.runCommand("/start")
  return
}

if (Bot.getProperty(user.telegramid) === "Ban") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>⛔ Access Denied: You’ve been banned from this bot. Contact support for help.</i>",
    parse_mode: "html"
  })
  return
}

if (Bot.getProperty("maintenanceStatus") === "On") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>🧰 We’re updating the system. Please try again shortly.</i>",
    parse_mode: "html"
  })
  return
}

let text = "<i>❌ Action cancelled. You’ve been returned to the main menu.</i>"

if (request.message) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: text,
    parse_mode: "html"
  })
} else {
  Api.sendMessage({
    text: text,
    parse_mode: "html"
  })
}

Bot.runCommand("/mainMenu")

