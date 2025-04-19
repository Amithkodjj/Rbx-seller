/*CMD
  command: /setMinimumWithdrawal
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *💸 Send the amount which you want to set as minimum withdrawal amount*

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
  let minimumWithdrawal = message.trim()

  if (isNaN(minimumWithdrawal) || minimumWithdrawal <= 0) {
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

    Bot.runCommand("/setMinimumWithdrawal")
    return
  }

  // Save minimum withdrawal value
  Bot.setProperty("minimumWithdrawal", minimumWithdrawal, "string")

  let currency = Bot.getProperty("currency") || "USD"

  let successText = 
    "<b>💸 Minimum withdrawal set to:</b> <code>" + 
    minimumWithdrawal + " " + currency + "</code>"

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
    "<i>⚠️ You are not authorized to set minimum withdrawal for " + botLink + ".</i>"

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

