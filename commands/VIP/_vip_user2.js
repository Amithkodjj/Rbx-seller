/*CMD
  command: /vip_user2
  help: 
  need_reply: false
  auto_retry_time: 
  folder: VIP

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Get total amount spent by the user
var transaction = User.getProperty("total_spent") || 0;

// Check if user qualifies for VIP pricing
if (parseFloat(transaction) >= 500) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text:
      "🖤 *VIP Pricing - Enter the Amount of Robux You Need:*\n\n" +
      "╭──────────────────╮\n" +
      "│  🎮 *Robux Pricing (VIP)*  │\n" +
      "│   ● *30,000 - 50,000* → `$2.9` per 1K │\n" +
      "│   ● *50,001 - 80,000* → `$2.8` per 1K │\n" +
      "│   ● *80,001 - 110,000* → `$2.7` per 1K │\n" +
      "│   ● *110,001 - 800,000* → `$2.5` per 1K │\n" +
      "╰──────────────────╯\n\n" +
      "🚀 *Get the best Robux prices as a VIP!*",
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "🔙 Back", callback_data: "/vip_user" }]
      ]
    }
  });

  // Proceed to the next step
  Bot.runCommand("/vip_user3");
}

