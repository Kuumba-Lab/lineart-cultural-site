FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG API_URL=http://localhost:8201
RUN printf "export const appEnv = {\n  apiUrl: '%s',\n  isPorduction: true\n}\n" "$API_URL" > ./src/env-prod.ts \
    && sh ./env.sh \
    && npm run build

EXPOSE 4200

CMD ["node", "dist/lineart-cultural-site/server/server.mjs"]
