/*CMD
  command: /standard_user2
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
    "🖤 *Enter the Amount of Robux You Need:*\n\n" +
    "╭──────────────────╮\n" +
    "│  🎮 *Robux Pricing*  │\n" +
    "│   ● *20,000 - 800,000* → `$3` per 1K │\n" +
    "╰──────────────────╯\n\n" +
    "💸 *Get the best deals and maximize your Robux purchases!*",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🔙 Back", callback_data: "/standard_user" }]
    ]
  }
});

// Proceed to the next step
Bot.runCommand("/standard_user3");

