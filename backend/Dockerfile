FROM node:21

WORKDIR /app/gigranger.com/backend

COPY package*.json ./

RUN npm i -g nodemon && npm install

CMD npm run start