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

## Testing

### Image Analysis with Rekognition 

https://drqa3kqxm2.execute-api.us-east-1.amazonaws.com/dev/analyse?https://cdn.pixabay.com/photo/2015/06/24/13/32/dog-820014_1280.jpg


```
A imagem tem
94.51% - Animais de estimação
94.51% - caninos
94.51% - mamíferos
94.51% - cães
94.51% - animais
92.37% - filhotes
92.08% - Golden Retriever
87.32% - Labrador Retriever
```
