/*CMD
  command: 👩‍💻 Account
  help: 
  need_reply: false
  auto_retry_time: 
  folder: main menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /account
  group: 
CMD*/

let channels = Bot.getProperty("channels") || [];
let joined = User.getProperty("joined");
let userID = user.telegramid;
let userName = user.first_name;
let username = user.username ? "@" + user.username : "N/A";
let userLink = "<a href='tg://user?id=" + userID + "'>" + userName + "</a>";
let currency = Bot.getProperty("currency") || "USD";
let balance = Libs.ResourcesLib.userRes("balance").value().toFixed(2);

// Channel join check
if (channels.length > 0 && joined !== "Yes") {
  Bot.sendMessage("⚠️ You must join our channels to use the bot.");
  Bot.runCommand("/start");
  return;
}
// Maintenance check
if (Bot.getProperty("maintenanceStatus") === "On") {
  Bot.sendMessage("🛠️ Bot is under maintenance. Please try again later.");
  return;
}

// Info message
let infoText =
  "<b>🧒 User:</b> " + userName + "\n" +
  "<b>🔗 User Link:</b> " + userLink + "\n" +
  "<b>👉 Username:</b> " + username + "\n" +
  "<b>🆔 User ID:</b> <code>" + userID + "</code>\n\n" +
  "<b>💸 Balance:</b> <code>" + balance + " " + currency + "</code>";

let keyboard = {
  inline_keyboard: [
    [{ text: "⬅️ Back to Menu", callback_data: "/mainMenu" }]
  ]
};

// Safe display for both normal & callback message
if (request.message && request.message.message_id) {
  Api.editMessageText({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id,
    text: infoText,
    parse_mode: "html",
    reply_markup: keyboard
  });
} else {
  Api.sendMessage({
    text: infoText,
    parse_mode: "html",
    reply_markup: keyboard
  });
}

