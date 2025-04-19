/*CMD
  command: /onNeedJoinAll
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!options) {
  return // protect from manual run
}
User.setProperty("joined", "No", "string")
let channels = Libs.MembershipChecker.getChats();

if (!channels || channels.length === 0) {
  return
}

let message = "<b>📢 To continue using this bot, please join our official channels below:</b>\n\n"

channels.forEach(ch => {
  message += "🔗 <a href='https://t.me/" + ch.replace("@", "") + "'>" + ch + "</a>\n"
})

message += "\n✅ After joining, tap the button below to verify and continue."

Bot.sendInlineKeyboard(
  [
    [{ title: "✅ I Joined", command: "/start" }]
  ],
  message,
  { parse_mode: "html" }
)

