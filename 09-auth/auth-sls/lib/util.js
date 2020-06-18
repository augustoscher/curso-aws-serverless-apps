const buildIAMPolicy = (userId, effect, resource, context) => {
  const policy = {
    principalId: userId,
    policyDocument: {
      Statement: {
        Action: "execute-api:Invoke",
        Effect: effect, //allow | deny
        Resource: resource, //arn
      }
    },
    context
  }
  return policy;
}

module.exports = { buildIAMPolicy };
