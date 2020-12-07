FROM node:15.3.0

WORKDIR /usr/src/app

COPY package*.json ./
COPY ../client/build ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]