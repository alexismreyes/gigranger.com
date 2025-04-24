FROM node:21

WORKDIR /app/gigranger.com/frontend

# Copy everything including package.json
COPY . .

# 🛠 Install after mounting to ensure correct native deps
RUN npm install

CMD ["npm", "run", "dev"]
