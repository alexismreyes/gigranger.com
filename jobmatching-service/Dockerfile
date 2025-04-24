FROM node:21

WORKDIR /app/gigranger.com/jobmatching-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]