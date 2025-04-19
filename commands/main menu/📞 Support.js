/*CMD
  command: 📞 Support
  help: 
  need_reply: false
  auto_retry_time: 
  folder: main menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /support
  group: 
CMD*/

// Command: /support (triggered by inline button "Support")

Api.editMessageText({
  message_id: request.message.message_id,
  text: "<b>📨 Send your message below:</b>\n\nPlease type your message and we’ll forward it to our support team. You’ll receive a reply here as soon as possible.",
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🔙 Back to Menu", callback_data: "/mainMenu" }]
    ]
  }
})

// Set waiting state to capture next message
User.setProperty("awaitingSupportMessage", true, "boolean")
Bot.runCommand("/support2")
