/*CMD
  command: /about_bot
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
    "🤖 *Welcome to the Ultimate Roblox Product Bot!* 🤖\n\n" +
    "╭──────────────────────────────────╮\n" +
    "│  🎮 *What is this bot?*  │\n" +
    "╰──────────────────────────────────╯\n\n" +
    "This bot is designed to provide **instant access to premium Robux at unbeatable prices**. " +
    "Whether you're a casual player or a hardcore trader, we ensure you get **clean, fast, and reliable Robux** " +
    "through various purchasing methods, including **gift cards, direct transfers, and preloaded accounts**.\n\n" +
    "╭──────────────────────────────────╮\n" +
    "│  💰 *How does it work?*  │\n" +
    "╰──────────────────────────────────╯\n\n" +
    "1️⃣ *Choose a user type:* VIP or Standard.\n" +
    "2️⃣ *Enter the amount of Robux you need.*\n" +
    "3️⃣ *Make a payment using cryptocurrency.*\n" +
    "4️⃣ *Receive your Robux instantly or through an assigned agent.*\n\n" +
    "Everything is handled **securely, efficiently, and professionally** to ensure a seamless experience.\n\n" +
    "╭──────────────────────────────────╮\n" +
    "│  🌟 *VIP vs Standard Users*  │\n" +
    "╰──────────────────────────────────╯\n\n" +
    "● *Standard Users:* Pay **$3 per 1K Robux**.\n" +
    "● *VIP Users:* Enjoy **discounted prices** after spending $500+ on the bot.\n\n" +
    "Being a VIP means you get **priority support, faster transactions, and exclusive deals**.\n\n" +
    "╭──────────────────────────────────╮\n" +
    "│  🔐 *Security & Trust*  │\n" +
    "╰──────────────────────────────────╯\n\n" +
    "We use **blockchain-based transactions** to ensure your purchases are **secure and irreversible**. " +
    "All payments are processed using **Oxapay and other trusted crypto payment gateways**, " +
    "making every transaction **safe, private, and efficient**.\n\n" +
    "╭──────────────────────────────────╮\n" +
    "│  🚀 *Why Choose Us?*  │\n" +
    "╰──────────────────────────────────╯\n\n" +
    "✅ *Unbeatable Pricing:* No hidden fees, no overpricing.\n" +
    "✅ *Fast & Secure Transactions:* Crypto-based payments for reliability.\n" +
    "✅ *Dedicated Support:* Need help? Our agents are always available.\n" +
    "✅ *Multiple Payment Options:* Choose what works best for you.\n" +
    "✅ *Instant Delivery:* No waiting, no hassle.\n\n" +
    "╭──────────────────────────────────╮\n" +
    "│  📞 *Support & Contact*  │\n" +
    "╰──────────────────────────────────╯\n\n" +
    "For any issues or inquiries, please contact **@NOOBX7** directly. " +
    "We are available 24/7 to ensure your experience is smooth and hassle-free.\n\n" +
    "🎮 *Enjoy your Robux journey with us!* 🚀",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [[{ text: "🔙 Back to Menu", callback_data: "/start" }]]
  }
});

