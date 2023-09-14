FROM node:18.10

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
COPY prisma ./prisma
COPY .env ./.env

RUN npm ci
RUN npx prisma db push
RUN npx prisma generate
RUN npm run build

EXPOSE 4000


CMD ["npm","run","start"]