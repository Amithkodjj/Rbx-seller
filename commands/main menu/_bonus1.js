/*CMD
  command: /bonus1
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

let channels = Bot.getProperty("channels") || [];
if (channels.length > 0 && User.getProperty("joined") !== "Yes") {
  let notJoinedText = "⚠️ <b>Hold on! You need to join our official channels to continue.</b>\n\n📲 <i>Click the button below after subscribing to verify your access and unlock the bot features!</i>";

  let joinKeyboard = { inline_keyboard: [[{ text: "✅ I’ve Joined", callback_data: "/joined" }]] };

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: notJoinedText,
      parse_mode: "html",
      reply_markup: joinKeyboard
    });
  } else {
    Api.sendMessage({
      text: notJoinedText,
      parse_mode: "html",
      reply_markup: joinKeyboard
    });
  }

  return;
}

if (Bot.getProperty(user.telegramid) === "Ban") {
  let banText = "⛔ <b>Access Blocked!</b>\n\n❗ <i>It seems your account has been banned from using this bot. If this is unexpected, please reach out to support for help or clarification.</i>";

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: banText,
      parse_mode: "html"
    });
  } else {
    Api.sendMessage({
      text: banText,
      parse_mode: "html"
    });
  }
  return;
}

if (Bot.getProperty("maintenanceStatus") === "On") {
  let maintenanceText = "🧰 <b>We’re currently working behind the scenes!</b>\n\n🕒 <i>The bot is under scheduled maintenance. Please check back shortly—we’ll be up and running soon!</i>";

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: maintenanceText,
      parse_mode: "html"
    });
  } else {
    Api.sendMessage({
      text: maintenanceText,
      parse_mode: "html"
    });
  }
  return;
}

User.setProperty("bonusCollected", "No", "string");

let bonusText = "🎉 <b>Good news! Your daily bonus is now available.</b>\n\n💸 <i>Tap the button below to instantly collect your reward and boost your balance for the day. Come back tomorrow for more bonuses!</i>";
let buttons = [[{ text: "🎁 Claim My Bonus", callback_data: "/bonus" }]];

if (request.message) {
  Api.editMessageText({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id,
    text: bonusText,
    parse_mode: "html",
    reply_markup: { inline_keyboard: buttons }
  });
} else {
  Api.sendMessage({
    text: bonusText,
    parse_mode: "html",
    reply_markup: { inline_keyboard: buttons }
  });
}

