/*CMD
  command: /setAlertsChannel
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *🔴 Send the channel username without "@" which you want to set as alerts channel*

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
  let alertChannel = message.trim()

  if (alertChannel.includes("@")) {
    let errorText = "<i>⚠️ Please send the channel username without '@'.</i>"

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

    Bot.runCommand("/setAlertsChannel")
    return
  }

  // Save alerts channel
  Bot.setProperty("alertsChannel", "@" + alertChannel, "string")

  let successText = "<b>🔴 Alerts channel set to: @" + alertChannel + "</b>"

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
    "<i>⚠️ You are not authorized to set the alerts channel for " + botLink + ".</i>"

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

