/*CMD
  command: /broadcastProgress
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let task_id = Bot.getProperty("broadcast_task_id");
if (!task_id) {
  Api.sendMessage({
    text: "⚠️ No active broadcast task.\nStart one with /broadcast.",
    reply_to_message_id: request.message_id
  });
  return;
}

let task = new RunAllTask({ id: task_id });

Api.sendMessage({
  text: `📡 <b>Broadcast Status</b>\n\n🆔 <b>ID:</b> ${task.id}\n📍 <b>Position:</b> ${task.cur_position}\n📊 <b>Progress:</b> ${task.progress}%\n⏱️ <b>Started:</b> ${task.created_at}\n📦 <b>Total:</b> ${task.total}\n⚙️ <b>Speed:</b> ${task.speed}\n🔁 <b>Status:</b> ${task.status}`,
  parse_mode: "HTML",
  reply_to_message_id: request.message_id
});

