FROM node:21

WORKDIR /app/gigranger.com/jobmatching-service

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]