/*CMD
  command: /transaction_history
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

// Retrieve transaction history and total amount spent
var transactions = User.getProperty("transactions") || [];
var totalSpent = User.getProperty("total_spent") || 0;

// Pagination settings
var perPage = 10;
var page = params ? parseInt(params) : 1;
var totalPages = Math.ceil(transactions.length / perPage);

// If no transactions exist, show a message
if (totalPages === 0) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text:
      "📜 *Transaction History*\n\n" +
      "❌ No transactions found.\n" +
      "💳 Make a purchase to start tracking your transactions!",
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[{ text: "🔙 Back to Menu", callback_data: "/start" }]]
    }
  });
  return;
}

// Ensure the page is within valid limits
if (page > totalPages) page = totalPages;
if (page < 1) page = 1;

// Get transactions for the current page
var start = (page - 1) * perPage;
var end = start + perPage;
var pageTransactions = transactions.slice(start, end);

// Format transaction history message
var message =
  "📜 *Your Transaction History*\n\n" +
  "💰 *Total Spent:* `$" + totalSpent.toFixed(2) + "`\n" +
  "📅 *Page " + page + " of " + totalPages + "*\n\n";

for (var i = 0; i < pageTransactions.length; i++) {
  var tx = pageTransactions[i];
  message +=
    "╭──────────────────╮\n" +
    "│  🎮 *Robux:* `" + tx.robux + "`  │\n" +
    "│  💲 *Paid:* `$" + tx.amount.toFixed(2) + "`  │\n" +
    "│  ⏳ *Date:* `" + tx.date + "`  │\n" +
    "╰──────────────────╯\n\n";
}

// Inline Keyboard for Navigation
var buttons = [];
if (page > 1) {
  buttons.push({ text: "⬅️ Previous", callback_data: "/history " + (page - 1) });
}
if (page < totalPages) {
  buttons.push({ text: "Next ➡️", callback_data: "/history " + (page + 1) });
}

// Add "Back to Menu" button
buttons.push({ text: "🔙 Back to Menu", callback_data: "/start" });

// Send updated transaction history
Api.editMessageText({
  message_id: request.message.message_id,
  text: message,
  parse_mode: "Markdown",
  reply_markup: { inline_keyboard: [buttons] }
});

