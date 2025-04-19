// Get and cache bot ID
function getBotId(callback) {
  let botId = Bot.getProperty("cached_bot_id");
  if (botId) return callback(botId);

  Api.getMe({
    on_result: function(res) {
      botId = res.id;
      Bot.setProperty("cached_bot_id", botId, "integer");
      callback(botId);
    },
    on_error: function() {
      callback(null);
    }
  });
}

// Improved: Check if a user is admin or give specific error if not added
function isAdminInChannel(channel, userId, callback) {
  Api.getChatMember({
    chat_id: channel,
    user_id: userId,
    on_result: function(res) {
      const status = res.status;
      if (status === "administrator" || status === "creator") {
        callback({ ok: true });
      } else {
        callback({ ok: false, reason: "Bot is not admin in " + channel });
      }
    },
    on_error: function(err) {
      callback({ ok: false, reason: "Bot is not added to " + channel });
    }
  });
}

// Check if user has joined a channel
function isUserInChannel(channel, userId, callback) {
  Api.getChatMember({
    chat_id: channel,
    user_id: userId,
    on_result: function(res) {
      const status = res.status;
      callback(["member", "administrator", "creator"].includes(status));
    },
    on_error: function() {
      callback(false);
    }
  });
}

// Bot admin check for all channels
function isBotAdminInAll(channels, callback) {
  getBotId(function(botId) {
    if (!botId) return callback({ ok: false, reason: "Failed to get bot ID" });

    let i = 0;
    function next() {
      if (i >= channels.length) return callback({ ok: true });

      isAdminInChannel(channels[i], botId, function(result) {
        if (!result.ok) {
          return callback({ ok: false, reason: result.reason });
        }
        i++;
        next();
      });
    }

    next();
  });
}

// User membership check
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

// Full validation
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

// Publish
publish({
  validate: validate
});
