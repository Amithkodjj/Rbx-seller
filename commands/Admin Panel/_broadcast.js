/*CMD
  command: /broadcast
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!chat || chat.chat_type !== "private") {
  return;
}

let message_id = request?.reply_to_message?.message_id;
let chat_id = request?.reply_to_message?.chat?.id;

if (!message_id) {
  Api.editMessageText({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id,
    text:
      "📣 <b>How to Broadcast:</b>\n\n" +
      "1. Type a message like <code>Hi everyone</code>.\n" +
      "2. Reply to your message with <code>/broadcast</code>.\n\n" +
      "This will send it to all users.",
    parse_mode: "html",
    reply_markup: {
      inline_keyboard: [
        [{ text: "🔙 Back to Admin Panel", callback_data: "/adminPanel" }]
      ]
    }
  });
  return;
}

// Proceed with broadcast
Bot.runAll({
  command: "/news",
  for_chats: "private-chats",
  on_create: "/broadcastCreate",
  options: {
    chat_id: chat_id,
    message_id: message_id
  }
});

