# AWS Serverless Apps
Serverless Apps with AWS - Ew.IT

## Testing

### Image Analysis with Rekognition 
![alt text](https://www.cachorroamigo.com/wp-content/uploads/2019/05/curiosidades-labrador-cachorroamigo-2-1200x900.jpg)
GET https://drqa3kqxm2.execute-api.us-east-1.amazonaws.com/dev/analyse?imageUrl=https://www.cachorroamigo.com/wp-content/uploads/2019/05/curiosidades-labrador-cachorroamigo-2-1200x900.jpg

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

### Lambda and DynamoDB
POST https://p2epz960ej.execute-api.us-east-1.amazonaws.com/dev/heroes
payload:
```json
{
  "body": { "name": "Iron Man", "power": "Money" }
}
```
