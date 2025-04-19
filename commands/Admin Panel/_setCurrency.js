/*CMD
  command: /setCurrency
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *💲 Send the currency which you want to set*

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
  let currency = message.trim()

  if (!currency) {
    Api.editMessageText({
      message_id: request.message.message_id,
      text: "<i>⚠️ Please provide a valid currency.</i>",
      parse_mode: "html"
    })
    return
  }

  // Set currency property
  Bot.setProperty("currency", currency, "string")

  let successText = "<b>💲 Currency set to:</b> <code>" + currency + "</code>"

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

  // Return to admin panel
  Bot.runCommand("/adminPanel")

} else {
  // User is not admin
  let notAdminText = "<i>⚠️ You are not authorized to set the currency for " + botLink + ".</i>"

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

