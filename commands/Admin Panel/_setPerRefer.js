/*CMD
  command: /setPerRefer
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *👬 Send the amount which you want to set as referral bonus*

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
  let perRefer = message.trim()

  if (isNaN(perRefer) || perRefer <= 0) {
    Api.editMessageText({
      message_id: request.message.message_id,
      text: "<i>⚠️ Please send a valid numerical value greater than zero.</i>",
      parse_mode: "html"
    })
    Bot.runCommand("/setPerRefer")
    return
  }

  // Set per referral value
  Bot.setProperty("perRefer", perRefer, "string")

  let currency = Bot.getProperty("currency") || "USD"
  let successText = 
    "<b>🧑‍🤝‍🧑 Per referral set to:</b> <code>" + 
    perRefer + " " + currency + "</code>"

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
  let notAdminText = "<i>⚠️ You are not authorized to set referral value for " + botLink + ".</i>"

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

