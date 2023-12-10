FROM node:18.17.1

WORKDIR /usr/src/app

COPY ["package.json","package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "run", "start:dev"]