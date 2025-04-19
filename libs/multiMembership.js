// Check if bot is admin or not added in a channel
function isBotAdminInChannel(channel, callback) {
  Api.getChatMember({
    chat_id: channel,
    user_id: Bot.getProperty("my_bot_id"),
    on_result: function(res) {
      let status = res.status;
      if (status === "administrator" || status === "creator") {
        callback({ ok: true });
      } else {
        callback({ ok: false, reason: "Bot is not admin in " + channel });
      }
    },
    on_error: function() {
      callback({ ok: false, reason: "Bot is not added to " + channel });
    }
  });
}

// Get bot ID from Api.getMe() and save it once
function ensureBotId(callback) {
  let id = Bot.getProperty("my_bot_id");
  if (id) return callback(id);

  Api.getMe({
    on_result: function(res) {
      Bot.setProperty("my_bot_id", res.id, "integer");
      callback(res.id);
    },
    on_error: function() {
      callback(null);
    }
  });
}

// Check if user joined one channel
function isUserInChannel(channel, userId, callback) {
  Api.getChatMember({
    chat_id: channel,
    user_id: userId,
    on_result: function(res) {
      let status = res.status;
      callback(["member", "administrator", "creator"].includes(status));
    },
    on_error: function() {
      callback(false);
    }
  });
}

// Check bot admin status in all channels
function isBotAdminInAll(channels, callback) {
  ensureBotId(function(botId) {
    if (!botId) return callback({ ok: false, reason: "Cannot get bot ID" });

    let i = 0;
    function next() {
      if (i >= channels.length) return callback({ ok: true });

      isBotAdminInChannel(channels[i], function(result) {
        if (!result.ok) return callback({ ok: false, reason: result.reason });
        i++;
        next();
      });
    }

    next();
  });
}

// Check user membership in all channels
function isUserInAll(channels, userId, callback) {
  let i = 0;
  function next() {
    if (i >= channels.length) return callback({ ok: true });

    isUserInChannel(channels[i], userId, function(joined) {
      if (!joined) return callback({ ok: false, notJoinedChannel: channels[i] });
      i++;
      next();
    });
  }

  next();
}

// Final validation function
function validate(channels, userId, callback) {
  isBotAdminInAll(channels, function(botCheck) {
    if (!botCheck.ok) {
      return callback({
        status: false,
        is_joined: false,
        error_message: botCheck.reason
      });
    }

    isUserInAll(channels, userId, function(userCheck) {
      if (!userCheck.ok) {
        return callback({
          status: true,
          is_joined: false,
          error_message: "User not joined in: " + userCheck.notJoinedChannel
        });
      }

      callback({
        status: true,
        is_joined: true
      });
    });
  });
}

// Export it
publish({
  validate: validate
});
