/*CMD
  command: /clear_history
  help: 
  need_reply: false
  auto_retry_time: 
  folder: main menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

User.setProperty("transactionHistory", [], "json");

Api.editMessageText({
  message_id: request.message.message_id,
  text: "🗑️ <b>Your transaction history has been cleared.</b>",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [{ text: "⬅️ Back to Menu", callback_data: "/mainMenu" }]
    ]
  }
});

