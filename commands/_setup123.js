/*CMD
  command: /setup123
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


  Libs.OxaPayLib.setPayoutApiKey("Y2NVKX-L6DP3M-FFH838-DUSGE1"); 
 Libs.OxaPayLib.setMerchantKey("DA7UUW-4CR332-MEKWK3-YK7Y6S");
  Bot.sendMessage("Setup was completed successfully")
