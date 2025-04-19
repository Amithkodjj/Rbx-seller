/*CMD
  command: /addBalance2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER

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
  let amount = message.trim()

  if (isNaN(amount) || amount <= 0) {
    let errorText = "<i>⚠️ Please send a valid amount greater than zero.</i>"

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

    Bot.runCommand("/addBalance2")
    return
  }

  // Get target user ID and update balance
  let addID = Bot.getProperty("addID")
  let balance = Libs.ResourcesLib.anotherUserRes("balance", addID)
  balance.add(parseFloat(amount))

  let currency = Bot.getProperty("currency") || "USD"
  
  // Confirmation message for admin
  let adminText = 
    "<b>💸 Amount:</b> <code>" + amount + " " + currency + "</code>\n" +
    "<b>✅ Successfully added to user ID:</b> <code>" + addID + "</code>"

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

  // Notify user about added balance
  let userText = 
    "<b>💸 Amount:</b> <code>" + amount + " " + currency + "</code>\n" +
    "<b>✅ Added by the admin.</b>"

  Api.sendMessage({
    chat_id: addID,
    text: userText,
    parse_mode: "html"
  })

} else {
  // User is not admin
  let notAdminText = 
    "<i>⚠️ You are not authorized to add balance for " + botLink + ".</i>"

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
Bot.runCommand("/adminPanel") 
