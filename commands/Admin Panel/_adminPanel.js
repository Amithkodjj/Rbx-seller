/*CMD
  command: /adminPanel
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin = Bot.getProperty("admin");
let userID = user.telegramid;
let botLink = "@" + bot.name;

// Check if user is admin
if (userID !== admin) {
  return Api.sendMessage({
    text: `⛔ <i>You are not authorized to access ${botLink} admin panel.</i>`,
    parse_mode: "html"
  });
}

// Detect current page from params (handle both command & callback)
let page = 1;
if (!isNaN(parseInt(params))) {
  page = parseInt(params);
}

let adminName = user.first_name;
let currency = Bot.getProperty("currency") || "USD";
let bonus = Bot.getProperty("bonus") || 0;
let perRefer = Bot.getProperty("perRefer") || 0;
let minWithdrawal = Bot.getProperty("minimumWithdrawal") || 0;
let maxWithdrawal = Bot.getProperty("maximumWithdrawal") || 0;
let withdrawalStatus = Bot.getProperty("withdrawalStatus") || "Disabled";
let maintenanceStatus = Bot.getProperty("maintenanceStatus") || "Off";
let alertsChannel = Bot.getProperty("alertsChannel") || "Not Set";
let payoutChannel = Bot.getProperty("payoutChannel") || "Not Set";

// Admin Panel Text
let adminText =
  `👤 <b>Hello, ${adminName}</b>\n\n` +
  `📌 <b>${botLink} – Admin Panel (Page ${page})</b>\n\n` +
  `💱 <b>Currency:</b> ${currency}\n` +
  `🎁 <b>Daily Bonus:</b> ${bonus} ${currency}\n` +
  `👥 <b>Referral Reward:</b> ${perRefer} ${currency}\n\n` +
  `💸 <b>Min Withdrawal:</b> ${minWithdrawal} ${currency}\n` +
  `💰 <b>Max Withdrawal:</b> ${maxWithdrawal} ${currency}\n` +
  `🏧 <b>Withdrawals:</b> ${withdrawalStatus}\n\n` +
  `⚙️ <b>Maintenance:</b> ${maintenanceStatus}\n` +
  `📢 <b>Alerts:</b> ${alertsChannel}\n` +
  `💬 <b>Payout:</b> ${payoutChannel}`;

// Inline Buttons
let buttons;
if (page === 2) {
  buttons = [
    [
      { text: `💱 Set Currency (${currency})`, callback_data: "/setCurrency" },
      { text: `🎁 Set Bonus (${bonus})`, callback_data: "/setBonus" }
    ],
    [
      { text: `👥 Set Refer (${perRefer})`, callback_data: "/setPerRefer" }
    ],
    [
      { text: `🔻 Min Withdraw (${minWithdrawal})`, callback_data: "/setMinimumWithdrawal" },
      { text: `🔺 Max Withdraw (${maxWithdrawal})`, callback_data: "/setMaximumWithdrawal" }
    ],
    [
      { text: `🏧 Withdrawals (${withdrawalStatus})`, callback_data: "/setWithdrawalStatus" }
    ],
    [
      { text: `🛠 Maintenance (${maintenanceStatus})`, callback_data: "/setMaintenanceStatus" }
    ],
    [
      { text: `📢 Set Alerts`, callback_data: "/setAlertsChannel" },
      { text: `💬 Set Payout`, callback_data: "/setPayoutChannel" }
    ],
    [
      { text: "⏮️ Back", callback_data: "/adminPanel 1" }
    ]
  ];
} else {
buttons = [
  [
    { text: "➕ Add Balance", callback_data: "/addBalance" },
    { text: "➖ Remove Balance", callback_data: "/removeBalance" }
  ],
  [
    { text: "⛔ Ban User", callback_data: "/banUser" },
    { text: "✅ Unban User", callback_data: "/unbanUser" }
  ],
  [
    { text: "💬 Chat with User", callback_data: "/chatWithUser" },
    { text: "📨 Send Bot to User", callback_data: "/sendBot" }
  ],
  [
    { text: "📡 Set Channels", callback_data: "/setChannels" },
    { text: "📨 Broadcast", callback_data: "/broadcast" }
  ],
  [
    { text: "➡️ Next", callback_data: "/adminPanel 2" }
  ]
];

}

// Edit or Send
if (request.message) {
  Api.editMessageText({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id,
    text: adminText,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "html"
  });
} else {
  Api.sendMessage({
    text: adminText,
    reply_markup: { inline_keyboard: buttons },
    parse_mode: "html"
  });
}

