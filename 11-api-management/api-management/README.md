# API Management

## API Key é gerada quando subimos localmente

offline: Starting Offline: dev/us-east-1.
offline: Key with token: d41d8cd98f00b204e9800998ecf8427e
offline: Remember to use x-api-key on the request headers
offline: Offline [http for lambda] listening on http://0.0.0.0:3002

## Quando subimos em production

Também são gerados as API Keys para cada um dos customers definidos no arquivo `default-customers.js`

```
api keys:
  augustoscher@gmail.com: Uoi1kz4xIhajfc4IowkCn3wk5tV4D9cM2xx0YlA2
  augusto.scher@gmail.com: dxyB4oINNu1IM6kub06E24nT3LD8SwxX7aXQU25b
  teste: bZxUFFHflS6OHFjq0c8JpaXf8pSUq6yt5ZgeXBq6
  myPaidKey: m4xpyw038D3j8fnTPG3HO6IXd2TfZJyv8SBZocvx
  zezinho@ze.com: NTjQdadXMp3Bj16wYuQZC7myyvvF27BHypMp2Ze2
```


### API Gateway - Usage Plans

Após subir em production, é possível acompanhar o plano de uso por key dentro do API Gateway - Usage Plans