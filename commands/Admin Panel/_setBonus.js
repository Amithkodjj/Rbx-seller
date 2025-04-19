/*CMD
  command: /setBonus
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *🎁 Send the amount which you want to set as bonus*

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
  let bonus = message.trim()

  if (isNaN(bonus) || bonus <= 0) {
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

    Bot.runCommand("/setBonus")
    return
  }

  // Save bonus value
  Bot.setProperty("bonus", bonus, "string")

  let currency = Bot.getProperty("currency") || "USD"

  let successText = 
    "<b>🎁 Bonus set to:</b> <code>" + bonus + " " + currency + "</code>"

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
    "<i>⚠️ You are not authorized to set bonus for " + botLink + ".</i>"

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

