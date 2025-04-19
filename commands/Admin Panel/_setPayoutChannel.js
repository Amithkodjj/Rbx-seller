/*CMD
  command: /setPayoutChannel
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel
  answer: *Send Payout Channel Username With @*

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (user.telegramid !== Bot.getProperty("admin")) {
  return
}

let newChannel = message.trim()
Bot.setProperty("payoutChannel", newChannel, "string")

Api.sendMessage({
  text: `✅ Payout channel has been updated to:\n<code>${newChannel}</code>`,
  parse_mode: "html"
})

Bot.runCommand("/adminPanel") // Optional: return to admin panel

