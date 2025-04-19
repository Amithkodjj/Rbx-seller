/*CMD
  command: 🧑‍🤝‍🧑 Refer
  help: 
  need_reply: false
  auto_retry_time: 
  folder: main menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /refer
  group: 
CMD*/

let channels = Bot.getProperty("channels") || []

if (channels.length > 0) {
  let joined = User.getProperty("joined")
  if (joined !== "Yes") {
    Api.editMessageText({
      message_id: request.message.message_id,
      text: "<i>🔒 Access Denied! To move forward, please make sure you’re subscribed to all our official channels. Once done, hit /start to continue enjoying our services!</i>",
      parse_mode: "html"
    })
    Bot.runCommand("/start")
    return
  }
}

if (Bot.getProperty(user.telegramid) === "Ban") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>⛔ Your access has been blocked. Unfortunately, this account is restricted from using our bot due to prior violations. Contact support if you believe this is a mistake.</i>",
    parse_mode: "html"
  })
  return
}

if (Bot.getProperty("maintenanceStatus") === "On") {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: "<i>🧰 We’re currently under maintenance! Our bot is getting upgraded to serve you better. Hang tight and check back again soon—your patience means everything!</i>",
    parse_mode: "html"
  })
  return
}

let inviteLink = Libs.ReferralLib.getLink()
let referCount = Libs.ReferralLib.getRefCount()
let perRefer = Bot.getProperty("perRefer") || "0"
let currency = Bot.getProperty("currency") || "USD"

let text = 
  "<b>🔗 Share Your Referral Link:</b> " + inviteLink + "\n\n" +
  "<b>💸 Earnings Per Invite:</b> <code>" + perRefer + " " + currency + "</code>\n" +
  "<b>👤 Total Referrals:</b> <code>" + referCount + "</code>"

let buttons = {
  inline_keyboard: [
    [{ text: "📋 Referral Stats", callback_data: "/myreferrals" }],
    [{ text: "🏆 Leaderboard", callback_data: "/toplist" }],
    [{ text: "Copy My Invite Link", copy_text: { text: inviteLink } }],
    [{ text: "↩️ Return to Menu", callback_data: "/mainMenu" }]
  ]
}

if (request.message) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: text,
    parse_mode: "html",
    reply_markup: buttons
  })
} else {
  Api.sendMessage({
    text: text,
    parse_mode: "html",
    reply_markup: buttons
  })
}

