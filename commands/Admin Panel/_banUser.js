/*CMD
  command: /banUser
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *🚫 Send user's telegram id whom you want to ban*

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
  let banID = message.trim()

  if (isNaN(banID) || banID <= 0) {
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

    Bot.runCommand("/banUser")
    return
  }

  // Set ban property for the user
  Bot.setProperty(banID, "Ban")

  let successText = 
    "<b>🆔 User with Telegram ID:</b> <code>" + banID + "</code>\n" +
    "<b>🚫 Successfully banned.</b>"

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

  // Notify user about the ban
  let userText = "<i>🚫 You have been banned by the admin.</i>"

  Api.sendMessage({
    chat_id: banID,
    text: userText,
    parse_mode: "html"
  })

} else {
  // User is not admin
  let notAdminText = 
    "<i>⚠️ You are not authorized to ban users on " + botLink + ".</i>"

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

