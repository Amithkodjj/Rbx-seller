/*CMD
  command: /storePayoutMessageID
  help: 
  need_reply: false
  auto_retry_time: 
  folder: withdraw-commands

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let userID = params
if (!options || !options.result || !options.result.message_id) return

let messageID = options.result.message_id
Bot.setProperty(`payoutMessage_${userID}`, messageID, "integer")
