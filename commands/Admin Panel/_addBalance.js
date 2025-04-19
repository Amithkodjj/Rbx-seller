/*CMD
  command: /addBalance
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *➕ Send user's telegram id whom you want to add balance*

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
  let addID = message.trim()

  if (isNaN(addID) || addID <= 0) {
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

    Bot.runCommand("/addBalance")
    return
  }

  // Save user ID for adding balance
  Bot.setProperty("addID", addID, "integer")

  let successText = 
    "<b>💸 Now send the amount you want to add.\n\n" +
    "🆔 User ID:</b> <code>" + addID + "</code>"

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
  Bot.runCommand("/addBalance2")

} else {
  // User is not admin
  let notAdminText = 
    "<i>⚠️ You are not authorized to add balance for " + botLink + ".</i>"

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

