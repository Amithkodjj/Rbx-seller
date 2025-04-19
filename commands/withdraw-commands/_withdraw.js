/*CMD
  command: /withdraw
  help: 
  need_reply: true
  auto_retry_time: 
  folder: withdraw-commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let channels = Bot.getProperty("channels") || [];
if (channels.length > 0 && User.getProperty("joined") !== "Yes") {
  let notJoinedText = "🔐 <b>Access Locked!</b>\n\n📣 <i>To continue, please subscribe to all our official channels. Tap the button below once done to verify your access.</i>";

  let joinKeyboard = { inline_keyboard: [[{ text: "✅ I Joined", callback_data: "/joined" }]] };

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: notJoinedText,
      parse_mode: "html",
      reply_markup: joinKeyboard
    });
  } else {
    Api.sendMessage({
      text: notJoinedText,
      parse_mode: "html",
      reply_markup: joinKeyboard
    });
  }
  return;
}

if (Bot.getProperty(user.telegramid) === "Ban") {
  let banText = "🚫 <b>Your access to this bot has been restricted.</b>\n\n📨 <i>If you think this is a mistake, please reach out to support for assistance.</i>";

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: banText,
      parse_mode: "html"
    });
  } else {
    Api.sendMessage({
      text: banText,
      parse_mode: "html"
    });
  }
  return;
}

if (Bot.getProperty("maintenanceStatus") === "On") {
  let maintenanceText = "🧰 <b>Maintenance in Progress</b>\n\n🕐 <i>The bot is temporarily unavailable. Please check back shortly—thanks for your patience!</i>";

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: maintenanceText,
      parse_mode: "html"
    });
  } else {
    Api.sendMessage({
      text: maintenanceText,
      parse_mode: "html"
    });
  }
  return;
}

let amount = parseFloat(message);
if (isNaN(amount) || amount <= 0) {
  let invalidAmountText = "❗ <b>Invalid input!</b>\n\n💬 <i>Please enter a valid withdrawal amount in numbers.</i>";

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: invalidAmountText,
      parse_mode: "html"
    });
  } else {
    Api.sendMessage({
      text: invalidAmountText,
      parse_mode: "html"
    });
  }

  Bot.runCommand("/withdraw");
  return;
}

let minimumWithdrawal = parseFloat(Bot.getProperty("minimumWithdrawal") || 0);
let maximumWithdrawal = parseFloat(Bot.getProperty("maximumWithdrawal") || 0);
let currency = Bot.getProperty("currency") || "USD";
let balance = Libs.ResourcesLib.userRes("balance");

if (amount < minimumWithdrawal) {
  let minWithdrawText = `⚠️ <b>Minimum withdrawal allowed:</b> <code>${minimumWithdrawal} ${currency}</code>\n\n🔺 <i>Enter a higher amount to proceed.</i>`;

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: minWithdrawText,
      parse_mode: "html"
    });
  } else {
    Api.sendMessage({
      text: minWithdrawText,
      parse_mode: "html"
    });
  }

  Bot.runCommand("/withdraw");
  return;
}

if (amount > balance.value()) {
  let insufficientBalanceText = `💸 <b>Not enough funds!</b>\n\n💼 <b>Your balance:</b> <code>${balance.value().toFixed(2)} ${currency}</code>\n\n🔁 <i>Please enter a lower amount.</i>`;

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: insufficientBalanceText,
      parse_mode: "html"
    });
  } else {
    Api.sendMessage({
      text: insufficientBalanceText,
      parse_mode: "html"
    });
  }

  Bot.runCommand("/mainMenu");
  return;
}

if (amount > maximumWithdrawal) {
  let maxWithdrawText = `🚫 <b>Exceeds max withdrawal limit:</b> <code>${maximumWithdrawal} ${currency}</code>\n\n📉 <i>Try entering a smaller amount.</i>`;

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: maxWithdrawText,
      parse_mode: "html"
    });
  } else {
    Api.sendMessage({
      text: maxWithdrawText,
      parse_mode: "html"
    });
  }

  Bot.runCommand("/withdraw");
  return;
}

User.setProperty("amount", amount, "string");

let wallet = User.getProperty("wallet") || "Not set";

let confirmationText = 
  `<b>🧾 Confirm Withdrawal</b>\n\n` +
  `💲 <b>Amount:</b> <code>${amount} ${currency}</code>\n` +
  `🏧 <b>Wallet:</b> <code>${wallet}</code>\n\n` +
  `🟢 <i>Please confirm the details below to proceed.</i>`;

let buttons = [
  [{ text: "✅ Confirm", callback_data: "/confirm" }, { text: "❌ Cancel", callback_data: "/cancel" }]
];

if (request.message) {
  Api.editMessageText({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id,
    text: confirmationText,
    parse_mode: "html",
    reply_markup: { inline_keyboard: buttons }
  });
} else {
  Api.sendMessage({
    text: confirmationText,
    parse_mode: "html",
    reply_markup: { inline_keyboard: buttons }
  });
}

