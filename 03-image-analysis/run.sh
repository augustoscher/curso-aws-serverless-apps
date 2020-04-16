#!/bin/bash

#1. Invoke com logs
 sls invoke -f img-analysis --log

#2. Invoke local
sls invoke local -f img-analysis

#3. Invoke using path
sls invoke local -f img-analysis --path request.json
sls invoke -f img-analysis --path request.json --log

#4. Invoke lambda
https://drqa3kqxm2.execute-api.us-east-1.amazonaws.com/dev/analyse?imageUrl=https://www.cienciasresumos.com.br/wp-content/uploads/2018/12/curiosidades-sobre-os-coelhos.jpg
https://drqa3kqxm2.execute-api.us-east-1.amazonaws.com/dev/analyse?imageUrl=https://s2.glbimg.com/slaVZgTF5Nz8RWqGrHRJf0H1PMQ=/0x0:800x450/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/U/e/NTegqdSe6SoBAoQDjKZA/cachorro.jpg