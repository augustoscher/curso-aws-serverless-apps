FROM lambci/lambda:build-nodejs12.x

WORKDIR /src/

COPY package.json package-lock.json yarn.lock /src/

RUN yarn ci --silent

COPY . .

CMD yarn start