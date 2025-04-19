/*CMD
  command: onDeletePayout
  help: 
  need_reply: false
  auto_retry_time: 
  folder: withdraw-commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let userID = params

if (user.telegramid != Bot.getProperty("admin")) {
  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "🚫 Only the admin can delete this post.",
    show_alert: true
  })
}

let payoutChannel = Bot.getProperty("payoutChannel")
let messageID = Bot.getProperty("payoutMessage_" + userID)

if (payoutChannel && messageID) {
  Api.deleteMessage({
    chat_id: payoutChannel,
    message_id: messageID
  })
}

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "🗑 Post deleted.",
  show_alert: false
})

