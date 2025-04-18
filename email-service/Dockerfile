FROM node:21

WORKDIR /app/gigranger.com/email-service

COPY package*.json ./

RUN npm i

# to copy the files inside the WORKDIR
COPY . .

# Start the microservice
CMD ["node", "index.js"]