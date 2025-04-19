/*CMD
  command: /chatWithUser2
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var admin = Bot.getProperty("admin");
var userID = user.telegramid;
var botLink = "@" + bot.name;

// Check if user is admin
if (userID === admin) {
  let chatID = Bot.getProperty("chatID");
  let messageText = message;

  if (!chatID) {
    let noChatText = "⚠️ <b>No active chat found to send the message.</b>";

    if (request.message) {
      Api.editMessageText({
        chat_id: request.message.chat.id,
        message_id: request.message.message_id,
        text: noChatText,
        parse_mode: "html"
      });
    } else {
      Api.sendMessage({
        text: noChatText,
        parse_mode: "html"
      });
    }
    return;
  }

  // Send message to user
  Api.sendMessage({
    chat_id: chatID,
    text: "💬 <b>Message from Admin:</b>\n\n👉 <i>" + messageText + "</i>",
    reply_markup: {
      inline_keyboard: [[{ text: "💬 Reply to Admin", callback_data: "/support" }]]
    },
    parse_mode: "html"
  });

  // Confirmation to admin
  let adminConfirmation =
    "✅ <b>Message sent successfully!</b>\n\n" +
    "📨 <b>Sent to User ID:</b> <code>" + chatID + "</code>\n" +
    "📝 <b>Message Content:</b>\n👉 <i>" + messageText + "</i>";

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: adminConfirmation,
      parse_mode: "html"
    });
  } else {
    Api.sendMessage({
      text: adminConfirmation,
      parse_mode: "html"
    });
  }

} else {
  // User is not admin
  let notAdminText = "⚠️ <i>You are not authorized to send messages as admin in " + botLink + ".</i>";

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: notAdminText,
      parse_mode: "html"
    });
  } else {
    Api.sendMessage({
      text: notAdminText,
      parse_mode: "html"
    });
  }
}

