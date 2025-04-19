/*CMD
  command: /chatWithUser
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *🆔 Send user's telegram id whom you want to chat*

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin = Bot.getProperty("admin")
let userID = user.telegramid
let botLink = "@" + bot.name

// Check if user is admin
if (userID === admin) {
  let chatID = message.trim()

  if (isNaN(chatID) || chatID <= 0) {
    let errorText = "<i>⚠️ Please send a valid Telegram ID.</i>"

    if (request.message) {
      Api.editMessageText({
        message_id: request.message.message_id,
        text: errorText,
        parse_mode: "html"
      })
    } else {
      Api.sendMessage({
        text: errorText,
        parse_mode: "html"
      })
    }

    Bot.runCommand("/chatWithUser")
    return
  }

  // Save chat ID for future use
  Bot.setProperty("chatID", chatID, "integer")

  let successText = 
    "<b>💬 Now send the message to chat with user.\n\n" +
    "🆔 Chat ID:</b> <code>" + chatID + "</code>"

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

  // Proceed to next step
  Bot.runCommand("/chatWithUser2")

} else {
  // User is not admin
  let notAdminText = 
    "<i>⚠️ You are not authorized to chat with users on " + botLink + ".</i>"

  if (request.message) {
    Api.editMessageText({
      message_id: request.message.message_id,
      text: notAdminText,
      parse_mode: "html"
    })
  } else {
    Api.sendMessage({
      text: notAdminText,
      parse_mode: "html"
    })
  }
}

