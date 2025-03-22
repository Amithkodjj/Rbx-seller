/*CMD
  command: /vip_callback
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

// Ensure options exist
if (!options) return

// Check if the payment request was successful
if (options.result == 100) {
  // Define payment buttons
  var button = [
    [{ text: "✅ Pay with Crypto", url: options.payLink }],
    [{ text: "❌ Cancel & Return to Menu", callback_data: "/start" }],
    [{ text: "📞 Contact Support", url: "telegram.me/NOOBX7" }]
  ]

  // Retrieve user purchase details
  var robux = User.getProperty("robux")
  var money = User.getProperty("amount")

  // Send payment instructions
  Api.sendMessage({
    text:
      "🛍 *Purchase Summary:*\n\n" +
      "╭──────────────────╮\n" +
      "│  🎮 *Robux:* `" +
      robux +
      "`  │\n" +
      "│  💰 *Total Cost:* `$" +
      money.toFixed(2) +
      "`  │\n" +
      "╰──────────────────╯\n\n" +
      "🛡 *Delivery Method:*\n" +
      "╰┈➤ Your Robux will be delivered *as an account* or *as a gift card*, " +
      "handled automatically by an agent of @NOOBX7.\n\n" +
      "💳 *Make your payment using the button below:*",
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: button }
  })
}

