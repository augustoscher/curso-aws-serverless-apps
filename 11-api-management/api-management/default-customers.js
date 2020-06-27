const privateUsers = async () => {
  // poderiamos obter os usuários via dynamodb

  return [
    'augustoscher@gmail.com',
    'augusto.scher@gmail.com',
    'teste'
  ]
}

exports.private = privateUsers
