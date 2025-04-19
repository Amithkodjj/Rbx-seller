/*CMD
  command: /setWithdrawalStatus
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER
*🏧 Send the mode which you want to set as withdrawal status from the options below* 👇

👉 Options :* `On` */* `Off`
  ANSWER

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
  let withdrawal = message.trim()

  if (withdrawal === "On" || withdrawal === "Off") {
    // Set withdrawal status
    Bot.setProperty("withdrawalStatus", withdrawal, "string")

    let successText = 
      "<b>🏧 Withdrawal status set to:</b> <code>" + withdrawal + "</code>"

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
    // Handle invalid input
    let errorText = 
      "<i>⚠️ Please send only</i> <code>On</code> <i>or</i> <code>Off</code>."

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

    Bot.runCommand("/setWithdrawalStatus")
  }

} else {
  // User is not admin
  let notAdminText = 
    "<i>⚠️ You are not authorized to change withdrawal status for " + botLink + ".</i>"

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

