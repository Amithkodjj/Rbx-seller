/*CMD
  command: /history
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

let page = parseInt(params) || 1;
let perPage = 5;

let history = User.getProperty("transactionHistory") || [];

if (history.length === 0) {
  return Api.editMessageText({
    message_id: request.message.message_id,
    text: "❌ <b>You have no transaction history yet.</b>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: "⬅️ Back to Menu", callback_data: "/mainMenu" }]
      ]
    }
  });
}

let totalPages = Math.ceil(history.length / perPage);
if (page < 1) page = 1;
if (page > totalPages) page = totalPages;

let start = (page - 1) * perPage;
let end = start + perPage;
let currentPageItems = history.slice(start, end);

let msg = `<b>📄 Transaction History</b>\nPage <b>${page}</b> of <b>${totalPages}</b>\n\n`;

for (let i = 0; i < currentPageItems.length; i++) {
  let tx = currentPageItems[i];
  msg += `💳 <b>Amount:</b> ${tx.amount} ${tx.currency}\n`;
  msg += `👛 <b>Wallet:</b> <code>${tx.wallet}</code>\n`;
  msg += `🕒 <b>Date:</b> ${tx.date}\n`;
  msg += `📌 <b>Status:</b> ${tx.status || "Unknown"}\n`;
  msg += `────────────\n`;
}

let navRow = [
  page > 1 ? { text: "◀️ Prev", callback_data: `/history ${page - 1}` } : null,
  { text: `📄 Page ${page}`, callback_data: "noop" },
  page < totalPages ? { text: "Next ▶️", callback_data: `/history ${page + 1}` } : null
].filter(Boolean);

let buttons = [
  navRow,
  [{ text: "📑 Go to Page", callback_data: `/select_page ${totalPages}` }],
  [
    { text: "🗑️ Clear History", callback_data: "/clear_history" },
    { text: "⬅️ Back to Menu", callback_data: "/mainMenu" }
  ]
];

Api.editMessageText({
  message_id: request.message.message_id,
  text: msg,
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: buttons }
});

