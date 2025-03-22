/*CMD
  command: /buy_account
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /sell_account
  group: 
CMD*/

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "🚧 *Feature Coming Soon!*\n\n" +
        "💡 Meanwhile, you can *buy or sell* directly with @NOOBX7.",
  show_alert: true
});

