/*CMD
  command: 📊 Statistics
  help: 
  need_reply: false
  auto_retry_time: 
  folder: main menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /stats
  group: 
CMD*/

let channels = Bot.getProperty("channels") || [];

// Check channel membership
if (channels.length > 0 && User.getProperty("joined") !== "Yes") {
  Api.editMessageText({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id,
    text: "⚠️ <i>You must join our required channels to use the bot.</i>",
    parse_mode: "html"
  });
  Bot.runCommand("/start");
  return;
}

// Check if user is banned
if (Bot.getProperty(user.telegramid) === "Ban") {
  Api.editMessageText({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id,
    text: "🚫 <i>You are banned from using this bot.</i>",
    parse_mode: "html"
  });
  return;
}

// Maintenance mode check
if (Bot.getProperty("maintenanceStatus") === "On") {
  Api.editMessageText({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id,
    text: "🛠️ <i>Bot is currently under maintenance. Please try again later.</i>",
    parse_mode: "html"
  });
  return;
}

// Fetch stats and build the message
let status = Libs.ResourcesLib.anotherChatRes("status", "global");
let botUsername = "@" + bot.name;

let statsText =
  "<b>📈 " + botUsername + " | Bot Statistics</b>\n\n" +
  "👥 <b>Total Users:</b> <code>" + status.value() + "</code>\n" +
  "🛠️ <b>Version:</b> <code>1.0.0</code>\n" +
  "📅 <b>Launched:</b> <code>2024</code>\n" +
  "👑 <b>Creator:</b> @NOOBX7\n\n" +
  "🔁 <i>Stats auto-refresh regularly to reflect real-time growth.</i>";

// Back to menu button
let keyboard = {
  inline_keyboard: [[{ text: "⬅️ Back to Menu", callback_data: "/mainMenu" }]]
};

// Send stats
Api.editMessageText({
  chat_id: request.message.chat.id,
  message_id: request.message.message_id,
  text: statsText,
  parse_mode: "html",
  reply_markup: keyboard
});

