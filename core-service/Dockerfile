FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${CORE_PORT}
CMD ["node", "index.js"]
