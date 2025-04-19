/*CMD
  command: /check
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

if (content) {
  const { status, is_joined } = JSON.parse(content);
  let expectedCount = User.getProperty("joinCount") || 0;

  if (status === "false") {
    return Bot.sendMessage("⚠️ Bot must be admin in all channels to check properly.");
  }

  if (is_joined) {
    User.setProperty("joined", "Yes", "string");
    Bot.sendMessage("✅ You’ve joined all required channels!");
    Bot.runCommand("/mainMenu");
  } else {
    User.setProperty("joined", "No", "string");
    User.setProperty("joinCount", 0, "integer"); // reset
    Bot.sendMessage("⚠️ You must join all channels to continue.\n\nClick /start to try again.");
  }
}

