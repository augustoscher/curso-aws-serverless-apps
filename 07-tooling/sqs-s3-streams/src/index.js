const s3listener = require('./s3.listener');
const sqslistener = require('./sqs.listener');

module.exports = {
  s3listener,
  sqslistener
}
