/*CMD
  command: /setMaximumWithdrawal
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *💸 Send the amount which you want to set as maximum withdrawal amount*

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
  let maximumWithdrawal = message.trim()

  if (isNaN(maximumWithdrawal) || maximumWithdrawal <= 0) {
    let errorText = "<i>⚠️ Please send a valid numerical value greater than zero.</i>"

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

    Bot.runCommand("/setMaximumWithdrawal")
    return
  }

  // Set maximum withdrawal value
  Bot.setProperty("maximumWithdrawal", maximumWithdrawal, "string")

  let currency = Bot.getProperty("currency") || "USD"
  
  let successText = 
    "<b>💸 Maximum withdrawal set to:</b> <code>" + 
    maximumWithdrawal + " " + currency + "</code>"

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
  let notAdminText = 
    "<i>⚠️ You are not authorized to set maximum withdrawal for " + botLink + ".</i>"

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

