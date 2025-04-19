/*CMD
  command: /myreferrals
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

let refList = Libs.ReferralLib.getRefList();
let referralDetails = "📊 <b>Your Referral Summary</b>\n\n";
referralDetails += "📌 <b>Total Invites:</b> " + Libs.ReferralLib.getRefCount();

if (refList.exist) {
  referralDetails += "\n🕓 <b>First Referral:</b> " + refList.created_at + "\n\n";
  referralDetails += "👥 <b>Invited Users:</b>\n";

  let referredUsers = refList.getUsers();
  for (var index in referredUsers) {
    let user = referredUsers[index];
    referralDetails += `➤ <a href="tg://user?id=${user.telegramid}">${user.first_name || "Unnamed User"}</a>\n`;
  }
} else {
  referralDetails = "😕 <b>No referrals yet!</b>\nStart sharing your invite link to see your referrals here.";
}

let backButton = [[{ text: "⬅️ Back to Referral Panel", callback_data: "/refer" }]];

if (request.message && request.message.message_id) {
  Api.editMessageText({
    message_id: request.message.message_id,
    text: referralDetails,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: backButton }
  });
} else {
  Api.sendMessage({
    text: referralDetails,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: backButton }
  });
}

