/*CMD
  command: /standard_user
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

Api.editMessageText({
  message_id: request.message.message_id,
  text:
    "💸 *Welcome to the Standard Store, Dear User!*\n\n" +
    "╭──────────────────╮\n" +
    "│  🎮 *Robux Pricing*  │\n" +
    "│   ● *20,000 - 800,000* → `$3` per 1K │\n" +
    "╰──────────────────╯\n\n" +
    "✨ *Get the best price for Robux as a Standard User!*\n" +
    "💰 *Boost your profit with every purchase!*",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🛒 Buy Now", callback_data: "/standard_user2" }],
      [{ text: "🔙 Back to Menu", callback_data: "/start" }]
    ]
  }
});

