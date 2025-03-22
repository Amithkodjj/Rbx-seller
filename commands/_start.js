/*CMD
  command: /start
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

// Welcome message
var text =
  "✨ *Welcome to the Roblox Product Bot!* ✨\n\n" +
  "╭──────────────────╮\n" +
  "│  🎮 *Robux Pricing*  │\n" +
  "│   ● Minimum Purchase: *20,000 Robux* │\n" +
  "│   ● Maximum Purchase: *800,000 Robux* │\n" +
  "│   💳 *We accept all cryptocurrencies!* │\n" +
  "╰──────────────────╯\n\n" +
  "🚀 *Use the buttons below to get started!*";

// Inline keyboard buttons
var button = [
  [{ text: "👑 VIP User", callback_data: "/vip_user" }],
  [
    { text: "⭐ Standard User", callback_data: "/standard_user" },
    { text: "🛒 Buy Account", callback_data: "/buy_account" }
  ],
  [{ text: "📤 Sell Your Account", callback_data: "/sell_account" }],
  [
    { text: "📜 Transaction History", callback_data: "/transaction_history" },
    { text: "ℹ️ About Bot", callback_data: "/about_bot" }
  ],
  [{ text: "📞 Support", url: "telegram.me/NOOBX7" }]
];

// Send or edit the message based on request type
if (request.message) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: text,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: button }
  });
  return;
} else {
  Api.sendMessage({
    text: text,
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: button }
  });
}

// Track new users
var exist = User.getProperty("exist");
var users = Libs.ResourcesLib.anotherChatRes("users", "global");

if (!exist) {
  User.setProperty("exist", "existed", "string");
  var userLink =
    "<a href='tg://user?id=" + user.telegramid + "'>" + user.first_name + "</a>";
  
  users.add(1);

  var news =
    "🎉 <b>New User Joined!</b>\n\n" +
    "👤 <b>Name:</b> " + user.first_name + "\n" +
    "🔗 <b>Username:</b> @" + (user.username || "No Username") + "\n" +
    "🔗 <b>Profile:</b> " + userLink + "\n" +
    "🆔 <b>ID:</b> <code>" + user.telegramid + "</code>\n\n" +
    "📊 <b>Total Users:</b> <code>" + users.value() + "</code>";

  Api.sendMessage({ chat_id: "1493164653", text: news, parse_mode: "HTML" });
}

