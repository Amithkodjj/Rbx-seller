/*CMD
  command: /reply
  help: 
  need_reply: true
  auto_retry_time: 
  folder: main menu
  answer: *📞 Send the reply*

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin = Bot.getProperty("admin")
let userID = user.telegramid
let botLink = "@" + bot.name

// Check if the current user is the admin
if (userID === admin) {
  let replyID = Bot.getProperty("replyID")
  let reply = message.trim()

  if (!replyID) {
    Api.editMessageText({
      message_id: request.message.message_id,
      text: "<i>⚠️ No active user conversation to reply to.</i>",
      parse_mode: "html"
    })
    return
  }

  // Message to send to user
  let userText = 
    "<b>📞 Reply from Admin</b>\n\n" +
    "<b>💬 Message:</b> <i>" + reply + "</i>"

  // Reply button for user to continue chat
  let button = [[{ text: "📨 Reply to Admin", callback_data: "/support" }]]

  Api.sendMessage({
    chat_id: replyID,
    text: userText,
    reply_markup: { inline_keyboard: button },
    parse_mode: "html"
  })

  // Confirmation message back to admin
  let adminText = 
    "<b>✅ Your reply was sent to:</b> <code>" + replyID + "</code>\n\n" +
    "<b>📝 Message:</b> <i>" + reply + "</i>"

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

} else {
  // Not authorized
  let notAdminText = "<i>⚠️ You are not authorized to use admin reply commands in " + botLink + ".</i>"

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

