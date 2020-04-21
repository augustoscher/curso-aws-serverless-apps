const env = require('env-var');
const settings = {
  NODE_ENV: env.get('NODE_ENV').required().asString(),
  commitMessageUrl: env.get('APICommitMessageURL').required().asString(),
  dbTableName: env.get('DbTableName').required().asString(),
}

module.exports = settings;