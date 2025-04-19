/*CMD
  command: /select_page
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

let total = parseInt(params);
if (!total || total < 2) return;

let inline_keyboard = [];
let row = [];

for (let i = 1; i <= total; i++) {
  row.push({ text: i.toString(), callback_data: `/history ${i}` });

  if (row.length === 5 || i === total) {
    inline_keyboard.push(row);
    row = [];
  }
}

inline_keyboard.push([{ text: "🔙 Back", callback_data: "/history" }]);

Api.editMessageText({
  message_id: request.message.message_id,
  text: "📑 <b>Select a page to view your transaction history:</b>",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard }
});

