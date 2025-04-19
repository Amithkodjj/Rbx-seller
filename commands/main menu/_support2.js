/*CMD
  command: /support2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: main menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (User.getProperty("awaitingSupportMessage")) {
  let support = message.trim()
  let admin = Bot.getProperty("admin")
  let userID = user.telegramid
  let userName = user.first_name
  let username = user.username ? "@" + user.username : "N/A"
  let userLink = "<a href='tg://user?id=" + userID + "'>" + userName + "</a>"

  // Confirm to user
  Api.sendMessage({
    text:
      "<b>✅ Message Sent!</b>\n\n" +
      "Our team has received your message and will respond as soon as possible.\n\n" +
      "<b>📝 You wrote:</b> <i>" + support + "</i>",
    parse_mode: "html"
  })

  // Notify admin with reply button
  let adminText =
    "<b>📩 New Support Message</b>\n\n" +
    "👤 <b>User:</b> " + userName + "\n" +
    "🔗 <b>Link:</b> " + userLink + "\n" +
    "📛 <b>Username:</b> " + username + "\n" +
    "🆔 <b>User ID:</b> <code>" + userID + "</code>\n\n" +
    "💬 <b>Message:</b> <i>" + support + "</i>"

  Api.sendMessage({
    chat_id: admin,
    text: adminText,
    parse_mode: "html",
    reply_markup: {
      inline_keyboard: [
        [{ text: "✉️ Reply to " + userName, callback_data: "/reply " + userID }]
      ]
    }
  })

  Bot.setProperty("replyID", userID, "integer")
  User.setProperty("awaitingSupportMessage", false, "boolean")
  Bot.runCommand("/mainMenu")
}

