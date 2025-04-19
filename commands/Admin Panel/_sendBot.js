/*CMD
  command: /sendBot
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *✉️ Send the mail(s) with a comma ( , ) between them if have more than one :-* `xyz@xyz.com, xyz@xyz.com`

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
  let emails = message.trim()

  if (!emails.includes("@")) {
    let errorText = "<i>⚠️ Please provide a valid email address or a list of emails separated by commas.</i>"
    
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

    Bot.runCommand("/sendBot")
    return
  }

  let emailList = emails.includes(",") ? emails.split(",") : [emails]
  let successMessages = []

  for (let i in emailList) {
    let email = emailList[i].trim()
    
    BBAdmin.installBot({
      email: email,
      bot_id: bot.id
    })

    successMessages.push("<b>✅ " + botLink + " successfully sent to:</b> <code>" + email + "</code>")
  }

  let successText = successMessages.join("\n")

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
  let notAdminText = "<i>⚠️ You are not authorized to send this bot on behalf of " + botLink + ".</i>"

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
