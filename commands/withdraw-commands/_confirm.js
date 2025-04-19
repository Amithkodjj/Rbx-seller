/*CMD
  command: /confirm
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

let channels = Bot.getProperty("channels") || []
if (channels.length > 0 && User.getProperty("joined") !== "Yes") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>🔔 You must subscribe to all required channels to use this bot.</i>",
    parse_mode: "html"
  })
  Bot.runCommand("/start")
  return
}

if (Bot.getProperty(user.telegramid) === "Ban") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>🚫 Your account is banned from accessing this bot. Please contact support if this is an error.</i>",
    parse_mode: "html"
  })
  return
}

if (Bot.getProperty("maintenanceStatus") === "On") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>🧰 We're doing maintenance right now. Try again in a little while!</i>",
    parse_mode: "html"
  })
  return
}

// Get and validate withdrawal info
let amount = parseFloat(User.getProperty("amount"))
let wallet = User.getProperty("wallet")
let currency = Bot.getProperty("currency") || "USD"
let balance = Libs.ResourcesLib.userRes("balance")

if (!amount || amount <= 0 || !wallet) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>⚠️ Invalid withdrawal amount or wallet.</i>",
    parse_mode: "html"
  })
  return
}

if (amount > balance.value()) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>⚠️ You don’t have enough balance to make this withdrawal.</i>",
    parse_mode: "html"
  })
  Bot.runCommand("/mainMenu")
  return
}

// Deduct balance
balance.remove(amount)

// Confirm to user
let userText = 
  `<b>💸 Withdrawal Submitted</b>\n\n` +
  `<b>💰 Amount:</b> <code>${amount} ${currency}</code>\n` +
  `<b>👛 Wallet:</b> <code>${wallet}</code>\n\n` +
  `<i>⏳ Your request is being processed. Funds will arrive soon.</i>`

Api.editMessageText({
  message_id: request.message.message_id,
  text: userText,
  parse_mode: "html"
})

// Store user-specific data for later reference by admin
User.setProperty("pendingWithdrawal", { amount, wallet, currency }, "json")

let userName = user.first_name
let userID = user.telegramid
let userLink = `<a href='tg://user?id=${userID}'>${userName}</a>`
let username = user.username ? "@" + user.username : "Not set"
let botLink = "@" + bot.name

// Store data for admin usage (used in confirm/cancel)
Bot.setProperty("withdrawalData_" + userID, {
  userID: userID,
  first_name: userName,
  username: user.username,
  amount: amount,
  currency: currency,
  wallet: wallet
}, "json")

let payoutText = 
  `<b>📥 Withdrawal Request</b>\n\n` +
  `<b>👤 Name:</b> ${userName}\n` +
  `<b>🔗 Link:</b> ${userLink}\n` +
  `<b>🔎 Username:</b> ${username}\n` +
  `<b>🆔 Telegram ID:</b> <code>${userID}</code>\n\n` +
  `<b>💵 Amount:</b> <code>${amount} ${currency}</code>\n` +
  `<b>👝 Wallet:</b> <code>${wallet}</code>\n\n` +
  `<i>✅ Confirm payment or cancel below.</i>\n\n` +
  `<b>🤖 Bot:</b> ${botLink}`

let buttons = [
  [
    { text: "✅ Confirm Payment", callback_data: `/confirmPayment ${userID}` },
    { text: "❌ Cancel Payment", callback_data: `/cancelPayment ${userID}` }
  ]
]

// Send to admin payout channel
let payoutChannel = Bot.getProperty("payoutChannel")
if (payoutChannel) {
  Api.sendMessage({
    chat_id: payoutChannel,
    text: payoutText,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "html",
    on_result: "/storePayoutMessageID " + userID
  })
}

