/*CMD
  command: /setChannels
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER
*🏘️ Send channel(s) username(s) without @ and space between them.

👉 Example :* `channel channel`

_⚠️ Note : You can add upto 2 channels only & must make the bot admin in channel(s)._
  ANSWER

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
  let channels = message.trim().split(" ")

  // Limit to 6 channels
  if (channels.length > 6) {
    let errorText = "<i>⚠️ You can add up to 6 channels only.</i>"
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
    Bot.runCommand("/setChannels")
    return
  }

  // Validate channel names (no '@' allowed)
  for (let i = 0; i < channels.length; i++) {
    if (channels[i].includes("@")) {
      let errorText = "<i>⚠️ Send channel usernames without '@'.</i>"
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
      Bot.runCommand("/setChannels")
      return
    }
  }

  // Save to Admin Panel field
  AdminPanel.setFieldValue({
    panel_name: "MembershipChecker",
    field_name: "Chats",
    value: channels.map(ch => "@" + ch).join(", ")
  })

  // Confirmation message
  let successText = "<b>🏘️ Channels set to:</b>\n\n"
  channels.forEach(channel => {
    successText += "@" + channel + "\n"
  })

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

} else {
  // User is not admin
  let notAdminText = "<i>⚠️ You're not the admin of " + botLink + ".</i>"
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

