# AWS Serverless Apps
Serverless Apps with AWS

Good points:

- Não precisa gerenciar Clusters;
- Segurança entre redes;
- Autoscaling;
- Gerenciamento de memória e disco;
- Tem dezenas de serviços à disposição.
- Podem ser containers serverless e executar funções de longa duração;
- Rodar e testar localmente via docker (localstack, serverless-offline e nodemon)

Disclaimers:

- Cold Start
- Cloud dependency

## Setup

Set node version:
```
nvm use 18
```

Install Serverless framework globally or in some application:

```
yarn global add serverless
```

Export AWS credentials:

```
export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
```

Deploy your service:
```
serverless deploy
```

### Image Analysis with Rekognition 

https://fyysud98b0.execute-api.us-east-1.amazonaws.com/dev/analyse?imageUrl=https://cdn.pixabay.com/photo/2015/02/12/10/30/dog-633562_1280.jpg

```
A imagem tem
98.55% - Cão
98.55% - animal de estimação
98.55% - caninos
98.55% - mamíferos
98.55% - animais
98.28% - roupas
98.28% - vestuário
88.52% - sapatos
88.52% - calçados
```
