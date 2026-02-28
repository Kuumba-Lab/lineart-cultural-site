FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4200

CMD ["node", "dist/lineart-cultural-site/server/server.mjs"]
