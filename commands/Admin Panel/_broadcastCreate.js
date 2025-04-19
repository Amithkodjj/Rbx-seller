/*CMD
  command: /broadcastCreate
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

if (!options) return;

let task = options?.run_all_task;
if (!task) return;

Bot.setProp("broadcast_task_id", task.id);

Api.sendMessage({
  text: `✅ <b>Broadcast Started!</b>\n\n🆔 <b>Task ID:</b> ${task.id}\n📍 <b>Position:</b> ${task.cur_position}\n📊 <b>Status:</b> ${task.status_code}\n\nℹ️ Use /broadcastProgress to view progress.`,
  parse_mode: "HTML"
});

