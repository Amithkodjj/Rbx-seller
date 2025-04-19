/*CMD
  command: /cancelPayment
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

if (user.telegramid != Bot.getProperty("admin")) {
  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "🚫 Only the admin can cancel withdrawal requests.",
    show_alert: true
  })
}

let userID = params
let withdrawal = Bot.getProperty("withdrawalData_" + userID)
if (!withdrawal) return

// Refund the amount
Libs.ResourcesLib.userRes("balance").add(withdrawal.amount)

// Add to transaction history
let history = User.getProperty("transactionHistory") || []
history.unshift({
  amount: withdrawal.amount,
  currency: withdrawal.currency,
  wallet: withdrawal.wallet,
  status: "DECLINED ❌️",
  date: new Date().toLocaleString()
})
history = history.slice(0, 100)
User.setProperty("transactionHistory", history, "json")

// Notify the user
Api.sendMessage({
  chat_id: userID,
  text: `<i>❌ Your withdrawal request for <b>${withdrawal.amount} ${withdrawal.currency}</b> has been declined.\n\n💼 The full amount has been returned to your balance.</i>`,
  parse_mode: "html"
})

// Edit post in the payout channel
let payoutChannel = Bot.getProperty("payoutChannel")
let messageID = Bot.getProperty("payoutMessage_" + userID)

if (payoutChannel && messageID) {
  Api.editMessageText({
    chat_id: payoutChannel,
    message_id: messageID,
    text: 
      `📥 <b>Withdrawal Request</b>\n\n` +
      `👤 <b>Name:</b> <b>${withdrawal.first_name}</b>\n` +
      `🔗 <b>Link:</b> <a href='tg://user?id=${userID}'><b>${withdrawal.first_name}</b></a>\n` +
      `🔎 <b>Username:</b> ${withdrawal.username ? "@" + withdrawal.username : "Not set"}\n` +
      `🆔 <b>Telegram ID:</b> <code>${userID}</code>\n\n` +
      `💵 <b>Amount:</b> <code>${withdrawal.amount} ${withdrawal.currency}</code>\n` +
      `👝 <b>Wallet:</b> <code>${withdrawal.wallet}</code>\n\n` +
      `🔴 <b>Status:</b> <code>❌ DECLINED</code>\n\n` +
      `🤖 <b>Bot:</b> @${bot.name}`,
    parse_mode: "html",
    reply_markup: {
      inline_keyboard: [
        [{ text: "❌ Delete The Post", callback_data: "onDeletePayout " + userID }]
      ]
    }
  })
}

// Confirm via callback
Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "❌ Withdrawal cancelled.",
  show_alert: false
})

