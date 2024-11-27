FROM node:20

WORKDIR /frontend

COPY package*.json ./

RUN yarn

COPY . .

ENV PORT=80

EXPOSE 80

CMD ["yarn", "start"]
