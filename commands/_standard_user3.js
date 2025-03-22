/*CMD
  command: /standard_user3
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Function to check if input is a valid number
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

// Convert user input to a number
var value = parseInt(message)

// Validate input
if (!isNumeric(value)) {
  Bot.sendMessage(
    "📛 *Invalid Input!*\n\n" +
      "╰┈➤ If you typed `100k`, please enter `100000` instead.\n\n" +
      "🔄 *Try again by entering the correct amount.*",
    { is_reply: true }
  )
  Bot.runCommand("/vip_user3")
  return
}

// Check if the amount is within the allowed range
if (value < 20000 || value > 800000) {
  Bot.sendMessage(
    "📛 *Invalid Amount!*\n\n" +
      "╭──────────────────╮\n" +
      "│  🎯 *Allowed Range:*  │\n" +
      "│   ● Minimum: `20,000`   │\n" +
      "│   ● Maximum: `800,000`  │\n" +
      "╰──────────────────╯\n\n" +
      "🔄 *Please enter a valid amount.*",
    { is_reply: true }
  )
  Bot.runCommand("/standard_user3")
  return
}

// Define price per 1,000 Robux
var price = 3

// Function to generate a random Order ID
function generateString(length) {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
  var result = ""
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Calculate total payment amount
var amo = (value / 1000) * price
var webhookUrl = Libs.Webhooks.getUrlFor({ command: "/vip_callback", user_id: user.id });
// Process payment using OxaPay
Libs.OxaPayLib.apiCall({
  url: "merchants/request",
  fields: {
    merchant: "DA7UUW-4CR332-MEKWK3-YK7Y6S",
    amount: amo,
    onCallback: "/vip_callback" ,
    orderId: generateString(5)
  },
  onSuccess: "/vip_success"
})

// Save user transaction details
User.setProperty("amount", amo, "float")
User.setProperty("robux", value, "integer")

// Confirmation message
Bot.sendMessage(
  "✅ *Payment Request Sent!*\n\n" +
    "╭──────────────────╮\n" +
    "│  🎮 *Robux Purchased:* `" +
    value +
    "`  │\n" +
    "│  💰 *Total Cost:* `$" +
    amo.toFixed(2) +
    "`  │\n" +
    "╰──────────────────╯\n\n" +
    "⌛ *Please wait while we process your payment...*"
)

