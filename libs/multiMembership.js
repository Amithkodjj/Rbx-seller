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

// Check if a specific user is admin in a channel
function isAdminInChannel(channel, userId, callback) {
  Api.getChatMember({
    chat_id: channel,
    user_id: userId,
    on_result: function(res) {
      const status = res.status;
      callback(status === "administrator" || status === "creator");
    },
    on_error: function() {
      callback(false);
    }
  });
}

// Check if a user has joined a channel
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

// Verify bot is admin in all provided channels
function isBotAdminInAll(channels, callback) {
  getBotId(function(botId) {
    if (!botId) return callback({ ok: false, reason: "Failed to get bot ID" });

    let i = 0;
    function checkNext() {
      if (i >= channels.length) return callback({ ok: true });

      isAdminInChannel(channels[i], botId, function(admin) {
        if (!admin) return callback({ ok: false, notAdminChannel: channels[i] });
        i++;
        checkNext();
      });
    }

    checkNext();
  });
}

// Verify user is a member in all channels
function isUserInAll(channels, userId, callback) {
  let i = 0;
  function checkNext() {
    if (i >= channels.length) return callback({ ok: true });

    isUserInChannel(channels[i], userId, function(joined) {
      if (!joined) return callback({ ok: false, notJoinedChannel: channels[i] });
      i++;
      checkNext();
    });
  }

  checkNext();
}

// Main function to validate both bot and user
function validate(channels, userId, callback) {
  isBotAdminInAll(channels, function(botCheck) {
    if (!botCheck.ok) {
      return callback({
        status: false,
        is_joined: false,
        error_message: "Bot is not admin in: " + botCheck.notAdminChannel
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

// Export functions
publish({
  validate: validate
});
