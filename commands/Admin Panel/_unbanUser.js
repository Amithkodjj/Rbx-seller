/*CMD
  command: /unbanUser
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *✔️ Send user's telegram id whom you want to unban*

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
  let unbanID = message.trim()

  if (isNaN(unbanID)) {
    let errorText = "<i>⚠️ Please send a valid numeric Telegram ID to unban a user.</i>"
    
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

    Bot.runCommand("/unbanUser")
    return
  }

  // Unban user
  Bot.setProperty(unbanID, "Unban")

  let adminText = 
    "<b>✅ User with Telegram ID:</b> <code>" + unbanID + "</code> <b>has been unbanned successfully.</b>"

  if (request.message) {
    Api.editMessageText({
      message_id: request.message.message_id,
      text: adminText,
      parse_mode: "html"
    })
  } else {
    Api.sendMessage({
      text: adminText,
      parse_mode: "html"
    })
  }

  // Notify unbanned user
  let userText = "<i>✔️ You have been unbanned by the admin. You can now use the bot again.</i>"

  Api.sendMessage({
    chat_id: unbanID,
    text: userText,
    parse_mode: "html"
  })
} else {
  let notAdminText = "<i>⚠️ You are not authorized to unban users on " + botLink + ".</i>"

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
