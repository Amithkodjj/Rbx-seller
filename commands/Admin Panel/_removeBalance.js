/*CMD
  command: /removeBalance
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *➖ Send user's telegram id whom you want to remove balance*

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var admin = Bot.getProperty("admin")
var userID = user.telegramid
var botLink = "@" + bot.name

// Check if user is admin
if (userID === admin) {
  let removeID = message.trim()

  if (isNaN(removeID) || removeID <= 0) {
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

    Bot.runCommand("/removeBalance")
    return
  }

  // Save user ID for removal process
  Bot.setProperty("removeID", removeID, "integer")

  let successText = 
    "<b>💸 Now send the amount you want to remove.\n\n" +
    "🆔 User ID:</b> <code>" + removeID + "</code>"

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
  Bot.runCommand("/removeBalance2")

} else {
  // User is not admin
  let notAdminText = 
    "<i>⚠️ You are not authorized to remove balance for " + botLink + ".</i>"

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

