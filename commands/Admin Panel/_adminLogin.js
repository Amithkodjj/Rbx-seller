/*CMD
  command: /adminLogin
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin = Bot.getProperty("admin")
let userID = user.telegramid
let botLink = "@" + bot.name

// If admin is not set, allow this user to become admin
if (!admin) {
  Bot.setProperty("admin", userID, "integer")

  let successText = 
    "<b>✅ You are now the admin of " + botLink + ".</b>\n\n" +
    "<b>👉 Access the admin panel by sending:</b> <code>/adminPanel</code>"

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
} else if (userID === admin) {
  let alreadyAdminText = 
    "<i>⚠️ You are already the admin of " + botLink + ".</i>"

  if (request.message) {
    Api.editMessageText({
      message_id: request.message.message_id,
      text: alreadyAdminText,
      parse_mode: "html"
    })
  } else {
    Api.sendMessage({
      text: alreadyAdminText,
      parse_mode: "html"
    })
  }
} else {
  let notAdminText = 
    "<i>⚠️ You are not authorized to become the admin of " + botLink + ".</i>"

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

