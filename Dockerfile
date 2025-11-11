FROM node:24-alpine

LABEL authors="nwachuc"

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 80

CMD ["npm", "run", "server"]