FROM node:16
WORKDIR /usr/src
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80
CMD ["node", "server"]