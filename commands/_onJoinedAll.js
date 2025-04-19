/*CMD
  command: /onJoinedAll
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

let channels = Libs.MembershipChecker.getChats()

if (!channels || channels.length === 0) {
  return
}

let message =
  "<b>🎉 Thank you for joining all our channels!</b>\n\n" +
  "You’re now fully connected to our community. Here are the channels you've joined:\n\n"

channels.forEach(ch => {
  let clean = ch.replace("@", "")
  message += "✅ <a href='https://t.me/" + clean + "'>@" + clean + "</a>\n"
})

message +=
  "\nBy staying tuned, you’ll receive the latest updates, news, and special things.\n\n" +
  "Tap the button below to continue using the bot."

Bot.sendInlineKeyboard(
  [[{ title: "▶️ Continue", command: "/start" }]],
  message,
  { parse_mode: "html" }
)

