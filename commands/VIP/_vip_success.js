/*CMD
  command: /vip_success
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
if (!options) return;

// Handle different payment statuses
if (options.status == "Confirming") {
  Bot.sendMessage(
    "📢 *Your payment is confirming...*\n\n" +
    "╰┈➤ *Amount:* `" + options.payAmount + " " + options.payCurrency + "`\n" +
    "⏳ *Please wait for confirmation.*"
  );
} 
else if (options.status == "Paid") {
  // Notify admin about payment
  Api.sendMessage({
    chat_id: 1493164653,
    text:
      "📢 *New Payment Received!*\n\n" +
      "📌 *Track ID:* `" + options.trackId + "`\n" +
      "📜 *Order ID:* `" + options.orderId + "`\n" +
      "✅ *Status:* `" + options.status + "`"
  });

  // Retrieve transaction history or initialize if empty
  var transactions = User.getProperty("transactions") || [];

  // Retrieve user's total spent amount
  var totalSpent = User.getProperty("total_spent") || 0;

  // Get transaction details
  var robux = User.getProperty("robux");
  var amount = User.getProperty("amount");
  var date = Libs.DateTimeFormat.format(new Date(), "yyyy-MM-dd HH:mm:ss");

  // Create a transaction object
  var transaction = {
    robux: robux,
    amount: amount,
    date: date
  };

  // Add the transaction to the history
  transactions.push(transaction);

  // Update total spent
  totalSpent += parseFloat(amount);

  // Save properties
  User.setProperty("transactions", transactions, "json");
  User.setProperty("total_spent", totalSpent, "float");

  // Notify user of successful payment
  Bot.sendMessage(
    "✅ *Payment Successful!*\n\n" +
    "╭──────────────────╮\n" +
    "│  🎮 *Robux Purchased:* `" + robux + "`  │\n" +
    "│  💰 *Amount Paid:* `$" + amount.toFixed(2) + "`  │\n" +
    "│  📊 *Total Spent:* `$" + totalSpent.toFixed(2) + "`  │\n" +
    "╰──────────────────╯\n\n" +
    "🔔 *An agent will contact you soon!*"
  );
}

