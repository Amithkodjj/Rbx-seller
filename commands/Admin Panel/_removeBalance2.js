/*CMD
  command: /removeBalance2
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

let admin = Bot.getProperty("admin")
let userID = user.telegramid
let botLink = "@" + bot.name

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

    Bot.runCommand("/removeBalance2")
    return
  }

  // Get target user ID and update balance
  let removeID = Bot.getProperty("removeID")
  let balance = Libs.ResourcesLib.anotherUserRes("balance", removeID)

  if (balance.value() < parseFloat(amount)) {
    let insufficientBalanceText = 
      "<i>⚠️ User does not have enough balance to remove.</i>"

    if (request.message) {
      Api.editMessageText({
        message_id: request.message.message_id,
        text: insufficientBalanceText,
        parse_mode: "html"
      })
    } else {
      Api.sendMessage({
        text: insufficientBalanceText,
        parse_mode: "html"
      })
    }
    return
  }

  balance.remove(parseFloat(amount))

  let currency = Bot.getProperty("currency") || "USD"

  // Confirmation message for admin
  let adminText = 
    "<b>💸 Amount:</b> <code>" + amount + " " + currency + "</code>\n" +
    "<b>✅ Successfully removed from user ID:</b> <code>" + removeID + "</code>"

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

  // Notify user about the balance removal
  let userText = 
    "<b>💸 Amount:</b> <code>" + amount + " " + currency + "</code>\n" +
    "<b>✅ Removed by the admin.</b>"

  Api.sendMessage({
    chat_id: removeID,
    text: userText,
    parse_mode: "html"
  })

} else {
  // User is not admin
  let notAdminText = 
    "<i>⚠️ You are not authorized to remove balance for " + botLink + ".</i>"

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

