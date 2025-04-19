/*CMD
  command: /setMaintenanceStatus
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER
*🛠️ Send the mode which you want to set as maintenance status from the options below 👇

👉 Options :* `On` */* `Off`
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var admin = Bot.getProperty("admin");
var userID = user.telegramid;
var botLink = "@" + bot.name;

// Check if user is admin
if (userID === admin) {
  let maintenance = message.trim();

  if (maintenance === "On" || maintenance === "Off") {
    Bot.setProperty("maintenanceStatus", maintenance, "string");

    let statusText = 
      "🛠️ <b>Maintenance mode has been updated to:</b> <code>" + maintenance + "</code>";

    if (request.message) {
      Api.editMessageText({
        chat_id: request.message.chat.id,
        message_id: request.message.message_id,
        text: statusText,
        parse_mode: "html"
      });
    } else {
      Api.sendMessage({
        text: statusText,
        parse_mode: "html"
      });
    }

    // Redirect admin back to the Admin Panel
    Bot.runCommand("/admin");

  } else {
    let errorText =
      "⚠️ <b>Invalid input!</b>\n\n" +
      "Please send either <code>On</code> or <code>Off</code> to update the maintenance status.";

    if (request.message) {
      Api.editMessageText({
        chat_id: request.message.chat.id,
        message_id: request.message.message_id,
        text: errorText,
        parse_mode: "html"
      });
    } else {
      Api.sendMessage({
        text: errorText,
        parse_mode: "html"
      });
    }

    // Ask again
    Bot.runCommand("/setMaintenanceStatus");
  }

} else {
  // User is not admin
  let notAdminText = "⚠️ <i>You are not authorized to change the maintenance status of " + botLink + ".</i>";

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: notAdminText,
      parse_mode: "html"
    });
  } else {
    Api.sendMessage({
      text: notAdminText,
      parse_mode: "html"
    });
  }
}

