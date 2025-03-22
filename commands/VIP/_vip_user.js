/*CMD
  command: /vip_user
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

// Check if the user is a VIP
if (transaction < 500) {
  // Show an alert that the user is not a VIP
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ You are not a VIP user!\n\n🔹 You need to spend *$500* on this bot to unlock VIP benefits.",
    show_alert: true
  });

  // Send a message explaining VIP access
  Api.editMessageText({
    message_id: request.message.message_id,
    text:
      "👀 *Exclusive VIP Access*\n\n" +
      "💎 If you've spent *$500+* on this bot, you unlock *incredibly low* Robux prices!\n\n" +
      "╭──────────────────╮\n" +
      "│  🤝 *VIP Partnership Access*  │\n" +
      "│   ● *Instant access:* Partner with @NOOBX7  │\n" +
      "│   ● *Investment:* `$100 - $300` (mid-term)  │\n" +
      "│   ● *Earnings:* Get back your investment + *10% profit*  │\n" +
      "│   🔄 *VIP resets after payout, rejoin anytime!*  │\n" +
      "╰──────────────────╯",
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[{ text: "🔙 Back to Menu", callback_data: "/start" }]]
    }
  });
  return;
}

// If the user is VIP, show VIP store details
Api.editMessageText({
  message_id: request.message.message_id,
  text:
    "💎 *Welcome to the VIP Store!*\n\n" +
    "🔹 *Exclusive Robux Pricing for VIPs:*\n" +
    "╭──────────────────╮\n" +
    "│   ● *30,000 - 50,000* → `$2.9` per 1K  │\n" +
    "│   ● *50,001 - 80,000* → `$2.8` per 1K  │\n" +
    "│   ● *80,001 - 110,000* → `$2.7` per 1K  │\n" +
    "│   ● *110,001 - 800,000* → `$2.5` per 1K  │\n" +
    "╰──────────────────╯\n\n" +
    "🚀 *Enjoy the best Robux prices & maximize your profits!*",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🛒 Buy Now", callback_data: "/vip_user2" }],
      [{ text: "🔙 Back to Menu", callback_data: "/start" }]
    ]
  }
});

