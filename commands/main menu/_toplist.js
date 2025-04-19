/*CMD
  command: /toplist
  help: 
  need_reply: false
  auto_retry_time: 
  folder: main menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (request.data) {
  var message_id = request.message?.message_id
}

let list = Libs.ReferralLib.getTopList()
list.order_by = "integer_value"
list.order_ascending = false
list.page = 1
list.per_page = 10

let items = list.get()
let msg = "🏆 <b>Top Ambassadors of the Community</b>\n\n"
msg +=
  "Here are the users who’ve helped grow our community the most by inviting others. Keep sharing to see your name rise on this board!\n\n"

if (items.length > 0) {
  for (let i in items) {
    let user = items[i].user
    let count = items[i].value
    let userTag = `<a href="tg://user?id=${user.telegramid}">${user.first_name}</a>`
    msg += `✨ <b>#${parseInt(i) +
      1}</b> — ${userTag}\n👥 Referrals: <b>${count}</b>\n\n`
  }
} else {
  msg +=
    "🚫 No referral activity found yet.\nBe the first one to climb the leaderboard by sharing your invite link!"
}

let inline_keyboard = [
  [{ text: "⬅️ Back to Referral Center", callback_data: "/refer" }]
]

if (message_id) {
  Api.editMessageText({
    message_id: message_id,
    text: msg,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard }
  })
} else {
  Api.sendMessage({
    text: msg,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard }
  })
}

